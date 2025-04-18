const express = require('express');
const client = require('./db');  

const app = express();
const port = 3000;
let cor = require("cors");

app.use(cor());
app.use(express.json());


app.get('/products', async (req, res) => {
  console.log("called");
  try {
    // Query the database to get all users
    const result = await client.query('SELECT * FROM productcatalogue');
    res.json(result.rows);  // Send the result as a JSON response
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});

app.post("/addorder", async (req, res) => {
    try {
        const { customername, email, phoneno, address } = req.body;

        const result = await client.query(
            `INSERT INTO orders (customername, phoneno, email, address) VALUES ($1, $2, $3, $4) RETURNING id`,
            [customername, phoneno, email, address]
        );

        res.json({ customerId: result.rows[0].id });
    } catch (err) {
        console.error('Error inserting order:', err);
        res.status(500).send('Error adding order');
    }
});


app.post("/addorderitems", async (req, res) => {
    const items = req.body.items; // assume array of objects with orderId, productId, quantity, userId
    const userId = req.body.userId;
    const {customerId} = userId;

    console.log(customerId);
    console.log(items);
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).send("Invalid item list");
    }
  
    // Construct values and parameter array
    const values = [];
    const params = [];
  
    items.forEach((item, index) => {
      const baseIndex = index * 3;
      values.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3})`);
      params.push(customerId, item.name, item.price);
    });
  
    const query = `
      INSERT INTO items (user_id, itemname, itemprice)
      VALUES ${values.join(", ")}
      RETURNING *;
    `;
  
    try {
      const result = await client.query(query, params);
      res.json({ inserted: result.rowCount, data: result.rows });
    } catch (err) {
      console.error("Error inserting items:", err);
      res.status(500).send("Insert failed");
    }
  });

app.get("/getorderdetails",async(req,res)=>{
    try {
        const result = await client.query('SELECT * FROM orders');
        res.json(result.rows);  // Send the result as a JSON response
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
      }
})
app.get("/getItems/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Fetching items for:", id);
  
      const result = await client.query(
        `SELECT * FROM items WHERE user_id = $1`,
        [id]
      );
  
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).send('Internal server error');
    }
  });

  app.put("/updateStatus", async (req, res) => {
    console.log("calling update status");
    const { id, status } = req.body;
    try {
      const result = await client.query(
        `UPDATE orders SET status = $1 WHERE id = $2`,
        [status, id]
      );
      res.json({ status: "updated" });
    } catch (err) {
      console.error("Update failed:", err);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  });
  
  app.get("/getcatalogue",async(req,res)=>{
    console.log("called catalogue api");
    try{
        const result = await client.query(
            `SELECT * FROM productcatalogue`
          );
      
          res.json(result.rows);
    }
    catch{
        console.error('Error fetching items:', err);
        res.status(500).send('Internal server error');
    }
  })

  // POST /addproduct
app.post("/addproduct", async (req, res) => {
    const { name, category, price, image } = req.body;
    await client.query("INSERT INTO productcatalogue (name, category, price, image) VALUES ($1, $2, $3, $4)", [name, category, price, image]);
    res.json({ success: true });
  });
  
  // DELETE /deleteproduct/:id
  app.delete("/deleteproduct/:id", async (req, res) => {
    await client.query("DELETE FROM productcatalogue WHERE id=$1", [req.params.id]);
    res.json({ success: true });
  });
  
  
// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
