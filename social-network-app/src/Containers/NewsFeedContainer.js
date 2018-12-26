import { connect } from 'react-redux';
import { loadPosts, loadCurrentViewUserInfo } from '../Actions/Actions'
import { App } from '../Components/App'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { SemiHeader } from '../Components/Semi-Header';


const mapStateToProps = state => {
    return {
        currentViewAddress: state.appReducer.currentViewAddress,
        isNewFeed: true,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    loadNewsFeed:(currentViewAddress) => () => {
        axios.get(`http://localhost:3002/get/current_user_info?address=${currentViewAddress}`)
            .then( (res)  => {
                var posts = [];
         var followings = res.data.followings;
         followings.push(currentViewAddress);
         console.log(" Array followings: " + followings.length);
           followings.forEach(following => {
            console.log("log await 1");
                           axios.get(`http://localhost:3002/get/transactions?address=${following}`)
                            .then( (res) => {
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
                            })
                    });
                    setTimeout(function(){ dispatch(loadPosts(posts)); }, 1000);
            })
    },
}, dispatch)

const NewsFeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default NewsFeedContainer;