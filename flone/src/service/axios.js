import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// axios import
import axios from 'axios';

// service object import
import service from './constants';

// auth config import
import authConfig from '../auth/config';

// import { handleLogout } from '@store/authentication';

// import { getPermission } from '@store/permission';
// import { useDispatch } from 'react-redux';

const instance = axios.create({
    baseURL: service.API_URL + '/api'
});

const AxiosInterceptor = () => {
    useEffect(() => {
        // ** Request Interceptor
        const reqInterceptors = instance.interceptors.request.use(
            (config) => {
                // ** Get token from localStorage
                const accessToken = localStorage.getItem(authConfig.storageTokenKeyName);

                // ** If token is present add it to request's Authorization Header
                if (accessToken) {
                    // ** eslint-disable-next-line no-param-reassign
                    config.headers.Authorization = JSON.parse(accessToken);
                }
                return config;
            }
        );

        
        return () => {
            instance.interceptors.request.eject(reqInterceptors);
        };
    }, []);

    return;
};

export default instance;

export { AxiosInterceptor };
