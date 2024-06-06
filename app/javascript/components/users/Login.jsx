import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from "../Sidebar";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password_confirmation: ""
    });
    const cookies = new Cookies();
    
    function onChange (event) {
        setFormData({
            ...formData, [event.target.name]: event.target.value,
        })
    }
    
    function onSubmit (event) {
        event.preventDefault();
        const url = `/api/v1/users/show/${formData.username}/${formData.password}`
        
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "GET",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((response) => {
            cookies.set('username', formData.username, { path: '/' });
            cookies.set('token', response.token, { path: '/' });
            navigate("/");
        })
        .catch((error) => console.log(error.message));
    }

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="main">
                <div>
                    <h3>
                        Login
                    </h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <div>
                                <label>Username:</label>
                                <input type="text" name="username" onChange={onChange} value={formData.username} />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" name="password" onChange={onChange} value={formData.password} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary rounded-pill">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;