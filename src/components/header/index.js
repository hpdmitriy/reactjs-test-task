import React from 'react';
import {Link} from 'react-router';
import './header.sss';

export default class Header extends React.Component {

    static path = '/';

    render() {
        return (
            <div className='page-header'>
                <h1><Link to='/'>ReactJS Test Task</Link></h1>
            </div>
        );
    }

}
