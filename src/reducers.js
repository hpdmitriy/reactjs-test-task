import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { DepartmentReducer } from './pages/department/index';
import { EmployeeReducer } from './pages/employee/index';
import { ModalReducer } from './components/modal/index';


export default combineReducers({
    routing: routerReducer,
    ...DepartmentReducer,
    ...EmployeeReducer,
    ...ModalReducer
});
