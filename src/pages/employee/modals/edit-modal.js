import React, { PropTypes } from 'react';
import { bindAll, map } from 'lodash';
import { connect } from 'react-redux';
import { closeModal } from '../../../components/modal/index';
import Input from '../../../components/ui/input/index';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import fetch from 'isomorphic-fetch';

class EditModal extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        departmentId: PropTypes.string.isRequired,
        onSave: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            id: this.props.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            departmentId: this.props.departmentId,
            errors: {
                name: ''
            }
        };

        bindAll(this, ['close', 'changeFirstName', 'changeLastName', 'onSelectChange', 'save']);
    }

    getOptions() {
        return fetch('http://localhost:3000/department/')
            .then(response => response.json())
            .then((items) => {
                return { options: map(items, (item) => {
                    return { value: item.id, label: item.name };
                })
                };
            });
    }


    close() {
        this.props.dispatch( closeModal() );
    }

    changeFirstName(firstName) {
        this.setState({ firstName });
    }
    changeLastName(lastName) {
        this.setState({ lastName });
    }
    onSelectChange(event) {
        const val = event !== null ? Number(event.value) : 0;
        this.setState({departmentId: '' + val});
    }
    save() {
        const { id, firstName, lastName, departmentId} = this.state;
        const errorTitle = 'Поле не должно быть пустым!';
        const errors = {
            firstName: '',
            lastName: '',
            departmentId: ''
        };
        if (firstName === '') {
            errors.firstName = errorTitle;
        }
        if (lastName === '') {
            errors.lastName = errorTitle;
        }
        if (departmentId === '') {
            errors.departmentId = errorTitle;
        }

        this.setState({ errors });

        if (errors.firstName || errors.lastName || errors.departmentId) {
            return;
        }
        this.props.dispatch( this.props.onSave({ id, firstName, lastName, departmentId }) );
        this.close();
    }
    render() {
        return (

            <div>
                <div className='modal-body'>
                    <p><b>ID:</b> { this.state.id }</p>
                    <Input onChange={ this.changeFirstName } value={ this.state.firstName } error={ this.state.errors.firstName } />
                    <Input onChange={ this.changeLastName } value={ this.state.lastName } error={ this.state.errors.lastName } />
                    <Select.Async
                                  value = { Number(this.state.departmentId) }
                                  onChange = {this.onSelectChange }
                                  loadOptions = { ::this.getOptions }
                    />
                </div>
                <div className='modal-footer'>
                    <button className='btn btn-default' onClick={ this.close }>Закрыть</button>
                    <button className='btn btn-success' onClick={ this.save }>Сохранить</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(EditModal);
