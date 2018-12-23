import React from 'react'
import '../Css/LoginForm.css'
import { Modal, Button } from 'react-bootstrap'
import { login } from './../Actions/Actions'
import axios from 'axios';
var {GetPKFromFK} = require('../lib/tx');

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privatekey: '',
            errors: {},
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
            var getAccountAPI = `https://komodo.forest.network/tx_search?query="account=%27${PublicKey}%27"`;

        axios.get(getAccountAPI)
        .then(res => {
            // Dont have user for this privatekey
            if (res.data.result.total_count == 0)
            {
                console.log("Tài khoản có privatekey tương ứng chưa được đăng ký.")
                this.setState({ isLogin: false });
                localStorage.removeItem('privatekey');
            }
            else
            {
                this.setState({ isLogin: true });
                localStorage.setItem("privatekey", this.state.privatekey );
                Redirect("/home");
                
            }
        }).catch(err => console.log('==err', err));
        }
        catch (err) {
            console.log("Lỗi privatekey");
        }        
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
    
const mapsStateToProps = state => {

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toLogin: (privatekey) => {
            dispatch(login(privatekey));
        }
    }
}

function Redirect(link) {
    window.location=link;
 }

export default LoginForm;