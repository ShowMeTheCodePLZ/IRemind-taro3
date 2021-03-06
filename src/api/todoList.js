import request from "../utils/request";
/*
 * @Author: Luo Wei
 * @Date: 2022-03-20 17:22:25
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-07 22:52:17
 */

const routerURL = "/todoList";

export function addTodoList(data) {
  return request({
    method: "POST",
    url: `${routerURL}/addTodoList`,
    data
  });
}

export function deleteTodoList(data) {
  return request({
    method: "DELETE",
    url: `${routerURL}/deleteTodoList`,
    data
  });
}

export function alterTodoList(data) {
  return request({
    method: "PUT",
    url: `${routerURL}/alterTodoList`,
    data
  });
}

export function getTodoList() {
  return request({
    method: "GET",
    url: `${routerURL}/getTodoList`
  });
}

export function finishTodoList(data) {
  return request({
    method: "GET",
    url: `${routerURL}/finishTodoList/${data._id}`
  });
}
