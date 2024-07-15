import axios from "axios";

const baseURL = 'http://192.168.1.148:8000';

const Client = axios.create({baseURL})

export default Client;