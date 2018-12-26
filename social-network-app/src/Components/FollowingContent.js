import React from 'react'
import axios from 'axios'
import store from '../Store/MainStore'
import '../Css/Post.css'
import '../Css/App.css'
import { changeCurrentViewUser } from '../Actions/Actions';
import PropTypes from "prop-types"


export class FollowingContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loaded_content: [],
            isLoaded: false
        };
        this.onClickUser = this.onClickUser.bind(this);
    }

    onClickUser(e, address) {
        e.preventDefault();
        store.dispatch(changeCurrentViewUser(address));
        this.context.router.history.push("/");
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        console.log(this.props.contentType);
        switch (this.props.contentType) {
            case 'followings':
                {
                    this.props.content.addresses.forEach((address) => {
                        axios.get(`http://localhost:3002/get/current_user_info?address=${address}`)
                            .then((res) => {
                                if(res.data !== {}){
                                    var user_link = <div key={address} className='user-link' onClick={(e) => this.onClickUser(e, address)}>{res.data.name}</div>
                                    this.setState({
                                        loaded_content: [...this.state.loaded_content, user_link],
                                        isLoaded:  this.props.content.addresses.length === this.state.loaded_content.length + 1,
                                    });
                                }

                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                    break;
                }
            default:
                {
                    this.setState({
                        loaded_content: <div className='error-post'>{'Unknown transaction!'}</div>
                    });
                    break;
                }
        }
    }
    render() {
        var prefix = 'Đã theo dõi';
        var loader = <div className='loader-container'><div className='loader small-loader' /></div>;
        var export_content = this.state.isLoaded ? this.state.loaded_content : loader;
        return (
            <div className='following-content-container'>
                <div className='following-content-title'>{prefix}</div>
                {export_content}
            </div>
        );
    }
}
