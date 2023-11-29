import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});