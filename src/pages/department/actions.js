import fetch from 'isomorphic-fetch';
import {reject, map} from 'lodash';

export const EDIT_DEPARTMENT = 'EDIT_DEPARTMENT';
export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';
export const FETCH_DEPARTMENTS = 'FETCH_DEPARTMENTS';


function resetEmployeeDepartnentId(ids) {
    return Promise.all(ids.map(id => fetch(`http://localhost:3000/employee/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'departmentId=0'
    })))
        .then(response => response.json())
        .catch((error) => {
            console.log(error);
        });
}

function getEmployeeFromDepartnentId(id) {
    const url = 'http://localhost:3000/employee';
    return fetch(url)
        .then(response => response.json())
        .then((items) => {
            return map(reject(items, (item) => Number(item.departmentId) !== id), 'id');
        })
        .then((ids) => {
            resetEmployeeDepartnentId(ids);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function editDepartment(department) {
    const {id, name} = department;
    const url = `http://localhost:3000/department/${id}`;
    return function(dispatch) {
        return fetch(url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `name=${name}`
        })
        .then(response => response.json())
        .then((item) => {
            dispatch({
                type: EDIT_DEPARTMENT,
                id, name
            });
        })
        .catch((error) => {
            dispatch({
                type: EDIT_DEPARTMENT,
                error
            });
        });
    };
}

export function deleteDepartment(id) {
    const url = `http://localhost:3000/department/${id}`;
    return function(dispatch) {
        return fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(response => response.json())
            .then((item) => {
                dispatch({
                    type: DELETE_DEPARTMENT,
                    id
                });
            })
            .then(() => {
                return getEmployeeFromDepartnentId(id);
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_DEPARTMENT,
                    error
                });
            });
    };
}

export function fetchDepartments() {
    const url = 'http://localhost:3000/department';
    return function(dispatch) {
        return fetch(url)
            .then(response => response.json())
            .then((items) => {
                dispatch({
                    type: FETCH_DEPARTMENTS,
                    items
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_DEPARTMENTS,
                    error
                });
            });
    };
}
