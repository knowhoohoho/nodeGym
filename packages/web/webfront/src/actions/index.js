import axios from 'axios';



const defaultPath = "http://localhost:4000";


const userToken = localStorage.getItem('userlist')
const config =  {   
    headers : {
        'Content-Type': 'application/json',
        'Access-Token': userToken
        
    }
}

export default {
    login: async function({ data, extraHeaders = {} }) {
        const response = await axios.post(`${defaultPath}/auth/login`, data, {
           ...config,
            headers: {
                ...config.headers,
                ...extraHeaders
            }
        });

        return response.data;
    },
    register : async function ({data, extraHeaders = {}}) {
        const response = await axios.post(`${defaultPath}/auth/register`, data, {
            ...config,
            headers :{
                ...config.headers,
                ...extraHeaders
            }
        })
            return response.data
    },

    trainerImage: async function({ data, extraHeaders = {} }) {
        const response = await axios.post(`${defaultPath}/auth/trainerImage`, data, {
            ...config,
            headers: {
                ...config.headers,
                ...extraHeaders
                
            }
        });

        return response.data;
    },
    
    trainer : async function({ data , extraHeaders = {} }) {
        const response = await axios.post(`${defaultPath}/auth/trainers`, data , {
            ...config, 
            headers : {
                ...config.headers,
                ...extraHeaders
            }
        })
        return response.data 
    },

    story : async function({data, extraHeaders = {}}) {
        const response = await axios.post(`${defaultPath}/story`, data , {
            ...config, 
            headers : {
                ...config.headers,
                ...extraHeaders
            }
        })
        return response.data 
    },
    
    photoList : async function({data , extraHeaders} = {}) {
        const response = await axios.post(`${defaultPath}/photo`, data , {
        ...config, 
       extraHeaders
    })
    return response
        
    
    },

    storyFika : async function({data, extraHeaders = {}}) {
        const response = await axios.post(`${defaultPath}/auth/Fika`, data, {   
            ...config, 
            headers : {
                ...config.headers,
                ...extraHeaders
            }
        })
        return response.data 
    },

    detailPhoto : async function({data, extraHeaders = {}}) {
        const response = await axios.post(`${defaultPath}/photo/detail`, data, {   
            ...config, 
            headers : {
                ...config.headers,
                ...extraHeaders
            }
        })
        return response.data 
    },

    stroyDetail : async function({data , extraHeaders = {}}) {
        const response = await axios.post(`${defaultPath}/story/detail`, data , {
            ...config,
            headers : {
                ...config.headers,
                ...extraHeaders
            }
        })
        return response.data
    },

    ioMessenger : async function({data , extraHeaders = {}}) {
        const response = await axios.post(`${defaultPath}/auth/io`, data , {
            ...config,
            headers : {
                ...config.headers,
                ...extraHeaders
            }
        })
        return response.data
    },




}