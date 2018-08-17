import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Spinner from '../layout/spinner';
import classnames from 'classnames';

class AppNavBar extends Component {
  state = {
    isAuthenticated: false
  };

  onLogout = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {this.props.auth.email}
                  </a>
                </li>
                <a onClick={this.onLogout} href="#!" className="nav-link">
                  Logout
                </a>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavBar);
