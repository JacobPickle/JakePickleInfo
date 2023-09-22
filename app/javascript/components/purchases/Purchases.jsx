import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Purchases = () => {
    const navigate = useNavigate();
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const url = "/api/v1/purchases/index";
        fetch(url)
          .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
          })
          .then((res) => setPurchases(res))
          .catch(() => navigate("/"));
    }, []);
    
    const allPurchases = purchases.map((purchase, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
                <Link to={`/purchase/${purchase.id}`}>
                    {purchase.purchase_date}
                </Link>
            </div>
          </div>
        </div>
    ));
    const noPurchase = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
                No purchases yet. Why not <Link to="/purchase">create one</Link>
            </h4>
        </div>
    );
    
    return (
        <>
            <div>
                <main>
                    <h3>Purchases</h3>
                    <div>
                        {purchases.length > 0 ? allPurchases : noPurchase}
                    </div>
                    <Link to="/purchase" className="btn btn-link">
                        Create New Purchase
                    </Link>
                    <Link to="/store" className="btn btn-link">
                        Create New Store
                    </Link>
                    <Link to="/" className="btn btn-link">
                        Home
                    </Link>
                </main>
            </div>
        </>
    );
};
  
  export default Purchases;