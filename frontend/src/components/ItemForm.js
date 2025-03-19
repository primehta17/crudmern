import React, { useState } from 'react';
import api from '../api/api';

const ItemForm = ({ token, fetchItems }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createItem({ name }, token);
      setName('');
      fetchItems();
    } catch (error) {
      alert('Error adding item');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add Item"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ItemForm;
