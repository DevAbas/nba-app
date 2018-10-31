import React, { Component } from 'react';
import FormField from '../Widgets/FormFields/FormFields';
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

  updateForm = (element) => {
    const newFormData = {
      ...this.state.formData
    }
    const newElement = {
      ...newFormData[element.id]
    }
    newElement.value = element.event.target.value;
    newFormData[element.id] = newElement;

    console.log(newElement)

    this.setState({
      formData: newFormData
    })
  }

  render() {
    return (
      <div className={styles.logContainer}>
        <form>
          <h2>Register / Log in</h2>
          <FormField 
            id={'email'}
            formdata={this.state.formData.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField 
            id={'password'}
            formdata={this.state.formData.password}
            change={(element) => this.updateForm(element)}
          />
        </form>
      </div>
    )
  }
}

export default SignIn;