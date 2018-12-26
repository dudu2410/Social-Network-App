import { connect } from 'react-redux';
import { App } from '../Components/App'
import { loadPosts, loadCurrentViewUserInfo } from '../Actions/Actions'
import { bindActionCreators } from 'redux'
import axios from 'axios'


const mapStateToProps = state => {
    return {
        currentViewAddress: state.appReducer.currentViewAddress,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    loadPosts: (currentViewAddress) => () => {
        axios.get(`http://localhost:8888/get/post?address=${currentViewAddress}`)
            .then((res) => {
                var posts = [];
                res.data.forEach(simpleTxInfo => {
                    console.log(simpleTxInfo);
                    var post = {
                        id: simpleTxInfo.tx_hash,
                        type: simpleTxInfo.type,
                        content: simpleTxInfo.content,
                        content_type: simpleTxInfo.content_type,
                        from: simpleTxInfo.from,
                        sequence: simpleTxInfo.sequence,
                        heart: '',
                        comment: '',
                        share: '',
                        current_view_address: currentViewAddress,
                    };
                    posts.push(post);
                });
                dispatch(loadPosts(posts));
                return axios.get(`http://localhost:8888/get/current_user_info?address=${currentViewAddress}`);

            }).then((res) => {
                var currentViewUserInfo = {
                    avatar: res.data.picture,
                    username: res.data.name,
                    following: res.data.followings,
                    currency: res.data.currency
                }
                dispatch(loadCurrentViewUserInfo(currentViewUserInfo));
            }).catch((err) => {
                console.log(err);
            })
    },
}, dispatch)

const AppCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppCont;