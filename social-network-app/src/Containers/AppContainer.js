import { connect } from 'react-redux';
import { App } from '../Components/App'
import { loadPosts } from '../Actions/Actions'
import { bindActionCreators } from 'redux'
import axios from 'axios'
console.log("1.vo app container");
const mapStateToProps = state => {
    return {
        current_user: state.appReducer.current_user,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    loadPosts: (current_user) => () => {
        axios.get(`http://localhost:3002/get/transactions?address=${current_user}`)
            .then(res => {
                console.log("app du lieu " + res.data);
                var posts = [];
                res.data.forEach(simpleTxInfo => {
                    var post = {
                        id: simpleTxInfo.tx_hash,
                        type: simpleTxInfo.type,
                        content: simpleTxInfo.content.toString(),
                        content_type: simpleTxInfo.content_type,
                        from: simpleTxInfo.from,
                        sequence: simpleTxInfo.sequence,
                        avatar: '',
                        username: '',
                        heart: '',
                        comment: '',
                        share: '',
                    };
                    posts.push(post);
                });
                console.log("Day la appconteianer "+ posts);
                dispatch(loadPosts(posts));
                // dispatch(
                //     addPost(currentState.postReducer.user.id,
                //         input,
                //         today.toLocaleString,
                //         currentState.postReducer.user.avatar,
                //         currentState.postReducer.user.username,
                //         0, 0, 0));
            })
    
    },
}, dispatch)

const AppCont = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppCont;