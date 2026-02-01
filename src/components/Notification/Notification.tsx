import React from 'react'
import "./Notification.css"
import { MdDeliveryDining } from "react-icons/md";
import { LuCookingPot } from "react-icons/lu";
import { FaAngleDoubleRight } from "react-icons/fa";




interface notificationParams{
    status:string;
    exit:any
}

const Notification:React.FC<notificationParams> = ({status,exit}) => {
  return (
    <div className='notification-main'>

        <div className='notification-logo'>
            <span>
                {status=="Order Received"?
                    <FaAngleDoubleRight />
                :status=="Preparing"?
                    <LuCookingPot />
                :status=="Out for Delivery"&&
                    <MdDeliveryDining />
                }
            </span>
        </div>
        <div className='notification-status'>
            {status}
        </div>
        <div className='notification-exit'>
          <span onClick={exit}>🗙</span> 
        </div>
    </div>
  )
}

export default Notification