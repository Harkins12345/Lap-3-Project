import React from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';

import circle from '../../images/circle.png';
import home from '../../images/home.gif';
import connection from '../../images/connection.gif';
import account from '../../images/account.gif';
import leftArrow from '../../images/left-arrow.gif';


const NavBar = () => {

    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
    }

    return (
        <nav>
            <div className="left-corner">
                <img src={circle} width="100" height="100" />
                <h1>3L3VAT3</h1>
            </div>

            <div className="right-corner">
                <NavLink className="hamburger" to="/">
                   Home <img src={home} width="100" height="100" />
                </NavLink>

                <NavLink to="/game">
                   Challenge <img src={connection} width="100" height="100" />
                </NavLink>

                <NavLink to="/stats">
                    My Stats <img src={account} width="100" height="100" />
                </NavLink>
                

                <button onClick={handleClick}>
                    Back <img src={leftArrow} width="100" height="100" />
                </button>
            </div>
        </nav>
    );
}

export default NavBar;