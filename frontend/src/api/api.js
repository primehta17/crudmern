const API_URL = 'http://localhost:9000/api/items';

const getItems = async (token) => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  return await response.json();
};

const createItem = async (item, token) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('Failed to create item');
  }
};

const deleteItem = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
};

export default { getItems, createItem, deleteItem };
