import React, { useEffect, useState } from 'react'
import "./Orders.css"
import OrderComponent from '../../components/OrderComponent/OrderComponent'
import axios from 'axios'


const Orders:React.FC = () => {
    const [ordersList, setordersList] = useState([])
    const fetchOrders=async()=>{
        await axios.get(import.meta.env.VITE_BACKEND_BASEURL+"/orders/getOrders")
        .then((response)=>{
            setordersList(response.data.list)
        })
    }

    useEffect(()=>{
        fetchOrders()
    },[])

  return (
    <div className='orders-main'>
        <div className='orders-child'>
            {ordersList.length === 0 ? (
                    <div className="no-orders-message">
                        <h2>No orders found</h2>
                        <p>You haven't placed any orders yet.</p>
                        <p>Start ordering your favorite food now!</p>
                    </div>
                ) : (
                    ordersList.map((order: any) => (
                        <OrderComponent
                            key={order._id}
                            _id={order._id}
                            customer={order.customer}
                            items={order.items}
                            totalAmount={order.totalAmount}
                            status={order.status}
                            createdAt={order.createdAt}
                        />
                    ))
                )}

        </div>
    </div>
  )
}

export default Orders