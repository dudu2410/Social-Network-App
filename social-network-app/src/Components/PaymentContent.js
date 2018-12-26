import React from 'react'
import axios from 'axios'
import store from '../Store/MainStore'
import '../Css/Post.css'
import '../Css/App.css'
import { changeCurrentViewUser } from '../Actions/Actions';
import PropTypes from "prop-types"


export class PaymentContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            export_content: <div className='loader' />,
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
            case 'currency':
                {
                    console.log(this.props.content.address);
                    console.log(this.props.current_user_address);
                    if (this.props.content.address === this.props.current_view_address) {
                        axios.get(`http://localhost:3002/get/current_user_info?address=${this.props.from}`)
                            .then((res) => {
                                var paymentContentBlock;
                                console.log(res.data);
                                var prefix = 'Đã nhận ';
                                var middlefix = <span className='currency'>{this.props.content.amount + ' CEL'}</span>;
                                var suffix = ' từ ';
                                var user_link = <span className='user-link' onClick={(e) => this.onClickUser(e, this.props.from)}>{res.data.name}</span>
                                paymentContentBlock = <div>{prefix}{middlefix}{suffix}{user_link}</div>;
                                this.setState({
                                    export_content: paymentContentBlock,
                                });
                                console.log(this.state.export_content);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                    else {
                        axios.get(`http://localhost:3002/get/current_user_info?address=${this.props.content.address}`)
                            .then((res) => {
                                var paymentContentBlock;
                                console.log(res.data);
                                var prefix = 'Đã chuyển ';
                                var middlefix = <span className='currency'>{this.props.content.amount + ' CEL'}</span>;
                                var suffix = ' đến ';
                                var user_link = <span className='user-link' onClick={(e) => this.onClickUser(e, this.props.content.address)}>{res.data.name}</span>
                                paymentContentBlock = <div>{prefix}{middlefix}{suffix}{user_link}</div>;
                                this.setState({
                                    export_content: paymentContentBlock,
                                });
                                console.log(this.state.export_content);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                    break;
                }
            default:
                {
                    this.setState({
                        export_content: <div>{'Giao dịch không nhận dạng được'}</div>
                    });
                    break;
                }
        }
    }
    render() {
        return (this.state.export_content);
    }
}
