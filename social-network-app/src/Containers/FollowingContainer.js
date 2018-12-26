import { connect } from 'react-redux';
import FollowingApp from '../Components/FollowingApp'
import { bindActionCreators } from 'redux'
import { loadFollowers } from '../Actions/Actions'
import axios from 'axios';
console.log("1.vo following container");
const mapStateToProps = state => {
    return {
        current_user: state.appReducer.currentViewAddress,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    loadFollowers: (current_user) => () => {
        axios.get(`http://localhost:3002/get/current_user_info?address=${current_user}`)
            .then(async res  => {
         var followers = [];
         console.log("log async 1");
         console.log(current_user);
         await  res.data.followings.forEach(following => {
            console.log("log await 1");
                            axios.get(`http://localhost:3002/get/current_user_info?address=${following}`)
                            .then( 
                                async res => {
                                console.log("log async 2");
                                var simpleTxInfo = res.data;
                                    var follower = {
                                        id: simpleTxInfo.tx_hash,
                                        avatar: simpleTxInfo.picture,
                                        username: simpleTxInfo.name,
                                        key: following,
                                    };
                                    await followers.push(follower);
                                    console.log("log await 2" + follower.id);    
                            })
                    });
                    setTimeout(function(){ dispatch(loadFollowers(followers)); }, 1000);
                     
            })
    },
}, dispatch)

const FollowingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowingApp);

export default FollowingContainer;