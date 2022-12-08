import request from '@/utils/request'

//查询用户薪资
export function getUserMoney(userId) {
    return request({
        url:`/salarys/modify/${userId}`,
        method:'get',
    })
}

//获取企业薪资津贴设置
export function getUserMoneySet() {
    return request({
        url:'/salarys/settings',
        method:'get',
    })
}