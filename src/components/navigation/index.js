import React from 'react';
import {Link} from 'react-router';
import './navigation.sss';

export default class Navigation extends React.Component {

    static path = '/';

    render() {
        return (
            <aside className='navigation_main'>
                <h4><Link to='/department'>Departments</Link></h4>
                <h4><Link to='/employee'>Employees</Link></h4>
            </aside>

        );
    }

}
