import fetch from 'isomorphic-fetch';
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const FETCH_EMPLOYEES_DEPARTMENTS = 'FETCH_EMPLOYEES_DEPARTMENTS';


export function editEmployee(employee) {
    const {id, firstName, lastName, departmentId } = employee;
    const url = `http://localhost:3000/employee/${id}`;
    return function(dispatch) {
        return fetch(url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `firstName=${firstName}&lastName=${lastName}&departmentId=${departmentId}`
        })
            .then(response => response.json())
            .then((item) => {
                dispatch({
                    type: EDIT_EMPLOYEE,
                    id, firstName, lastName, departmentId
                });
            })
            .catch((error) => {
                dispatch({
                    type: EDIT_EMPLOYEE,
                    error
                });
            });
    };
}

export function deleteEmployee(id) {
    const url = `http://localhost:3000/employee/${id}`;
    return function(dispatch) {
        return fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(response => response.json())
            .then((item) => {
                dispatch({
                    type: DELETE_EMPLOYEE,
                    id
                });
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_EMPLOYEE,
                    error
                });
            });
    };
}

export function fetchEmployees() {
    const url = 'http://localhost:3000/employee';
    return function(dispatch) {
        return fetch(url)
            .then(response => response.json())
            .then((items) => {
                dispatch({
                    type: FETCH_EMPLOYEES,
                    items
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_EMPLOYEES,
                    error
                });
            });
    };
}

export function fetchEmployeesDepartments() {
    const url = 'http://localhost:3000/department';
    return function(dispatch) {
        return fetch(url)
            .then(response => response.json())
            .then((departments) => {
                dispatch({
                    type: FETCH_EMPLOYEES_DEPARTMENTS,
                    departments
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_EMPLOYEES_DEPARTMENTS,
                    error
                });
            });
    };
}
