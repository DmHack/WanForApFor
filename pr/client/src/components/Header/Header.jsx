import React from 'react';
import style from './Header.module.css';
import axios from 'axios';

import exit from '../../assets/img/icExit.png';


function Header() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('acc');
    const refresh = localStorage.getItem('refreshToken');

    const logout = () => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('name');
        localStorage.removeItem('auth');
        localStorage.removeItem('acc');
        localStorage.removeItem('logImg');
        window.location.href = '/login'
    }

    const perepr = () => {
        window.location.href = '/';
    }
    const pereprNlog = () => {
        window.location.href = '/login';
    }
    return (
        <header>
            {
                refresh
                    ? (
                        <div className={style.linksVh}>
                            <div>
                                <p className={style.pLogo} onClick={perepr}>&#60;WF&#47;&#62;</p>
                            </div>
                            <div className={style.lin}>
                                <span onClick={logout}><img className={style.exit} src={exit} alt="exit" /></span>
                            </div>
                        </div>

                    )
                    : (
                        <div className={style.links}>
                            <p className={style.pLogo} onClick={pereprNlog}>&#60;WF&#47;&#62;</p>
                        </div>
                    )
            }
        </header>
    )
}

export default Header