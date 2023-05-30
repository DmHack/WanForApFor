import React from 'react';
import style from './Header.module.css';
import axios from 'axios';
import { useEffect } from 'react';

import exit from '../../assets/img/icExit.png';
import create from '../../assets/img/create.png'


function Header() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('acc')}`;
    const refresh = localStorage.getItem('refresh');

    useEffect(() => {
        (
            async () => {
                const me = await axios.get(`users/me`);
                if (me.status == 200) {
                    localStorage.setItem('logImg', me.data.img);
                }
            }
        )();
    }, [])

    const logout = () => {
        localStorage.removeItem('refresh');
        localStorage.removeItem('name');
        localStorage.removeItem('auth');
        localStorage.removeItem('acc');
        localStorage.removeItem('logImg');
        window.location.href = '/'
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
                                <img onClick={() => { window.location.href = '/createStat' }} className={style.createStat} src={create} alt="" />
                                <img onClick={() => { window.location.href = '/profile' }} className={style.iconInfoManHead} src={localStorage.getItem('logImg') || 'https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png'} alt="" />
                                <span onClick={logout}><img className={style.exit} src={exit} alt="exit" /></span>
                            </div>
                        </div>

                    )
                    : (
                        <div className={style.links}>
                            <p onClick={pereprNlog}>&#60;WF&#47;&#62;</p>
                        </div>
                    )
            }
        </header>
    )
}

export default Header