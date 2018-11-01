import React, { Component } from 'react';
import FormField from '../Widgets/FormFields/FormFields';
import styles from './Dashboard.module.css';

class Dashboard extends Component {

  state = {
    postError: '',
    loading: false,
    formData: {
      author: {
        element: 'input',
        value: '',
        config: {
          name: 'author',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title',
          type: 'text',
          placeholder: 'Enter the title'
        },
        validation: {
          required: true
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

    if(element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is reuqired' : ''}`;
      error = !valid ? [false, message] : error
    }

    return error;
  }
  
  onSubmitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value
    }
    for(let key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if(formIsValid) {
      console.log('SUBMIT POST')
    } else {
      this.setState({
        postError: 'Something went wrong'
      })
    }
  }

  submitButton = () => (
    this.state.loading ? 
      'Loading....':
    <div>
      <button type="submit">Add Post</button>
    </div>
  )

  showError = () => {
    return (
      this.state.postError !== '' ? 
        <div className={styles.error}>{this.state.postError}</div>
      : ''
    )
  }

  render() {
    return (
      <div className={styles.postContainer}>
        <form onSubmit={this.onSubmitForm}>
          <h2>Add post</h2>
          <FormField 
            id={'author'}
            formdata={this.state.formData.author}
            change={(element) => this.updateForm(element)}
          />
          <FormField 
            id={'title'}
            formdata={this.state.formData.title}
            change={(element) => this.updateForm(element)}
          />
          { this.submitButton() }
          { this.showError() }
        </form>
      </div>
    )
  }
}

export default Dashboard;

