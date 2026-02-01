import './Menu.css';
import MenuItem from '../../components/MenuItem/MenuItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

interface MenuItemData {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
}

const Menu = () => {

  const selector=useSelector((state:any)=>state.cartReducers)
  const [menuItems,setmenuItems] = useState<MenuItemData[]>([])

  const fetchMenu=async()=>{
    await axios.get(import.meta.env.VITE_BACKEND_BASEURL+"/items/getItems")
    .then((response)=>{
      console.log(response.data)
      setmenuItems(response.data)
    })
  }

  useEffect(()=>{
    fetchMenu()
  },[])


  const checkQuantity=(_id:string)=>{
      const cart=selector.cart
      for(let i=0;i<cart.length;i++){
        if(cart[i]._id==_id){
          return Number(cart[i].quantity)
        }
      }
      return 0
  }

  return (
    <div className="menu-page">
        <div className='menu-items'>
            {menuItems.map((item) => (
                <MenuItem
                key={item._id}
                _id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageSrc={item.imageSrc}
                quantity={Number(checkQuantity(item._id))}
                />
            ))}
        </div>
    </div>
  );
};

export default Menu;
