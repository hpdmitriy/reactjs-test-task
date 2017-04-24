import {EDIT_EMPLOYEE, DELETE_EMPLOYEE, FETCH_EMPLOYEES, FETCH_EMPLOYEES_DEPARTMENTS} from './actions';

const initialState = {
    items: [],
    error: '',
    isLoading: true,
    department: []
};

function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_EMPLOYEE:
            const idx = state.items.findIndex(item => item.id === action.id);
            state.items[idx].firstName = action.firstName;
            state.items[idx].lastName = action.lastName;
            state.items[idx].departmentId = action.departmentId;
            return Object.assign({}, state, {
                items: state.items,
                error: action.error || null
            });
        case DELETE_EMPLOYEE:
            state.items = state.items.filter(item => item.id !== action.id);
            return Object.assign({}, state, {
                items: state.items,
                error: action.error || null
            });
        case FETCH_EMPLOYEES:
            return Object.assign({}, state, {
                items: action.items || [],
                isLoading: false,
                error: action.error || null
            });
        case FETCH_EMPLOYEES_DEPARTMENTS:
            return Object.assign({}, state, {
                department: action.departments || []
            });
        default:
            return state;
    }
}


const EmployeeReducer = {
    employee: employeeReducer
};

export default EmployeeReducer;
