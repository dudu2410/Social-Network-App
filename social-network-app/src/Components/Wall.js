import React from 'react'
import '../Css/Wall.css'
import { connect } from 'react-redux';
import FollowContainer from '.././Containers/FollowContainer';


class Wall extends React.Component {
    render(){
        var userInfor =""
        var imgTag = <div className='loader small-loader tweetEntry-avatar' />

        if (this.props.userInfor === undefined){
            userInfor = "Khách vãng lai"
        }else{
            console.log("DEFINED")
            console.log(this.props.userInfor)
            userInfor = this.props.userInfor.username
            var imgPrefix = this.props.userInfor.avatar.includes('data') ? '' : 'data:image/jpeg;base64,';
            imgTag = <img src={imgPrefix + this.props.userInfor.avatar} alt="" />
        }
        return (
            <div>
                <div className="Img_Wall">
                    <img src="https://coverfiles.alphacoders.com/508/50802.jpg" alt=""></img>
                </div>
                <FollowContainer/>
                <div className="avatar_div">
                    <div className="avatar">
                        {/* <img src="http://www.croop.cl/UI/twitter/images/russel.jpg" alt=""/> */}
                        {imgTag}
                    </div>
                    <div className="UserName">
                        <div className="total">
                            {userInfor}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.appReducer.currentViewUserInfo)
    return {
        userInfor: state.appReducer.currentViewUserInfo,
    }
}

export default connect(mapStateToProps,null) (Wall);
