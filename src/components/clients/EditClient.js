import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/spinner';

class EditClient extends Component {
  constructor(props) {
    super(props);

    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    const updateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value
    };

    firestore
      .update({ collection: 'clients', doc: client.id }, updateClient)
      .then(() => history.push('/'));
  };

  render() {
    const { client } = this.props;
    if (client) {
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
                      defaultValue={client.firstName}
                      onChange={this.onChange}
                      required
                      minLength="2"
                      type="text"
                      className="form-control"
                      name="firstName"
                      ref={this.firstNameInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      defaultValue={client.lastName}
                      onChange={this.onChange}
                      required
                      minLength="2"
                      type="text"
                      className="form-control"
                      name="lastName"
                      ref={this.lastNameInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      defaultValue={client.email}
                      onChange={this.onChange}
                      type="email"
                      className="form-control"
                      name="email"
                      ref={this.emailInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      defaultValue={client.phone}
                      onChange={this.onChange}
                      type="phone"
                      minLength="10"
                      className="form-control"
                      name="phone"
                      ref={this.phoneInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      defaultValue={client.balance}
                      onChange={this.onChange}
                      type="text"
                      className="form-control"
                      name="balance"
                      ref={this.balanceInput}
                    />
                  </div>
                  <input
                    type="submit"
                    defaultValue="Submit"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
