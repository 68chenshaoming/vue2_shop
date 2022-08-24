import requests from "./requersts";
export const reqGetLogin = (params) => requests({
    url: `/login`,
    method: 'post',
    data: params
})

export const reqGetMenu = () => requests({
    url: `menus`,
    method: 'get',

})

export const reqGetUsers = (params) => requests({
    url: `users`,
    method: 'get',
    params
})

export const reqChangeUserState = (uId, type) => requests({
    url: `users/${uId}/state/${type}`,
    method: 'put',

})

export const reqAddUser = (params) => requests({
    url: `users`,
    method: 'post',
    data: params
})

export const reqEdUser = (id) => requests({
    url: `users/${id}`,
    method: 'get'
})


// export const reqPutEdUser = (id, params) => requests({
//     url: `users/${id}`,
//     method: 'put',
//     data: params || {}
// })
export const reqDeleteUser = (id) => requests({
    url: `users/${id}`,
    method: 'delete'
})

// export const reqGetRightsList = (list) => requests({
//     url: `rights/${list}`,
//     method: 'get'
// })

export const reqGetRoles = () => requests({
    url: `roles`,
    method: 'get'
})

export const reqDeleteRight = (roleId, rightId) => requests({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
})

export const reqRoleById = (id) => requests({
    url: `roles/${id}`,
    method: 'get'
})

export const reqDeleteRole = (id) => requests({
    url: `roles/${id}`,
    method: 'delete'
})


export const reqAddRole = (data) => requests({
    url: `roles`,
    method: 'post',
    data
})

export const reqSetRight = () => requests({
    url: `rights/tree`,
    method: 'get',

})

export const reqGetRole = () => requests({
    url: `roles`,
    method: 'get'
})