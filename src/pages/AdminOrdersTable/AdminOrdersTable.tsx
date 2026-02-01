// AdminOrdersTable.tsx
import React, { useState, useEffect } from 'react';
import "./AdminOrdersTable.css"
import axios from 'axios';
import { socketEmit } from '../../utils/socketFunctions';

interface Order {
  _id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'Order Received' | 'Preparing' | 'Out for Delivery';
}



const AdminOrdersTable:React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
      try {
        await axios.get(import.meta.env.VITE_BACKEND_BASEURL+"/orders/getOrders")
        .then((response)=>{
            setOrders(response.data.list || []);
        })
      } catch (err) {
        console.log("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    fetchOrders();
  }, []);

const handleStatusUpdate = async (orderId: string, newStatus: string) => {

      // Make sure newStatus matches the literal union type
      const validStatus = newStatus as Order['status'];

      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASEURL}/orders/${orderId}/status`,
          { status: validStatus }
        ).then((res)=>{
          if(res.status==200){
            setOrders(prev =>
              prev.map(o =>
                o._id === orderId ? { ...o, status: validStatus } : o
              )
            );
            socketEmit("notification",{status:newStatus,_id:orderId})
          }
        })

      } catch (err) {
        alert("Failed to update status");
        console.error(err);
      }
  };

if (loading) return <div className="loading">Loading orders...</div>;

  if (orders.length === 0) return <div className="no-orders">No orders found</div>;

  return (
<div className="admin-container">
      <h1 style={{color:"white"}}>Manage Orders</h1>

      <div className="table-responsive">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Item Names</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>
                <td>{order.customer.name}</td>
                <td>{order.customer.phone}</td>
                <td>
                  {order.items.map(item => item.name).join(', ') || '—'}
                </td>
                <td>{order.items.length}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    defaultValue={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  >
                    <option value="Order Received">Order Received</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;