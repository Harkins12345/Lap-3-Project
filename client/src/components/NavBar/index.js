import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import circle from '../../images/circle.png';
import connection from '../../images/connection.gif';
import account from '../../images/account.gif';
import leftArrow from '../../images/left-arrow.gif';


const NavBar = () => {

    const username = useSelector(state => state.username);

    // ---------- ADD FUNCTIONALITY TO LOGOUT USER INSTEAD ------ /// 
    function handleClick() {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        window.location.reload();
    }

    const navBarLinks = <>
    <NavLink role="link" className="nav-item" to="/challenge">
                    <div className='image-container'>
                        <img src={connection} width="100" height="100" alt="Challenge" />
                        <h5 className="image-text-challenge">Challenge</h5>
                    </div>
                </NavLink>

                <NavLink role="link" className="nav-item" to="/stats">
                    <div className='image-container'>  
                        <img src={account} width="100" height="100" alt="My Stats" />
                        <h5 className="image-text">Stats</h5>
                    </div>
                </NavLink>
                
                <NavLink role="link" className="nav-item" to="/" onClick={handleClick}>
                    <div className='image-container'>     
                        <img src={leftArrow} width="100" height="100" alt="Back" />
                        <h5 className="image-text">Logout</h5>
                    </div>
                </NavLink>
    </>

    return (
        <nav>
            <div className="left-corner">
                <img src={circle} width="100" height="100" alt="3L3VAT3 Logo" />
                <h1>3L3VAT3</h1>
            </div>

            <div className="right-corner">
                {username && navBarLinks}
            </div>
        </nav>
    );
}

export default NavBar;