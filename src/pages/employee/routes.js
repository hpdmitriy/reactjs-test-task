import React from 'react';
import { Route } from 'react-router';
import EmployeePage from './employee';

export default (
    <Route>
        <Route component={ EmployeePage } path={ EmployeePage.path } />
    </Route>
);
