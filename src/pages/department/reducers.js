import {EDIT_DEPARTMENT, DELETE_DEPARTMENT, FETCH_DEPARTMENTS} from './actions';

const initialState = {
    items: [],
    error: '',
    isLoading: true
};

function departmentReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_DEPARTMENT:
            const idx = state.items.findIndex(item => item.id === action.id);
            state.items[idx].name = action.name;
            return Object.assign({}, state, {
                items: state.items,
                error: action.error || null
            });
        case DELETE_DEPARTMENT:
            state.items = state.items.filter(item => item.id !== action.id);
            return Object.assign({}, state, {
                items: state.items,
                error: action.error || null
            });
        case FETCH_DEPARTMENTS:
            return Object.assign({}, state, {
                items: action.items || [],
                isLoading: false,
                error: action.error || null
            });
        default:
            return state;
    }
}


const DepartmentReducer = {
    department: departmentReducer
};

export default DepartmentReducer;
