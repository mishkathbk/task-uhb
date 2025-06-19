import { BaseUrl } from '@/utils/BaseUrl';
import axios from 'axios'
const axiosClient = axios.create({
    baseURL : BaseUrl,
});

export {axiosClient}