/* eslint-disable react/prop-types */
import './SecondaryImage.css'
export const SecondaryImage = ({ image, alt, onClick }) => {
  return (
    <div className='imageSecondBox' onClick={onClick}>
        <img src={image} className="secondaryImg" alt={alt} />
    </div>
  );
};