import axios, {AxiosInstance, AxiosResponse} from "axios";

const client: AxiosInstance = axios.create({ baseURL: 'https://site.api.espn.com'});

export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer token`;
    const onSuccess = (response: AxiosResponse) => response;
    const onError = (error: any) => {
        //optionally catch errors and add additional logging here
        return error
    }
    return client(options).then(onSuccess).catch(onError);
}