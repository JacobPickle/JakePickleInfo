import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from "../Sidebar";

const Stores = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const url = `/api/v1/stores/index/${cookies.get("token")}`;
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((res) => setStores(res))
          .catch(() => navigate("/"));
    }, []);
    
    const allStores = stores.map((store, index) => (
        <li key={index}>
            <div>
                <Link to={`/store/${store.id}`} className="list-group-item">
                    {store.name}
                </Link>
            </div>
        </li>
    ));
    const noStore = (
        <div>
            <h4>
                No stores yet. Why not <Link to="/store">create one</Link>
            </h4>
        </div>
    );
    
    return (
        <>
            <Sidebar></Sidebar>
            <div className="main">
                <h3>Stores</h3>
                <main>
                    <ul className="list-group">
                        {stores.length > 0 ? allStores : noStore}
                    </ul>
                    <div>
                        <Link to="/store" className="btn btn-primary rounded-pill">
                            Create New Store
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
};
  
  export default Stores;