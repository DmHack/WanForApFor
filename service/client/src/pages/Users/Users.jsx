import React from 'react'
import style from './Users.module.css';

import gitt from '../../assets/icon/git.png'
import vkk from '../../assets/icon/vkon.png'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function Users() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [git, setGit] = useState('');
    const [vk, setVK] = useState('');
    const [progStat, setProgStat] = useState([]);


    useEffect(() => {
        (
            async () => {
                const res = await axios.post(`users/getUserAkk`, { id: id });
                if (res.status == 200) {
                    console.log(res);
                    setName(res.data.name);
                    setImg(res.data.img);
                    setProgStat(res.data.goals);
                    setGit(res.data.git);
                    setVK(res.data.vk);
                }
            }
        )();
    }, [])

    let res = progStat.map(function (item, index) {
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
                <div className={style.divPInfo}>
                    <p className={style.pINfp}>{item.title}</p>
                </div>
                <div className={style.contTitle} style={{
                    backgroundImage: `url("${item.prog}")`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                }}></div>
                <div className={style.btnPr}>
                    <button className={style.button} onClick={() => { window.location.href = `/pr/${item._id}` }}>Прочитать</button>
                </div>
            </div>

        </div>
    });




    return (
        <>
            <div className={style.container}>
                <div className={style.contCateg}>
                    <img className={style.avaMan} src={img} alt="" />
                    <p className={style.nameSts}>{name}</p>
                    <div className={style.gitVkCont}>
                        <img onClick={() => { window.open(git, '_target') }} className={style.Icgit} src={gitt} alt="" />
                        <img onClick={() => { window.open(vk, '_target') }} className={style.Icgit} src={vkk} alt="" />
                    </div>
                </div>

                <div className={style.contStats}>
                    <div className={style.stat}>
                        {res}
                    </div>
                </div>
            </div>


            {/* <ToastContainer /> */}
        </>


    )
}

export default Users