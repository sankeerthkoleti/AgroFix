// Import the PostgreSQL client
const { Client } = require('pg');


const client = new Client({
  user: 'neondb_owner',          
  host: 'ep-snowy-grass-a4y2fut3-pooler.us-east-1.aws.neon.tech',
  database: 'agrofix',      
  password: 'npg_CvXT2F9agcsp',      
  port: 5432,    
  ssl: {
    rejectUnauthorized: false, // Important: allows SSL without certificate validation
  }                 
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL!');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });

// Export the client so you can use it in other files
module.exports = client;
