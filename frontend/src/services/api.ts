import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/*
 Attach token if available
The below line ensures that the JWT token or other common headers are included in every request using interceptors.
This avoids manual addition of headers in each component
*/
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export const authAPI = {
    signUp: (data: {name: string, email: string; password: string}) => api.post("/users/signup", data),
    signIn: (data: {email: string; password: string}) => api.post("/users/signin", data),
}

export const blogAPI = {
    getBlogs: () => api.get("/blog"),
    getBlog: (id: string) => api.get(`/blog/${id}`),
    createBlog: (data: { title: string; content: string; }) => api.post("/blog/post", data),
    updateBlog: (id: string, data: {title: string; content: string}) => api.put(`/blog/${id}/update`, data),
    deleteBlog: (id: string) => api.delete(`/blog/${id}/delete`),
    getUsersBlog: () => api.get("/blog/users"),
    getComments: (id: string) => api.get(`/blog/${id}/get/comment`),
    addComment: (id: string, data: {content: string}) => api.post(`/blog/${id}/add/comment`, data), 
}


/*
// Normal Post Request with Authorization Header
const axios = require('axios');

const url = 'https://example.com/api/endpoint';
const data = {
    key1: 'value1',
    key2: 'value2'
};

const config = {
    headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
        'Content-Type': 'application/json'
    }
};

axios.post(url, data, config)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
*/
