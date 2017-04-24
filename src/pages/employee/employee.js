import React, { PropTypes } from 'react';
import { bindAll, map, find, assign } from 'lodash';
import { connect } from 'react-redux';
import EmployeeItem from './employee-item';
import { fetchEmployees, fetchEmployeesDepartments } from './actions';
import Loader from '../../components/ui/loader/index';
class EmployeePage extends React.Component {
    
    static path = '/employee';
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        employee: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        bindAll(this, ['renderItems']);
        this.state = {
            employee: '',
            department: ''
        };

        this.props.dispatch(fetchEmployees());
        this.props.dispatch(fetchEmployeesDepartments());
    }

    renderItems(item, idx) {
        return (
            <EmployeeItem
                key = { idx }
                id = { item.id}
                lastName = { item.lastName }
                firstName = { item.firstName }
                departmentId = { item.departmentId }
                departmentName = {item.departmentName}
            />
        );
    }

    render() {
        const {error, isLoading, department } = this.props.employee;
        let { items } = this.props.employee;
        items = map(items, (emp) => {
            const curDepartment = find(department, (dep) => {
                return Number(emp.departmentId) === dep.id;
            });
            return assign(emp, {'departmentName': curDepartment ? curDepartment.name : '-'});
        });
        return (
            <div className='col-sm-9 article'>
                    <h3>Employees</h3>

                    <table className='table table-bordered table-hover  table_employee'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { isLoading ? <tr><td colSpan='5'><Loader /></td></tr> :
                            error ? <tr><td colSpan='5'> { error }</td></tr> :
                                items.length ? items.map(this.renderItems) :
                                    <tr><td colSpan='5'>Нет данных</td></tr>
                        }
                        </tbody>
                    </table>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        employee: state.employee
    };
}

export default connect(mapStateToProps)(EmployeePage);
