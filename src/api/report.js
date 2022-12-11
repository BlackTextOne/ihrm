import request from '@/utils/request'

export function getReport() {
    return request({
        url:'/attendances/reports',
        method:'get'
    })
}