import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import './home.sss';

class HomePage extends React.Component {
    static path = '/';
    render() {
        return (
            <div className='col-sm-9 article'>
                <div className='jumbotron'>
                    <h1>Wellcome to React SPA</h1>
                    <p>Небольшое приложение на React. </p>
                    <p>В качестве бекенда используется мок-сервер - https://github.com/typicode/json-server</p>
                    <h3>Модели</h3>
                    <p>Department (name: string)</p>
                    <p>Employee (firstName: string, lastName: string, departmentId:number)</p>

                    <p><Link className='btn btn-primary btn-lg p' to='/department' role='button'>Go to Departments</Link> <Link className='btn btn-success btn-lg p' to='/employee' role='button'>Go to Employees</Link></p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        home: state.home
    };
}

export default connect(mapStateToProps)(HomePage);
