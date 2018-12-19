import { connect } from 'react-redux';
import { SemiHeader } from '../Components/Semi-Header'
import { addFollower } from '../Actions/Actions'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => {
    return {
        followers: state.followersReducer.followers
    }
}
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onFollowClick: (event, owner) =>(_, getState) => {
        console.log("Followcontainer");
        event.preventDefault();
        //var currentState = getState();
        dispatch(
            addFollower(owner.id,owner.avatar,owner.username));
    },
}, dispatch)

const FollowContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SemiHeader);

export default FollowContainer;