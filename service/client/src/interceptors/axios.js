import axios from "axios";

/*https://server-livid-tau.vercel.app/api/*/

axios.defaults.baseURL = 'https://server-livid-tau.vercel.app/api/';

axios.interceptors.response.use(resp => resp, async error => {

    if (error.response.status === 401) {
        const response = await axios.post('/users/updrefresh', { refreshToken: localStorage.getItem('refresh') })

        if (response.status === 201) {
            const token = response.data.access
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('acc', token);
            window.location.reload();

            return axios(error.config);
        }

    }
    else if (error.response.status === 405) {
        localStorage.removeItem('refresh');
        localStorage.removeItem('auth');
        localStorage.removeItem('acc');
        localStorage.removeItem('name');
        localStorage.removeItem('logImg');
        window.location.href = 'https://client-vert-xi.vercel.app'
    }


    return error.response.data;
});


