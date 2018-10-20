import React from 'react'
import { Link } from 'react-router-dom';
import Slick from 'react-slick';

import styles from './slider.module.css';


const SliderTemplates = props => {

  let template = null;
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    ...props.settings
  }

  switch(props.type) {
    case 'featured':
      template = props.data.map((item, i) => (
        <div key={i}>
          <figure className={styles.featured}>
            <img src={`/images/articles/${item.image}`} alt={item.title} className={styles.featuredImg}/>
            <figcaption className={styles.featuredTitle}>
              <Link to="/">{ item.title }</Link>
            </figcaption>
          </figure>
        </div>
      ))
      break;
    default:
        return template = null;
  }
  return (
    <Slick {...settings}>
      {template}
    </Slick>
  )
}

export default SliderTemplates;