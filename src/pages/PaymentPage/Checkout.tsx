// src/pages/Checkout.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // optional: redirect after submit
import './Checkout.css';
import axios from 'axios';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  // imageSrc?: string; // if you want to show images
}

interface CheckoutFormData {
  name: string;
  address: string;
  phone: string;
}

const Checkout = () => {
  const cart = useSelector((state: any) => state.cartReducers?.cart || []);
  const dispatch=useDispatch()

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    address: '',
    phone: '',
  });

  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!formData.name.trim() || !formData.address.trim() || !formData.phone.trim()) {
      alert('Please fill all required fields');
      return;
    }

    // Build object matching your schema
    const orderPayload = {
      customer: {
        name: formData.name.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
      },
      items: cart.map((item: CartItem) => ({
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: Number(totalAmount.toFixed(2)),
      status: 'Order Received' as const,
    };

    console.log('Submitting order to backend:', orderPayload);

    await axios.post(import.meta.env.VITE_BACKEND_BASEURL+"/orders/placeOrder",orderPayload)
    .then((response)=>{
      if(response.status==200){
        dispatch({type:"empty_cart",payload:{}})
        alert('Order placed successfully! (check console for payload)');
        navigate("/")
      }
    })
  };

  useEffect(()=>{
    if(cart.length<=0){
      navigate("/")
    }
  },[])


  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-grid">
          {/* Left column - Ordered items */}
          <div className="order-items">
            <h2>Your Items ({cart.length})</h2>

            {cart.length === 0 ? (
              <div className="empty-state">
                <p>Your cart is empty</p>
                <button onClick={() => navigate('/menu')}>Back to Menu</button>
              </div>
            ) : (
              <div className="items-list">
                {cart.map((item: CartItem) => (
                  <div key={item._id} className="order-item">
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="item-subtotal">
                      ₹{(item.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                ))}

                <div className="order-total">
                  <span>Total Amount:</span>
                  <strong>₹{totalAmount.toFixed(0)}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Right column - Delivery details & submit */}
          <div className="delivery-details">
            <h2>Delivery Information</h2>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="House no, Street name, Area, City, PIN code"
                />
              </div>

              <div className="form-summary">
                <div className="final-total">
                  <span>To Pay:</span>
                  <span className="amount">₹{totalAmount.toFixed(0)}</span>
                </div>

                <button
                  type="submit"
                  className="submit-order-btn"
                  disabled={cart.length === 0}
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;