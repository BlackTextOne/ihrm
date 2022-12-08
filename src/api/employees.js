import request from '@/utils/request'

export function getUser(params) {
    return request({
        method:'get',
        url:'/sys/user',
        params
    })
}

export function addUser(data) {
    return request({
        method:'post',
        url:'/sys/user',
        data
    })
}

export function removeUser(id) {
    return request({
        method:'delete',
        url:`/sys/user/${id}`,
    })
}

export function getBm() {
    return request({
        method:'GET',
        url:'/company/department',
    })
}