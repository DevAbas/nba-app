import React from 'react';
import Slider from '../Widgets/NewsSlider/Slider';
import NewsList from '../Widgets/NewsList/NewsList';
import 'react-bootstrap';

const Home = () => (
  <div className='container pt-25'>
    <div className="row">
      <Slider 
        type="featured"
        start={0}
        amount={3}
        settings={{
          dots: false
        }}
        grid="col-md-6"
      />
      <NewsList
        type="card"
        start={0}
        amount={3}
        loadMore={true}
        grid="col-md-6 media-wrapper"
      />
    </div>
  </div>
);

export default Home;