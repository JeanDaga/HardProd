import axios from 'axios';

export const api = axios.create({
  //baseURL: 'https://jsonplaceholder.typicode.com'
  baseURL: 'http://172.16.0.39:3000'
});

api.interceptors.request.use(
  (config) => {
    //let loggedUser = 91;

    //config.data.userId = loggedUser;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//O interceptador so pode ser usado com uma instancia do axios
//antes de ser enviado para o servidor - request
//ou a resposta - response
