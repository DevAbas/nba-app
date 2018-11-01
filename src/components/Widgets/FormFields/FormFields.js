import React from 'react';
import styles from './Formfields.module.css';

const FormFields = ({ formdata, change, id }) => {


  const showError = () => {
    let errorMessage= null;

    if(!formdata.valid) {
      errorMessage = (
        <div className={styles.labelError}>
          {formdata.validationMessage}
        </div>
      )
    }

    return errorMessage;
  }

  const renderTemplate = () => {
    let templateForm = null;

    switch(formdata.element) {
      case ('input'):
        templateForm = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({event, id, blur: true})}
              onChange={(event) => change({event, id, blur: false})}
            />
            { showError() }
          </div>
        );
      break;
      case('select'):
        templateForm = (
          <div>
            <select 
              value={formdata.value}
              name={formdata.config.name}
              onBlur={(event) => change({event, id, blur: true})}
              onChange={(event) => change({event, id, blur: false})}
            >
              {formdata.config.options.map((item, i) => (
                <option key={i} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        )
      break;
      default:
        templateForm = null;
    }
    return templateForm;
  }

  return (
    <div>
      { renderTemplate() }
    </div>
  )
}

export default FormFields;