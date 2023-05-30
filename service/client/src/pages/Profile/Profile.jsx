import React from 'react'
import style from './Profile.module.css';

import git from '../../assets/icon/git.png'
import vk from '../../assets/icon/vkon.png'

import { useEffect, useState } from 'react'
import axios from 'axios';

function Profile() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('acc')}`;
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [mePs, setMePs] = useState([]);

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`users/me`);
                const ps = await axios.post(`prog/psMe`);

                setEmail(res.data.email)
                setId(res.data.id)
                setMePs(ps.data.doc)
                localStorage.setItem('logImg', res.data.img)
                localStorage.setItem('git', res.data.git)
                localStorage.setItem('vk', res.data.vk)
            }
        )();
    }, [])

    const deleteZ = async (id) => {
        const wf = await axios.delete(`prog/${id}`, {

        })
        if (wf.status == 200) {
            window.location.href = '/profile'
        } else {
            alert('ERROR')
        }
    }


    let res = mePs.map(function (item, index) {
        return <div key={index} className={style.contStat}>
            <div className={style.userPg} >
                <div className={style.authorInfo}>
                    <div className={style.authInD}>
                        <img className={style.Avatar} src={item.avatar} alt="" />
                        <p className={style.nameSt}>{item.userName}</p>
                        <p className={style.tag}>{item.tag}</p>
                    </div>
                    <div>
                        <p className={style.dataD}>{(item.createdAt).split('T')[0]}</p>
                    </div>
                </div>
            </div>
            <div className={style.infoPr}>
                <div>
                    <p className={style.pINfp}>{item.title}</p>
                </div>
                <div className={style.fonSt} style={{
                    backgroundImage: `url("${item.prog}")`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                }}>
                </div>
                <div className={style.btnCont}>
                    <button className={style.button} onClick={() => { deleteZ(item._id) }}>Удалить</button>
                    <button className={style.button} onClick={() => { window.location.href = `pr/${item._id}` }}>Открыть</button>
                </div>
            </div>

        </div>
    });




    return (
        <>
            <div className={style.container}>
                <div className={style.infoAkk}>
                    <img className={style.iconInfoMan} src={localStorage.getItem('logImg') || 'https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png'} alt="" />
                    <div className={style.infoMan}>
                        <h1 className={style.nameMan}>{localStorage.getItem('name')}</h1>
                        <p className={style.manInfos}>Почта: {email}</p>
                        <p className={style.manInfos}>Id: {id}</p>
                        <div className={style.gitVkCont}>
                            <img onClick={() => { window.open(localStorage.getItem('git'), '_target') }} className={style.Icgit} src={git} alt="" />
                            <img onClick={() => { window.open(localStorage.getItem('vk'), '_target') }} className={style.Icgit} src={vk} alt="" />
                        </div>
                        <div>
                            <button onClick={() => { window.open('https://client-vert-xi.vercel.app', '_target') }} className={style.button}>Изменить аккаунт</button>
                        </div>
                    </div>
                </div>
                <div className={style.containerStat}>
                    <div className={style.resStat}>
                        {res}
                    </div>
                </div>
            </div >

            {/* <ToastContainer /> */}
        </>


    )
}

export default Profile