import React, { Component } from 'react';
import Slider from '../../../Widgets/NewsSlider/Slider';
import NewsList from '../../../Widgets/NewsList/NewsList';

class NewsMain extends Component {
  render() {
    return (
      <div>
        <Slider 
          type="featured"
          start={0}
          amount={3}
          settings={{
            dots: false
          }}
        />
        <NewsList
          type="cardMain"
          start={0}
          amount={10}
          loadMore={true}
        />
      </div>
    ) 
  }
}

export default NewsMain;