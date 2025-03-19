import React from 'react';
import apiService from '../services/api';

const ItemList = ({ items = [], fetchItems }) => {
    if (!items.length) {
      return <p>No items available</p>;
    }
    const user = JSON.parse(localStorage.getItem('user'));

    const handleDelete = async (id) => {
        await apiService.deleteItem(id,user.token);
        fetchItems();
    };
    return(
        <div>
            {items.map((item)=>(
                <div key={item._id} className="item">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
};

export default ItemList;