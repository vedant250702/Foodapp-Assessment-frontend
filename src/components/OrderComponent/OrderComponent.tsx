// src/components/OrderComponent.tsx
import React, { useEffect, useState } from 'react';
import './OrderComponent.css';
import { socket } from '../../utils/socketFunctions';

interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderProps {
  _id: string;              
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'Order Received' | 'Preparing' | 'Out for Delivery';
  createdAt: string;        
}

const OrderComponent: React.FC<OrderProps> = ({
  customer,
  items,
  totalAmount,
  status,
  createdAt,
  _id,
}) => {
  // Status color mapping
  const getStatusStyle = (stat: string) => {
    switch (stat) {
      case 'Order Received':
        return { bg: '#fff3cd', color: '#856404' };
      case 'Preparing':
        return { bg: '#cce5ff', color: '#004085' };
      case 'Out for Delivery':
        return { bg: '#d4edda', color: '#155724' };
      default:
        return { bg: '#f8d7da', color: '#721c24' };
    }
  };

  const [statusChange, setstatusChange] = useState(status)
  const statusStyle = getStatusStyle(statusChange);

  useEffect(()=>{
    socket.on("notification-client",(payload:any)=>{
      if(_id==payload._id){
        setstatusChange(payload.status)
      }
    })

  })


  return (
    <div className="order-card">
      {/* Header - Order Info */}
      <div className="order-header">
        <div className="order-id-date">
          {createdAt && <p className="order-date">{new Date(createdAt).toLocaleDateString()}</p>}
          {_id && <p className="order-id">Order #{_id.slice(-6)}</p>}
        </div>

        <div
          className="order-status-badge"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
          }}
        >
          {statusChange}
        </div>
      </div>

      {/* Customer Details */}
      <div className="customer-info">
        <h3>{customer.name}</h3>
        <p className="customer-phone">{customer.phone}</p>
        <p className="customer-address">{customer.address}</p>
      </div>

      {/* Ordered Items */}
      <div className="order-items-list">
        <h4>Items Ordered ({items.length})</h4>

        {items.map((item, index) => (
          <div key={index} className="order-item-row">
            <div className="item-name-qty">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">× {item.quantity}</span>
            </div>
            <div className="item-subtotal">
              ₹{(item.price * item.quantity).toFixed(0)}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="order-total-section">
        <div className="total-label">Total Amount</div>
        <div className="total-value">₹{totalAmount.toFixed(0)}</div>
      </div>
    </div>
  );
};

export default OrderComponent;