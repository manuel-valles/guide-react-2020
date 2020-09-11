import React from 'react';
import { Link } from '@reach/router';

export default function Pet({ name, animal, breed, media, location, id }) {
  const hero = media.length ? media[0].small : 'http://placecorgi.com/300/300';
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}
