import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';

import circle from '../../images/circle.png';
import home from '../../images/home.gif';
import connection from '../../images/connection.gif';
import account from '../../images/account.gif';
import leftArrow from '../../images/left-arrow.gif';


const NavBar = () => {

    const navigate = useNavigate();
    const username = useSelector(state => state.username);

    // ---------- ADD FUNCTIONALITY TO LOGOUT USER INSTEAD ------ /// 
    function handleClick() {
        navigate(-1);
    }

    return (
        <nav>
            <div className="left-corner">
                <img src={circle} width="100" height="100" alt="3L3VAT3 Logo" />
                <h1>3L3VAT3</h1>
            </div>

            <div className="right-corner">
            <NavLink className="nav-item" to="/">
                    <div className='image-container'>
                        <img src={home} width="100" height="100" alt="Home" />
                        <h5 className="image-text">Home</h5>
                   </div>
                </NavLink>

                <NavLink className="nav-item" to="/challenge">
                    <div className='image-container'>
                        <img src={connection} width="100" height="100" alt="Challenge" />
                        <h5 className="image-text-challenge">Challenge</h5>
                    </div>
                </NavLink>

                <NavLink className="nav-item" to="/stats">
                    <div className='image-container'>  
                        <img src={account} width="100" height="100" alt="My Stats" />
                        <h5 className="image-text">Stats</h5>
                    </div>
                </NavLink>
                
                <NavLink className="nav-item" to="/back" onClick={handleClick}>
                    <div className='image-container'>     
                        <img src={leftArrow} width="100" height="100" alt="Back" />
                        <h5 className="image-text">Logout</h5>
                    </div>
                </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;