import { connect } from 'react-redux';
import Followers from '../Components/Followers'

const mapStateToProps = state => {
    return {
        followers: state.followersReducer.followers
    }
}

const FollowersContainer = connect(
    mapStateToProps,
    null
)(Followers);

export default FollowersContainer;