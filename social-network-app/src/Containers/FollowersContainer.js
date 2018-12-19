import { connect } from 'react-redux';
import { Followers } from '../Components/Followers'


const mapStateToProps = state => {
    return {
        followers: state.postReducer.followers
    }
}

const FollowersContainer = connect(
    mapStateToProps,
    null
)(Followers);

export default FollowersContainer;