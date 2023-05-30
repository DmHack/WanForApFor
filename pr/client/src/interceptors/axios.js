import axios from "axios";

axios.defaults.baseURL = 'https://localhost:5000/api/';

axios.interceptors.response.use(resp => resp, async error => {

    if (error.response.status === 401) {
        const response = await axios.post('/users/updrefresh', { refreshToken: localStorage.getItem('refreshToken') })

        if (response.status === 201) {
            const token = `Bearer ${response.data.access}`
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('acc', token);
            window.location.reload();

            return axios(error.config);
        }

    }
    else if (error.response.status === 405) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('auth');
        localStorage.removeItem('acc');
        localStorage.removeItem('name');
        localStorage.removeItem('logImg');
        window.location.href = '/login'
    }


    return error.response.data;
});


