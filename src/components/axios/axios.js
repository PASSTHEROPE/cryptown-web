import axios from "axios";
const instance = axios.create({baseURL: 'http://api.cryptown-besquare.one/'});

export default instance