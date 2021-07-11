import React, { useState } from 'react';
import './RatingCard.css';
import Rating from '@material-ui/lab/Rating';
import down_arrow_icon from './../../assets/down.svg';

function RatingCard(props)
{
  const [ratingsopen, setratingsopen] = useState(false);
  const ratingsButtonHandler = () =>
  {
    setratingsopen(!ratingsopen);
  };
  return (
    <div className='ratings-card'>
      <h4 className='ratings-heading' onClick={ratingsButtonHandler}>
        Rating
        <img
          src={down_arrow_icon}
          style={{ marginLeft: '5px', width: '10px', height: '10px' }}
        />
      </h4>
      {ratingsopen ? (
        <>
          <hr className='hr'></hr>
          <div className='rate'>
            <Rating
              name="read-only"
              defaultValue={0}
              value={props.rating}
              precision={0.5}
              readOnly
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default RatingCard;
