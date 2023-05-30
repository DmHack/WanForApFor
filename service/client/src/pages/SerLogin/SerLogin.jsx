import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SerLogin() {
    const { id, acc, rf } = useParams();
    axios.defaults.headers.common['Authorization'] = acc;
    useEffect(() => {
        (
            async () => {
                const res = await axios.post(`/users/meSer`, { id: id, acc: acc, rf: rf });
                if (res.status == 200) {
                    localStorage.setItem('logImg', res.data.img);
                    localStorage.setItem('name', res.data.name);
                    localStorage.setItem('refresh', res.data.refresh);
                    localStorage.setItem('acc', res.data.access);
                    window.location.href = '/'
                }
            }
        )();
    }, [])
    return (
        <div>
            Производим вход в систему
        </div>
    )


}

export default SerLogin