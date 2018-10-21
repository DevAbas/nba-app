import React from 'react';

const Button = props => {
  let template = null;
   switch(props.type) {
     case 'loadMore':
      template = (
        <button onClick={props.loadMore} className="btn btn-primary mt-10">
          {props.cta}
        </button>
      );
      break; 
    default: 
      template = null;
   }
   return template;
}

export default Button;