import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'

import HomePage from './Component/HomePage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PlaceOrder from './Component/PlaceOrder';
import Header from './Component/Heaader';
import Footer from './Component/Footer';
import TrackOrder from './Component/Track';
import ProductCatalog from "./Component/Products"
import Context from "./context/AppContext"
import AdminDashboard from './Component/AdminDashboard';
import OrderList from './Component/Vieworders';
import InventoryTable from "./Component/ManageInventory";
function App() {
  const [count, setCount] = useState(0);
  const [selectedItems,setSelectedItems] = useState([]);
  const [order,setord] = useState([]);
  let [customerOrders,setCustomerOrders] = useState([]);

  let addItem = (item)=>{
    setSelectedItems((r)=>{
      console.log(r);
      console.log(item);
      return [...r,item];
    });
  }
  
  let addorder = (i,info)=>{
    setord((prev)=>{
      return [...prev,{item:i,userinfo:info}]
    });
  }

  let setcustorders = (list)=>{
    console.log(list);
    setCustomerOrders(list);
  }

  let deleteItem = (id)=>{
    let new_list = selectedItems.filter((item)=>item.id !== id)
    setSelectedItems(new_list);
  }
  let deleteAll = ()=>{
    setSelectedItems([]);
  }
  return (
    <Context.Provider value={{ select: selectedItems, changeSelect: addItem,setorder:addorder,order:order,customerOrders:customerOrders,setcustomerOrders:setcustorders,deleteAllselectedItems:deleteAll,deleteselectItem:deleteItem}}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/placeorder" element={<PlaceOrder/>}/>
          <Route path="/track" element={<TrackOrder/>}/>
          <Route path="/products" element={<ProductCatalog/>}/>
          <Route path="/adminpage" element={<AdminDashboard/>}/>
          <Route path="/vieworders" element={<OrderList/>}/>
          <Route path="/inventory" element={<InventoryTable/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Context.Provider>
    
  )
}

export default App
