import axios from 'axios';
import { config } from '../config';

class ResumeApi
{
    constructor() 
    {
        this.getResumeList = async (successCallback, errorCallback) => this.consume('cv', {
            method: 'get', 
            successCallback, 
            errorCallback
        });
        this.getResume = async (id, successCallback, errorCallback) => this.consume(`cv/${id}`, {
            method: 'get', 
            successCallback, 
            errorCallback
        });
        this.createResume = async (data, successCallback, errorCallback) => this.consume('cv/add', {
            method: 'post', 
            data, 
            successCallback, 
            errorCallback
        });
        this.editResume = async (id, data, successCallback, errorCallback) => this.consume(`cv/${id}/edit`, {
            method: 'post', 
            data, 
            successCallback, 
            errorCallback
        });
        this.updateStatus = async(id, data, successCallback, errorCallback) => this.consume(`cv/${id}/status/update`, {
            method: 'post', 
            data, 
            successCallback, 
            errorCallback
        })
    }

    async consume(path, {method, params = {}, data = {}, successCallback, errorCallback}) {
        const queryString = Object.keys(params)
            .map(el => `${el}=${encodeURIComponent(params[el])}`)
            .join('&');
        const url = `${config.serviceApiBasePath}${path}?${queryString}`;
        console.log(url);
        await axios.request(url, {method, data})
            .then(successCallback)
            .catch(errorCallback);
    }
}

const ResumeApiInstance = new ResumeApi();
export { ResumeApiInstance };