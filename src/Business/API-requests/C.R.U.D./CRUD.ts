/* eslint-disable max-len */
/* eslint-disable consistent-return */
import axios, { AxiosRequestConfig } from 'axios';
import { AuthResponse, CreatePostPayload, Post, PostPopulatableKeys } from '../../../Types-Interfaces/CRUD-Types/CRUD.types';

//axios.defaults.withCredentials = false;

//  axios.interceptors.response.use(
//     response => response,
//     error => {
//         const status = error.response ? error.response.status : null;

//         if (status === 401) {
//             console.log('Handle 401');
//         } else if (status === 404) {
//             console.log('axios intercepted → Handle 404 ==> not found errors', error);
//         } else {
//             console.log('axios intercepted →  Handle other error',error);
//         }

//         return Promise.reject(error);
//     }
//     )

// axios.interceptors.request.use(function (config) {
//     const token = useAuthStore(state=>state.jwt )
//     config.headers.Authorization =  `Bearer ${token}`;

//     return config;
// });

const CRUD = {

    auth: async (data: any) => {
        try {
            console.log({ data });

            const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_API_HOST}/auth`, data);
            console.log('CRUD==>', { response });

            return response;
        } catch (error) {
            console.error(error);
        }
    },

    post: async (route: any, data: any) => {
        const response = await axios.post(`${import.meta.env.VITE_API_HOST}/${route}`, data);

        if (response.status === 200) {
            return response;
        }
    },

    postForm: async (route: string, data: CreatePostPayload, headers: AxiosRequestConfig<CreatePostPayload> | undefined) => {
        const response = await axios.postForm(`${import.meta.env.VITE_API_HOST}/${route}`, data, headers);

        if (response.status === 200) {
            return response;
        }
    },

    getForm: async (route: string, params?: { populate: PostPopulatableKeys[], type?: string }) => {
        const response = await axios.get<Post | Post[]>(`${import.meta.env.VITE_API_HOST}/${route}`, { params });

        if (response.status === 200) {
            return response.data;
        }
    },

    patchById: async (route: String, data: any) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_HOST}/${route}`, data);
            if (response.status === 200) {
                return response;
            }
            return response.status;
        } catch (err) {
            console.error(err);
            console.log({ err });
        }
    },

    patchFormById: async (route: string, data: any, headers: AxiosRequestConfig<any> | undefined) => {
        try {
            const response = await axios.patchForm(`${import.meta.env.VITE_API_HOST}/${route}`, data, headers);
            if (response.status === 200) {
                return response;
            }
            return response.status;
        } catch (err) {
            console.error(err);
            console.log({ err });
        }
    },

    deleteFormById: async (route: string) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_HOST}/${route}`);
        if (response.status === 200) {
            return response;
        }
        if (response.status === 401) {
            return response;
        }
    },

};

export default CRUD;
