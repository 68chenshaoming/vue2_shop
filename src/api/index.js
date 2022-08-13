import requests from "./requersts";
export const reqGetLogin = (params) => requests({
    url: `/login`,
    method: 'post',
    data: params
})