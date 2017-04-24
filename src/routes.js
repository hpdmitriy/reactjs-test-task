import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomePage, HomeRoutes } from './pages/home/index';
import { DepartmentRoutes } from './pages/department/index';
import { EmployeeRoutes } from './pages/employee/index';
import ErrorPage from './pages/error/index';


export default (
    <Route component={ App } path={ App.path } >
        <IndexRoute component={ HomePage } />
        
        { HomeRoutes }
        { DepartmentRoutes }
        { EmployeeRoutes }

        <Route path='*' component={ ErrorPage } />
    </Route>
);
