import React from 'react'
import '../Css/LoginForm.css'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login } from './../Actions/Actions'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privatekey: '',
            errors: {},
            isLoading: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState ( { errrors: {}, isLoading: true});
        this.props.login(this.state).then(
            (res) => this.context.router.push('/'),
        );
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    render(){
        const { errors, privatekey, isLoading } =this.state;

        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                            <label>
                                Your Private Key:
                                <input type="password" name="privatekey" className="input-box" onChange={this.onChange}/>
                            </label>
                            <Button type="submit" bsStyle="info" >Login</Button>
                        </form>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
            );
        }
    }
    


export default connect(null, { login }) (LoginForm);