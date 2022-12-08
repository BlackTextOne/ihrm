import request from "@/utils/request";

//获取所有角色列表
export function getPermissions(params) {
  return request({
    url: "/sys/role",
    method: "get",
    params,
  });
}

//新增角色
export function addPermissions(data) {
  return request({
    url: "/sys/role",
    method: "post",
    data,
  });
}

//删除角色
export function removePermissions(id) {
  return request({
    url: `/sys/role/${id}`,
    method: "delete",
  });
}

//修改角色
export function showPermissions(id, data) {
  return request({
    url: `/sys/role/${id}`,
    method: "PUT",
    data,
  });
}

//获取所有权限点
export function getDis() {
  return request({
    url: "/sys/permission",
    method: "get",
  });
}

//分配权限
export function disPermissions(data) {
  return request({
    url: "/sys/role/assignPrem",
    method: "PUT",
    data,
  });
}
