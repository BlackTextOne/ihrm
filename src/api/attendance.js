import request from '@/utils/request'

//获取部门列表
export function getBm() {
    return request({
        method:'GET',
        url:'/company/department',
    })
}

//查询考勤数据列表
export function getKq() {
    return request({
        method:'GET',
        url:'/attendances',
    })
}

//编辑用户考勤记录
export function submitKq(id,data) {
    return request({
        method:'PUT',
        url:`/attendances/${id}`,
        data
    })
}
