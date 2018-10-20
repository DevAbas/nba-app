import React from 'react';
import Slider from '../Widgets/NewsSlider/Slider';

import styles from './home.module.css';

const Home = () => (
  <div className={styles.home}>
    <Slider 
      type="featured"
      start={0}
      amount={3}
      settings={{
        dots: false
      }}
    />
  </div>
);

export default Home;