import { LiaStarSolid } from 'react-icons/lia';
import { useContext, useEffect, useState } from 'react';
import './ResultRateProduct.css';
import { RatingsRate } from '../ratings/RatingsRate';
import { UserContext } from '../../context/userContext';

export const ResultRateProduct = ({ productId }) => {
  const [showRatings, setShowRatings] = useState(false);
  const [allRatings, setAllRatings] = useState([]);
  const [totalStars, setTotalStars] = useState(0)
  const [averageStars, setAverageStars] = useState(0)
  //const totalStars = allRatings.reduce((sum, rating) => sum + rating.stars, 0);
  //const averageStars = totalStars / allRatings.length || 0;

  const { jwtCode } = useContext(UserContext);


  useEffect(() => {

    /*const storedRatings = JSON.parse(localStorage.getItem('allRatings')) || [];*/
    scoreFetch()
  }, []);

  useEffect(()=>{
    if(allRatings.length>0){
    setTotalStars(allRatings.reduce((sum, rating) => sum + rating.stars, 0))}
    console.log(allRatings);
  },[allRatings])

  useEffect(()=>{
    setAverageStars(totalStars / allRatings.length || 0)
  },[totalStars])

  const scoreFetch = async() => {
    /*const url = `http://184.73.112.5:8080/score/product/${productId}`
    const settings= {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtCode}`
      },
    }
    fetch(url, settings)
    .then(response=> response.json())
    .then(data=> setAllRatings(data))
    */
    
    const response = await fetch(`http://184.73.112.5:8080/score/product/${productId}`)
    const data = await response.json()
    setAllRatings(data);
    
  }

  const toggleRatingsVisibility = () => {
    setShowRatings(!showRatings);
  };

  return (
    <div className='orderResultRate'>
      <LiaStarSolid className="starRate" />
      <p className='medrrRateee'>{averageStars.toFixed(1)}/5</p>
      <p className='ResultRatingsBtn' onClick={toggleRatingsVisibility}>({allRatings.length} Reseñas)</p>
      {showRatings && (
        <RatingsRate averageStars={averageStars} allRatings={allRatings} onClose={toggleRatingsVisibility} />
      )}
    </div>
  );
};