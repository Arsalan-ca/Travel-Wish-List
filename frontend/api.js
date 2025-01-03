import axios from 'axios';

const API_URL = 'http://localhost:3001/api/';

// Getting the entire collection from the server
export const getCollection = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Replace the collection with a new one
export const replaceCollection = async (items) => {
    const response = await axios.put(API_URL, items);
    return response.data;
};

// Add a new item to the collection
export const addItem = async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data;
};

// Delete the entire collection from the server
export const deleteCollection = async () => {
    const response = await axios.delete(API_URL);
    return response.data;
};

// Get an item by ID 
export const getItemById = async (id) => {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
};

// Update an item by ID
export const updateItemById = async (id, item) => {
    const response = await axios.put(`${API_URL}${id}`, item);
    return response.data;
};

// Delete an item by ID
export const deleteItemById = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
};