import React from 'react';
import Slider from '../Widgets/NewsSlider/Slider';
import NewsList from '../Widgets/NewsList/NewsList';
import 'react-bootstrap';

const Home = () => (
  <div className='container'>
    <div className="row">
      <Slider 
        type="featured"
        start={0}
        amount={3}
        settings={{
          dots: false
        }}
        grid="col-md-7"
      />
      <NewsList
        type="card"
        start={3}
        amount={3}
        loadMore={true}
        grid="col-md-5"
      />
    </div>
  </div>
);

export default Home;