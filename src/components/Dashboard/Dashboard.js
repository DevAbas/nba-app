import React, { Component } from 'react';
import FormField from '../Widgets/FormFields/FormFields';
import styles from './Dashboard.module.css';
import { firebaseTeams } from '../../firebase';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {

  state = {
    editorState: EditorState.createEmpty(),
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
      },
      body: {
        element: 'texteditor',
        value: '',
        valid: true
      },
      team:{
        element:'select',
        value:'',
        config:{
            name:'teams_input',
            options:[]
        },
        validation:{
            required:true
        },
        valid:false,
        touched:false,
        validationMessage:''
      }
    }
  }

  componentDidMount(){
    this.loadTeams()}

  loadTeams = () => {
    firebaseTeams.once('value')
    .then((snapshot)=>{
        let team = [];

        snapshot.forEach((childSnapshot)=>{
            team.push({
                id: childSnapshot.val().teamId,
                name: childSnapshot.val().city
            })
        })

        const newFormdata = {...this.state.formData};
        const newElement = {...newFormdata['team'] };

        newElement.config.options = team;
        newFormdata['team'] = newElement;

        this.setState({
            formData: newFormdata
        })
    })

  }

  onEditorStateChange = (editorState) => {

    let contentState = editorState.getCurrentContent();
    let rawState = convertToRaw(contentState)

    let html = stateToHTML(contentState)

    this.updateForm({id:'body'},html)

    this.setState({
        editorState
    })
  }

  updateForm = (element, content = '') => {
    const newFormData = {
      ...this.state.formData
    }
    const newElement = {
      ...newFormData[element.id]
    }
    if(content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content
    }
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

    console.log(dataToSubmit)

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

          <Editor
              editorState={this.state.editorState}
              wrapperClassName="myEditor-wrapper"
              editorClassName="myEditor-editor"
              onEditorStateChange={this.onEditorStateChange}
          />

          <FormField
              id={'team'}
              formdata={this.state.formData.team}
              change={(element)=>this.updateForm(element)}
          />

          { this.submitButton() }
          { this.showError() }
        </form>
      </div>
    )
  }
}

export default Dashboard;

