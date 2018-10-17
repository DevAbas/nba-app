import React from 'react';

import styles from './backdrop.module.css';

const Backdrop = props => {

  let backdrop = (
    props.show && <div className={styles.backdrop} onClick={props.close}></div>
  );

  return (
      <div>
        { backdrop }
      </div>
  )
};

export default Backdrop;