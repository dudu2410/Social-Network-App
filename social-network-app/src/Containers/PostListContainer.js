import { connect } from 'react-redux';
import { PostList } from '../Components/PostList'


const mapStateToProps = state => {
    return {
        posts: state.postReducer.posts,
    }
}
const PostListContainer = connect(
    mapStateToProps,
    null
)(PostList);

export default PostListContainer;