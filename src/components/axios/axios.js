import axios from "axios";
const instance = axios.create({baseURL: 'https://api.cryptown-besquare.one/'});

export default instance