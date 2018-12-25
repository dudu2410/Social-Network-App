import React from 'react'
import axios from 'axios';
import '../Css/LoginForm.css'
import { Modal, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Actions from './../Actions/Actions'
import PropTypes from "prop-types";

var {GetPKFromFK} = require('../lib/tx');

class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            privatekey: '',
            errors: '',
            isLoading: false,
            isLogin: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState ( { errrors: {}, isLoading: true});
        var PublicKey
        // Check privatekey format true ?
        try {
            PublicKey = GetPKFromFK(this.state.privatekey);
            var getAccountAPI = `https://zebra.forest.network/tx_search?query="account=%27${PublicKey}%27"`;

        axios.get(getAccountAPI)
        .then(res => {
            // Dont have user for this privatekey
            if (res.data.result.total_count === '0')
            {
                this.setState({errors : "Tài khoản có privatekey tương ứng chưa được đăng ký."})
                console.log("Tài khoản có privatekey tương ứng chưa được đăng ký.")
                this.setState({ isLogin: false });
                localStorage.removeItem('privatekey');
            }
            else
            {
                this.setState({ isLogin: true });
                localStorage.setItem("privatekey", this.state.privatekey );
                this.props.onLogin(getLoginState(PublicKey));
                this.context.router.history.push("/home");
            }
        }).catch(err => console.log('==err', err));
        }
        catch (err) {
            this.setState({errors : "Privatekey không đúng định dạng."})
            console.log("Lỗi privatekey");
        }        
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    static contextTypes = {
        router: PropTypes.object
    }

    render(){
        return (
            <div>
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
                <div className="warning_dialog">

                {(this.state.errors === "") ? (
                    <div></div>
                ) : (
                    <Alert bsStyle="warning">
                        <strong>{this.state.errors}</strong>
                    </Alert>
                )}
                
                </div>
            </div>
            );
        }
    }
    
function getLoginState (PublicKey){
    return {
        isLogin : true,
        currentLogginAddress : PublicKey,
        currentViewAddress: PublicKey,
    }
}

const mapDispatchToProps = (dispatch,state) => {
    return {
        onLogin : (state) => {
            dispatch(Actions.login(state));
        }
    }
}

export default connect(null,mapDispatchToProps) (LoginForm);