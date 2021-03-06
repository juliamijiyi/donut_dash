import React, {Component} from 'react';
import customerService from '../../utils/customerService';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (field, e) => {
    this.props.updateMessage('');
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let self = this;
    customerService.signup(this.state)
      // successfully signed up - show HomePage
      .then(() => {
        self.props.handleSignup();
        self.props.history.push('/');
      })
      // invalid user data
      .catch(err => self.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className='SignupForm'>
        <div className='SignupForm-Container col-xs-12 col-sm-12'>
        <form onSubmit={this.handleSubmit} >
          <div className='form-group'>
            <div className='col-sm-12 SignupForm-Field'>
              <input type='text' className='form-control' placeholder='Name' value={this.state.name} onChange={(e) => this.handleChange('name', e)} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12 SignupForm-Field'>
              <input type='email' className='form-control' placeholder='Email' value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12 SignupForm-Field'>
              <input type='password' className='form-control' placeholder='Password' value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12 SignupForm-Field'>
              <input type='password' className='form-control' placeholder='Confirm Password' value={this.state.passwordConf} onChange={(e) => this.handleChange('passwordConf', e)} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12 text-center SignupForm-Field'>
              <button className='SignupForm-Button' disabled={this.isFormInvalid()}>Submit</button>
            </div>
          </div>
        </form>
        </div>
      </div>
    );
  }
};

export default SignupForm;