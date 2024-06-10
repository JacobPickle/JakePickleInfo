import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from "./Sidebar";

const Settings = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [budget, setBudget] = useState([]);
    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        getSettings();
    }, []);

    async function getSettings() {
        const url = `/api/v1/users/show_budgeting_preferences/${cookies.get("token")}`;
        await fetch(url)
        .then((response) => {
            if (response.ok) 
            {
                return response.json();
            }
            else
            {
                throw new Error("Network response was not ok.");
            }
                
         })
        .then((response) => {
            document.getElementById("weeks").value = response.weeks_preference;
            setWeeks(response.weeks_preference);
            document.getElementById("budget").value = response.budget_preference;
            setBudget(response.budget_preference);
        })
        .catch(() => navigate("/"));
    }

    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/users/update_budgeting_preferences";
    
        const body = {
            user_token: cookies.get("token"),
            budget_preference: budget,
            weeks_preference: weeks,
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
        .catch((error) => console.log(error.message));
    };

    return (
        <>
            <Sidebar></Sidebar>
            <div className="main">
                <main>
                    <h3>Settings</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Budget</label>
                            <input
                                type="number"
                                step='1'
                                name="budget"
                                id="budget"
                                className="form-control"
                                required
                                onChange={(event) => onChange(event, setBudget)}
                            />
                            <label>Weeks to display on homepage</label>
                            <input
                                type="number"
                                step='1'
                                name="weeks"
                                id="weeks"
                                className="form-control"
                                required
                                onChange={(event) => onChange(event, setWeeks)}
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary rounded-pill">
                                Save Settings
                            </button>
                        </div>
                    </form>
                    <div>
                        <Link to="/stores" className="btn btn-secondary rounded-pill">Stores</Link>
                    </div>
                    <div>
                        <Link to="/store_types" className="btn btn-secondary rounded-pill">Store Types</Link>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Settings;