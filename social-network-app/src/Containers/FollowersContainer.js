import { connect } from 'react-redux';
import Followers from '../Components/Followers'
import { bindActionCreators } from 'redux'
import { loadFollowers } from '../Actions/Actions'
import axios from 'axios';

const mapStateToProps = state => {
    return {
        current_user: state.appReducer.current_user,
        followers: state.followersReducer.Followers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    loadFollowers: (current_user) => () => {
        axios.get(`localhost:3002/get/current_user_info?address=${current_user}`)
            .then(res => {
                console.log(res.data);
                var followers = [];
                res.data.forEach(simpleTxInfo => {
                    axios.get(`http://localhost:3002/get/transactions?address=${simpleTxInfo.followings}`)
                    .then(res => {
                        console.log(res.data);
                        var posts = [];
                        res.data.forEach(simpleTxInfo => {
                            var post = {
                                id: simpleTxInfo.tx_hash,
                                avatar: '',
                                username: '',
                            };
                            followers.push(follower);
                        });
                    })
                    
                });

                dispatch(loadFollowers(followers));
            });     
    },
}, dispatch)

const FollowersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Followers);

export default FollowersContainer;