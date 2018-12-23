import { connect } from 'react-redux';
import { Header } from '../Components/Header'
import { addPost, logOut } from '../Actions/Actions'
import { bindActionCreators } from 'redux'


const mapStateToProps = state => {
    return {
        isLogin : state.appReducer.isLogin,
        user: state.postReducer.user
    }
}

// function asyncActionCreator(input) {
//     return (dispatch, getState) => {
//         var today = new Date().getDate();
//         dispatch(
//             addPost(getState.postReducer.user.id,
//                 input,
//                 today.postReducer.toLocaleString,
//                 getState.postReducer.user.avatar,
//                 getState.postReducer.user.username,
//                 0, 0, 0));
//     }
// }


// const mapDispatchToProps = (dispatch) => ({
//     onPostClick: (input) => dispatch(asyncActionCreator(input))
// });

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onPostClick: (event, input) => (_, getState) => {
        event.preventDefault() // <-- control the event
        var today = new Date().getDate();
        var currentState = getState();
        console.log(input);
        // dispatch(
        //     addPost(currentState.postReducer.user.id,
        //         input,
        //         today.toLocaleString,
        //         currentState.postReducer.user.avatar,
        //         currentState.postReducer.user.username,
        //         0, 0, 0));
    },
    onLogOut: ()  => () => {
        dispatch(logOut());
    },
}, dispatch)

const AppNavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default AppNavBar;