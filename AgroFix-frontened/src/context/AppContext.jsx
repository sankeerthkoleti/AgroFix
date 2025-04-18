// AppContext.js
import { createContext } from 'react';

const Context = createContext({
  select: {},
  changeSelect: () => {},
  order:{items:[],userdetails:[]},
  setorder:()=>{},
  customerOrders:[],
  setcustomerOrders:()=>{},
  deleteselectItem:()=>{},
  deleteAllselectedItems:()=>{}
});

export default Context;
