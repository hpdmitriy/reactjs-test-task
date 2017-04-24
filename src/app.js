import React, { PropTypes } from 'react';
import { Header, Navigation } from './components/index';
import { Modal } from './components/modal/index';
import { DevTools } from './utils/index';

export default class App extends React.Component {
    
    static propTypes = {
        children: PropTypes.any.isRequired  
    };
    static path = '/';
    
    render() {
        return (
            <div className='container'>
                <Modal />
                <Header />
                <div className='row'>
                    <div className='col-sm-3'>
                        <Navigation />
                    </div>
                { this.props.children }
                { NODE_ENV !== 'production' ? <DevTools /> : null }
            </div> </div>
        );
    }
    
}
