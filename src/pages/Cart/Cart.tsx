import React from 'react'
import MenuItem from '../../components/MenuItem/MenuItem'
import "./Cart.css"
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';



const Cart:React.FC = () => {
    const selector = useSelector((state: any) => state.cartReducers || { cart: [] });
    const navigate=useNavigate()
    const menuItems = selector.cart || [];

    const totalItems = menuItems.reduce(
        (sum:any, item:any) => sum + (Number(item.quantity) || 0),
        0
    );

    const totalAmount = menuItems.reduce(
        (sum:any, item:any) => sum + (item.price || 0) * (Number(item.quantity) || 0),
        0
    );


  return (
    <div className="cart-page">
        <div className='cart-items'>
            <div className='cart-left-items'>
                {menuItems.map((item:any) => (
                    <MenuItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageSrc={item.imageSrc}
                    quantity={Number(item.quantity)}
                    />
                ))}
            </div>
            <div className='cart-right-items'>
                {menuItems.length === 0 ? (
                    <p className="empty-summary">Cart summary will appear here</p>
                ) : (
                    <>
                    <h3>Order Summary</h3>
                    
                    <div className="summary-details">
                        <div className="summary-row">
                        <span>Total Items</span>
                        <span>{totalItems}</span>
                        </div>
                        
                        <div className="summary-row grand-total">
                        <span>To Pay</span>
                        <span>₹{totalAmount.toFixed(0)}</span>
                        </div>
                    </div>

                    <button className="pay-now-btn" onClick={()=>{navigate("/checkout")}}>
                        Proceed to Pay ₹{totalAmount.toFixed(0)}
                    </button>
                    </>
                )}
            </div>

        </div>
    </div>

  )
}

export default Cart