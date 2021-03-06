import React from 'react'
import '../Css/Header.css'
import { Link } from 'react-router-dom'


export const Header = ({ user, isLogin, onPostClick, onLogOut }) => {
    console.log("ham post:"+onPostClick)
    var input;

    let button;

    console.log(isLogin);
    if (!isLogin) {
        button = <Link to="/login"><button className="btn btn-primary">Log In</button></Link>
    } else {
        button = <button type="button" className="btn btn-primary" onClick={() => {
                            onLogOut();
                        }}>
                Log Out
                </button>
    }

    return (
        <nav className="justify-content-between navbar-dark bg-primary fixed navbar">
            <div>App name</div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">New post</button>
            {button}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Compose new post!!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea className="text-area" ref={node => input = node}></textarea>
                        </div>
                        <div className="modal-footer">
                            <div className="util-container">
                                <div className="float-left util">Ultil 1</div>
                                <div className="float-left util">Ultil 2</div>
                                <div className="float-left util">Ultil 3</div>
                            </div>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => {
                                onPostClick(e, input.value);
                            }}>
                                Post this!</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}