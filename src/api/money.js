import request from '@/utils/request'

//获取信息列表
export function getMoney(data) {
    return request({
        url:'/salarys/list',
        method:'post',
        data
    })
}

//调薪
export function setMoney(userId,data) {
    return request({
        url:`/salarys/modify/${userId}`,
        method:'post',
        data
    })
}

//定薪
export function dMoney(userId,data) {
    return request({
        url:`/salarys/init/${userId}`,
        method:'post',
        data
    })
}