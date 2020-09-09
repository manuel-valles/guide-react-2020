import React from 'react';

class Carousel extends React.Component {
  // photos will be an array of photos (string of URLs), and active the index of the current photo
  state = {
    photos: [],
    active: 0,
  };
  static getDerivedStateFromProps({ media }) {
    const photos = media.length
      ? media.map(({ large }) => large)
      : ['http://placecorgi.com/600/600'];

    return { photos };
  }
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            //   eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
