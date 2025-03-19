import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import ItemForm from '../components/ItemForm';

const Dashboard = ({ token, onLogout }) => {
  const [items, setItems] = useState([]);

  // Use useCallback to memoize the fetchItems function
  const fetchItems = useCallback(async () => {
    try {
      const data = await api.getItems(token);
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id) => {
    try {
      await api.deleteItem(id, token);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
      <ItemForm token={token} fetchItems={fetchItems} />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
