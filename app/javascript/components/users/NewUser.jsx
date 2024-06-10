import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from "../Sidebar";

const NewUser = () => {
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
        const url = "/api/v1/users/create";

        const body = {
            username: formData.username,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            weeks_preference: 4,
            budget_preference: 200,
        };
        
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
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
                        Create a user.
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
                            <div>
                                <label>Password confirmation:</label>
                                <input type="password" name="password_confirmation" onChange={onChange} value={formData.password_confirmation} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary rounded-pill">
                            Create user
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewUser;