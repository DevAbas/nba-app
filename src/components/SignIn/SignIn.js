import React, { Component } from 'react';
import FormFields from '../Widgets/FormFields/FormFields';
import styles from './Signin.module.css';

class SignIn extends Component {

  state = {
    registerError: '',
    loading: false,
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  render() {
    return (
      <div className={styles.logContainer}>
        <form>
          <FormFields />
        </form>
      </div>
    )
  }
}

export default SignIn;