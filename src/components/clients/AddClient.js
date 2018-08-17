import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;
    const { firestore, history } = this.props;

    if (newClient.balance === '') {
      newClient.balance = '0';
    }

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    value={this.state.firstName}
                    onChange={this.onChange}
                    required
                    minLength="2"
                    type="text"
                    className="form-control"
                    name="firstName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    value={this.state.lastName}
                    onChange={this.onChange}
                    required
                    minLength="2"
                    type="text"
                    className="form-control"
                    name="lastName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="email"
                    className="form-control"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    value={this.state.phone}
                    onChange={this.onChange}
                    type="phone"
                    minLength="10"
                    className="form-control"
                    name="phone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    value={this.state.balance}
                    onChange={this.onChange}
                    type="text"
                    className="form-control"
                    name="balance"
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(AddClient);
