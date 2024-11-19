import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from "./Sidebar";

const Home = () => {   
    const navigate = useNavigate();
    const cookies = new Cookies();

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
                                    <div style={{width: 400}}>I ventured into the world of software engineering with my high school programming course, and immediately loved the challenge. After graduation and a few internships at Cerner, I went there full-time for 3 years. I worked on the Orders & Plans team, where our software was used to help doctors place, review, and modify test and medication orders. Since my departure from Cerner, I’ve been working on professionally developing my skills and staying up to date by learning new technologies, like AWS, that I didn’t get a chance to use at Cerner. I recently completed my first AWS Certification and look forward to further learning.</div>
                                    <br />
                                    <div style={{width: 400}}>In my personal life, I’ve been enjoying the process of learning photography, both film and digital, as well as assembling & painting miniatures to use in tabletop games I play with my wife and friends.</div>
                                    <br />
                                    <div style={{width: 400}}>I’ve combined my hobbies and skills here, where this film photo of Union Station in Kansas City that I’ve taken on a 1950’s Kodak Brownie (my grandma’s camera!) was developed & scanned locally in KC, and now lives in an Amazon S3 bucket on my site!</div>
                                </td>
                                <td style={{paddingLeft: 50}} className="organization">
                                    <img src="https://myawsbucket-pickle.s3.amazonaws.com/R1-07463-0009.JPG" width="500" height="500" />  
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
                </main>
            </div>
        </>
    );
};
  
export default Home;