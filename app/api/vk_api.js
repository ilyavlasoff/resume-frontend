import { config } from '../config';
import { jsonp } from 'vue-jsonp';

class VkApi
{
    constructor() {
        this.getCityList = (params, successCallback, errorCallback) => this.consume('method/database.getCities', {
            params,
            successCallback, 
            errorCallback
        });
        this.getInstitutions = (params, successCallback, errorCallback) => this.consume('method/database.getUniversities', {
            params,
            successCallback, 
            errorCallback
        });
        this.getFaculties = (params, successCallback, errorCallback) => this.consume('method/database.getFaculties', {
            params,
            successCallback, 
            errorCallback
        });
    }

    consume(path, {params = {}, data = {}, successCallback, errorCallback}) {
        params.access_token = config.vkApiAccessToken;
        params.v = config.vkApiVersion;
        params.lang = 'ru';
        const queryString = Object.keys(params)
            .map(el => `${el}=${encodeURIComponent(params[el])}`)
            .join('&');
        const url = `${config.vkApiBasePath}${path}/?${queryString}`;
        jsonp(url, data).then(successCallback).catch(errorCallback);
    }
}

const VkApiInstance = new VkApi();

export { VkApiInstance };