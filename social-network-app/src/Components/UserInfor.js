import React from 'react'
import '../Css/UserInfor.css'
import { connect } from 'react-redux';
import { Panel, Image, Row, Col } from 'react-bootstrap';

class UserInfor extends React.Component {
    render() {
        var userName =""
        var userAmout = 0
        var imgTag = <div className='loader small-loader tweetEntry-avatar' />

        if (this.props.userInfor === undefined){
            userName = "Tài khoản chưa đăng nhập"
        }else{
            console.log("DEFINED")
            console.log(this.props.userInfor)
            userName = this.props.userInfor.username
            userAmout = this.props.userInfor.currency.amount
            var imgPrefix = this.props.userInfor.avatar.includes('data') ? '' : 'data:image/jpeg;base64,';
            imgTag = <Image src={imgPrefix + this.props.userInfor.avatar} circle className="userAvatar"/>
        }

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Thông tin user:</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col xs={6} md={4}>
                            {imgTag}
                            {/* <Image src="http://www.croop.cl/UI/twitter/images/russel.jpg" circle className="userAvatar"/> */}
                        </Col>
                        <Col xs={12} md={8}>
                            {userName}
                            <br></br>
                            Số dư: {userAmout}
                            <br></br>
                            Năng lượng: 
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfor: state.appReducer.currentViewUserInfo,
    }
}

export default connect(mapStateToProps,null) (UserInfor);
