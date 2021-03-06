import React, {Component} from 'react';
import customerService from '../../utils/customerService';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
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
    customerService.login(self.state)
      .then(() => {
        self.props.handleLogin();
        self.props.history.push('/');
      })
      .catch(err => self.props.updateMessage(err.message));
  }

  render() {
    return (
      <div className='LoginForm'>
        <div className='LoginForm-Container col-xs-12 col-sm-12'>
          <form onSubmit={this.handleSubmit} >
            <div className='form-group'>
              <div className='col-sm-12 LoginForm-Field'>
                <input type='email' className='form-control' placeholder='Email' value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-12 LoginForm-Field'>
                <input type='password' className='form-control' placeholder='Password' value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-12 text-center LoginForm-Field'>
                <button className='LoginForm-Button'>Log In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default LoginForm;