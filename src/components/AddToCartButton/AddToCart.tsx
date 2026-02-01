import React from 'react'
import "./AddToCart.css"
import { useState } from 'react'
import { useDispatch} from 'react-redux'

interface cartInput{
   _id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  quantity:number
}

const AddToCart:React.FC<cartInput> = ({_id, name, description, price, imageSrc,quantity}) => {

    const dispatch=useDispatch()

    const [Quantity, setQuantity] = useState(quantity)

    const add=()=>{
        setQuantity(1)
        dispatch({type:"add_to_cart",payload:{_id:_id,name:name,description:description, price:price, imageSrc:imageSrc}})
    }

  const increment = () => {
    setQuantity(Quantity+ 1)
    dispatch({type:"increment",payload:{_id:_id}})
  }

  const decrement = () => {
    if (Quantity>= 1){
        setQuantity(Quantity- 1)
        dispatch({type:"decrement",payload:{_id:_id}})
    }
  };

  return (
    <div className='add-to-cart-div'>
        {Quantity==0?
            <button className='add-to-cart-btn' onClick={add}>
               <b> Add</b>
            </button>
        :
            <div className="cart-quantity">
            <button onClick={decrement}>−</button>
            <span>{Quantity}</span>
            <button onClick={increment}>+</button>
            </div>
        }
    </div>
  )
}

export default AddToCart