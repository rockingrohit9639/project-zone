import React, { useState } from 'react';
import './RatingCard.css';
import star_logo from './../../assets/star.svg';
import down_arrow_icon from './../../assets/down.svg';

function RatingCard(props) {
  const [ratingsopen, setratingsopen] = useState(false);
  const ratingsButtonHandler = () => {
    setratingsopen(!ratingsopen);
  };
  console.log(props.rating);
  return (
    <div className="ratings-card">
      <h4 className="ratings-heading" onClick={ratingsButtonHandler}>
        Ratings
        <img
          src={down_arrow_icon}
          style={{ marginLeft: '2px', width: '10px', height: '10px' }}
        />
      </h4>
      {ratingsopen ? (
        <>
          <hr className="hr"></hr>
          <div className="rate">
            {Array(props.rating)
              .fill()
              .map((_, i) => {
                return (
                  <img src={star_logo} className="star-img" alt="star_logo" />
                );
              })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default RatingCard;
