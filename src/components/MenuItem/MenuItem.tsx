import React from 'react';
import './MenuItem.css';
import AddToCart from '../AddToCartButton/AddToCart';

interface MenuItemProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  quantity:number
}

const MenuItem: React.FC<MenuItemProps> = ({
  _id,
  name,
  description,
  price,
  imageSrc,
  quantity
}) => {



  return (
    <div className="menu-item-card">
      <div className='menu-item-left-col'>
        <div className='menu-item-image'>
          <img src={imageSrc}/>
        </div>
        <div className='menu-item-add'>
          <AddToCart key={_id} _id={_id} name={name} description={description} price={price} imageSrc={imageSrc} quantity={quantity}/>
        </div>

      </div>
      <div className='menu-item-right-col'>
        <h3 className="menu-item-title">{name}</h3>
        <p className="menu-item-desc">{description}</p>
        <p className="menu-item-price">₹ {price}</p>
      </div>
    </div>
  );
};

export default MenuItem;