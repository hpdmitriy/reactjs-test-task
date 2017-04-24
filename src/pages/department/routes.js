import React from 'react';
import { Route } from 'react-router';
import DepartmentPage from './department';

export default (
    <Route>
        <Route component={ DepartmentPage } path={ DepartmentPage.path } />
    </Route>
);
