import React from 'react'
import '../Css/UserInfor.css'
import { connect } from 'react-redux';
import { Panel, Image, Row, Col, Button, Glyphicon, Modal, FormControl } from 'react-bootstrap';

class UserInfor extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.onUpdate = this.onUpdate.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.onChange = this.onChange.bind(this);
    
        this.state = {
          show: false,
          userUpdate: ''
        };
      }

    onUpdate() {
        console.log(this.state.userUpdate);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    handleHide() {
        this.setState({ show: false });
    }
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
          <div>
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Row>
                        <Col xs={12} md={8}>
                            <Panel.Title componentClass="h3">Thông tin user:</Panel.Title>
                        </Col>
                        <Col xs={6} md={4}>
                        {(this.props.currentLogginAddress === this.props.currentViewAddress) ? (
                            <Button  onClick={() => this.setState({ show: true })}>
                                <Glyphicon glyph="edit"/>
                            </Button>                        
                        ) : (
                            <div></div>
                        )}
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col xs={6} md={4}>
                            {imgTag}
                            {/* <Image src="http://www.croop.cl/UI/twitter/images/russel.jpg" circle className="userAvatar"/> */}
                        </Col>
                        <Col xs={12} md={8}>
                            <strong>{userName}</strong>
                            <br></br>
                            <strong>Số dư: </strong>{userAmout}
                            <br></br>
                            <strong>Năng lượng:</strong>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
            <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title">
                Cập nhật thông tin tài khoản
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col Col xs={6} md={4} className='label_update'>
                        Tên cập nhật mới:
                    </Col>
                    <Col Col xs={12} md={8}>
                        <FormControl
                            name="userUpdate"
                            type="text"
                            onChange={this.onChange}
                            placeholder="Enter text"
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
              <Button onClick={this.onUpdate}>Update</Button>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfor: state.appReducer.currentViewUserInfo,
        currentLogginAddress: state.appReducer.currentLogginAddress,
        currentViewAddress: state.appReducer.currentViewAddress
    }
}

export default connect(mapStateToProps,null) (UserInfor);
