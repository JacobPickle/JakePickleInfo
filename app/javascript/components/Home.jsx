import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from "./Sidebar";

const Home = () => {   
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const cookies = new Cookies();

  /*   useEffect(() => {
        const url = "/api/v1/users/index";
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((res) => setUsers(res))
          .catch(() => navigate("/"));
    }, []); */

    useEffect(() => {
        if(cookies.get("token")) {
            const url = `/api/v1/users/index_by_token/${cookies.get("token")}`;
            fetch(url)
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                throw new Error("Network response was not ok.");
              })
              .then((res) => setUsers(res))
              .catch(() => navigate("/"));
        }   
    }, []);
    
    const allUsers = users.map((user, index) => (
        <li key={index}>
            <div>
                <Link to={`/store/${user.id}`} className="list-group-item">
                    {user.username}
                </Link>
            </div>
        </li>
    ));

    function logout (event) {
        cookies.remove("username");
        cookies.remove("token");
        navigate("/");
    }

    return (
        <>
            <Sidebar></Sidebar>
            <div className="main">
                <main>
                    <table className="organization">
                        <tbody>
                            <tr>
                                <td className="organization">
                                    <h2>Jake Pickle</h2>
                                    <h5>Software Engineer</h5>
                                    <div style={{width: 400}}>I was a software engineer at Cerner for 3 years, working on the Orders and Plans team we owned the section of the application doctors would use to place, review, and modify orders for medications or test. Recently I have been working on personal projects, including this website, they can be found along with my resume via the sidebar.</div>
                                    <br />
                                    <div style={{width: 400}}>On a more personal note I enjoy spending the day photographing flowers at the park with my wife then coming home to spend the evening doing some minature painting or playing tabletop games.</div>
                                </td>
                                <td style={{paddingLeft: 50}} className="organization">
                                    <img src="https://hips.hearstapps.com/pop.h-cdn.co/assets/16/42/2048x1365/gallery-1476810195-gettyimages-166633559.jpg?resize=640:*" />  
                                </td>
                                <td className="organization">
                                    {!cookies.get("token") ?
                                        <>
                                            <div><Link to="/login" className="list-group-item">Login</Link></div>
                                            <div><Link to="/user" className="list-group-item">Create User</Link></div>
                                        </>
                                        :
                                        <>
                                            <label>Hi, {cookies.get("username")}!</label>
                                            <button onClick={logout} className="list-group-item">
                                                Logout
                                            </button>
                                        </> 
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ul className="list-group">
                        {allUsers}
                    </ul>
                </main>
            </div>
        </>
    );
};
  
export default Home;