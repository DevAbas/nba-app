import React from 'react';

import styles from './Formfields.module.css';

const FormFields = ({ formdata, change, id }) => {


  const renderTemplate = () => {
    let templateForm = null;

    switch(formdata.element) {
      case ('input'):
        templateForm = (
          <input
            {...formdata.config}
            value={formdata.value}
            onBlur={(event) => change({event, id, blur: true})}
            onChange={(event) => change({event, id, blur: false})}
          />
        );
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