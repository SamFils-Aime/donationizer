import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducers/authReducer';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';


class Nav extends Component{
    render(){
        if( this.props.user.user_id ) return <LoggedIn user={this.props.user} logoutUser={this.props.logoutUser} />

        return(
            <div>
                <LoggedOut />
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { user } = state.authReducer;
    return{
        user
    }
}

export default connect(
        mapStateToProps,
        {
            logoutUser
        }
    )

(Nav);