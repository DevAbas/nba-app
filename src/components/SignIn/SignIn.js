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
    if(element.blur) {
      const validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1]
    }
    newElement.touched = element.blur;
    newFormData[element.id] = newElement;
    this.setState({
      formData: newFormData
    })
  }

  validate = (element) => {
    let error = [true, ''];

    if(element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = `${!valid ? 'Must be a valid email' : ''}`
      error = !valid ? [false, message] : error;
    }

    if(element.validation.password) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? 'Must be greater than 5' : ''}`
      error = !valid ? [false, message] : error;
    }

    if(element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is reuqired' : ''}`;
      error = !valid ? [false, message] : error
    }

    return error;
  } 

  render() {
    console.log(this.state.formData)
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