import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from "./Sidebar";
import PurchaseList from "./purchases/PurchaseList";

const Home = () => {   
    const [budget, setBudget] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [totalSpending, setTotalSpending] = useState([]);
    const cookies = new Cookies();

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
            setWeeks(response.weeks_preference);
            setBudget(response.budget_preference);
        })

        const total_spent_url = `/api/v1/purchases/recent_total/${cookies.get("token")}`;
        await fetch(total_spent_url)
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
            setTotalSpending(response);
        })
    }

    if(!cookies.get("token"))
    {
        return (
            <>
                <Sidebar></Sidebar>
                <div className="main">
                    <main>
                        <p>Please login to use the budgeting app.</p>
                        <div><Link to="/login">Login</Link></div>
                        <div><Link to="/user">Create User</Link></div>
                    </main>
                </div>
            </>
        )
    }

    return (
        <>
            <Sidebar></Sidebar>
            <div className="main">
                <main>
                    <h3>Last {weeks} weeks</h3>
                    <table className="organization">
                        <tbody>
                            <tr>
                                <td className="organization">
                                    <h5>Purchases</h5>
                                    <PurchaseList recent="true"></PurchaseList>
                                    <div>
                                        <Link to="/purchase" className="btn btn-primary rounded-pill">
                                            Log New Purchase
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/store" className="btn  btn-secondary rounded-pill">
                                            Create New Store
                                        </Link>
                                    </div>
                                </td>
                                <td style={{paddingLeft: 50}} className="organization">
                                    <h5>Spending Habits</h5>
                                    <div>Total Spent: ${Number(totalSpending).toFixed(2)}</div>
                                    <div>Weekly budget: ${Number(budget).toFixed(2)}</div>
                                    <div>Average weekly spending: ${(totalSpending/weeks).toFixed(2)}</div>
                                    <div>Budget Difference: ${(budget - (totalSpending/weeks)).toFixed(2)}</div>

                                    <div> <Link to="/purchases" className="btn  btn-secondary rounded-pill">All Purchases</Link> </div>
                                    <div> <Link to="/Settings" className="btn  btn-secondary rounded-pill">Settings</Link> </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    );
};
  
export default Home;