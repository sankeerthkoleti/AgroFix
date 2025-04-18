
# AgroFix
Streamlined agri-commerce – Search, Add, Order, Track. No login. Just convenience.

# Repository Structure  
AgroFix  
├── AgroFix-Frontened/.      
├── AgroFix-backened/.  
├── README.md.  
└── .env.example.    


# Setup Instructions  
1. Clone the Repo    
git clone https://github.com/your-username/AgroFix.git  
cd AgroFix

3. Frontend Setup
cd AgroFix-Frontened  
npm install  
npm run dev  

4. Backend Setup  
cd AgroFix-backened  
npm install  
npm start  

# ✨ Implemented Features
🛒 User Side  
    &nbsp;&nbsp;&nbsp;&nbsp;Search products by name or category  
     &nbsp;&nbsp;&nbsp;&nbsp;Add multiple items to cart  
     &nbsp;&nbsp;&nbsp;&nbsp;No login required — enter contact details at checkout  
     &nbsp;&nbsp;&nbsp;&nbsp;Place order and get an Order ID  
     &nbsp;&nbsp;&nbsp;&nbsp;Track your order using the Order ID    

🛠️ Admin Side  
&nbsp;&nbsp;&nbsp;&nbsp;View all orders with statuses: Pending, Delivered, Canceled  
&nbsp;&nbsp;&nbsp;&nbsp;Add or delete products from catalog  
&nbsp;&nbsp;&nbsp;&nbsp;Update order statuses  

# 🗃️ Database Schema
Orders - contains details of customer  

Items  - contains details of ordered Items  

productcatalogue - contains all information about product

