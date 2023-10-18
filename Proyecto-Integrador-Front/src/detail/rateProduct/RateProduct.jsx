/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Toaster, toast } from 'react-hot-toast';
import './RateProduct.css';
import 'animate.css';

export const RateProduct = ({ productId }) => {
  const { jwtCode, user } = useContext(UserContext);

  const [stars, setStars] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState('Publicar Ahora');
  const [timeSubmit, setTimeSubmit] = useState("");
  const [userRate, setUserRate] = useState("");
  const [rateDate, setRateDate] = useState('')


  const [starError, setStarError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescriptionError(false);
    setOpinion(e.target.value);
  };

  const handlePublish = async () => {
    if (stars === 0) {
      setStarError(true);
      return;
    } else {
      setStarError(false);
    }
    if (opinion === '' || opinion.length < 5) {
      setDescriptionError(true);
      return;
    } else {
      setDescriptionError(false);
      setButtonText('Guardando...');
      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            
              /*
              const newRating = {
                stars,
                opinion,
                timeSubmit,
              };*/

              const url = `http://184.73.112.5:8080/score`

              const scoreObj = {
                date: rateDate,
                comment: opinion,
                stars: stars,
                product: {
                  id: productId
                }
              }

              const settings={
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwtCode}`
                },
                body: JSON.stringify(scoreObj)
              }

              fetch(url, settings)
                .then(response => {
                  if(response.status===201) {
                    setSubmitted(true);
                    setButtonText('¡Muchas Gracias! :)')
                  } else {
                    setButtonText('Ocurrio un error')
                    console.log(`respuesta: ` + response.status);
                  }
                })
              /*
              const allRatings = JSON.parse(localStorage.getItem('allRatings')) || [];
              allRatings.push(newRating);
              localStorage.setItem('allRatings', JSON.stringify(allRatings));*/
              resolve();
          }),
          {
            loading: 'Guardando...',
            success: <b>¡Calificación publicada!</b>,
            error: <b>No se pudo guardar la calificación.</b>,
          }
        );
        /*
        setSubmitted(true);
        setButtonText('¡Muchas Gracias! :)');*/
      } catch (error) {
        console.error(error);
      }
    }
  };



  const handleStarChange = (newStars) => {
    if (!submitted) {
      setStars(newStars);
      setStarError(false);
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      setTimeSubmit(`Fecha: ${formattedDate}`);
      let month = (currentDate.getMonth()+1)>9? currentDate.getMonth()+1 :'0'+(currentDate.getMonth()+1)
      setRateDate(`${currentDate.getFullYear()}-${month}-${currentDate.getDate()}`)
      setUserRate(`Usuario: ${user.name}`);
    }
  };


  return (
    <div className='animate__animated animate__fadeIn'>
      <section className="RateAdventure">
        <div className='RateAdventureTitle'>
          <h4>Califica tu experiencia </h4>
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            className: '',
            style: {
              backgroundColor: '#E95823',
              color: '#ffffff',
            },
          }}
        />
        <div className='borderAdnv'>
          <div className={`RateAdventureDe ${starError ? 'error' : ''}`}>
            <p>Comparte tu opinión con otros usuarios</p>
            <div className="ratingRateDescri">
              <div className="ratingRate">
                <input value="5" name="ratingRate" id="star5" type="radio" checked={stars === 5}
                  onChange={() => handleStarChange(5)} />
                <label htmlFor="star5"></label>
                <input value="4" name="ratingRate" id="star4" type="radio" checked={stars === 4}
                  onChange={() => handleStarChange(4)} />
                <label htmlFor="star4"></label>
                <input value="3" name="ratingRate" id="star3" type="radio" checked={stars === 3}
                  onChange={() => handleStarChange(3)} />
                <label htmlFor="star3"></label>
                <input value="2" name="ratingRate" id="star2" type="radio" checked={stars === 2}
                  onChange={() => handleStarChange(2)} />
                <label htmlFor="star2"></label>
                <input value="1" name="ratingRate" id="star1" type="radio" checked={stars === 1}
                  onChange={() => handleStarChange(1)} />
                <label htmlFor="star1"></label>
              </div>
              <p className='DateRating'>{timeSubmit}</p>
            </div>
            {starError && <p className='textError'>Debes seleccionar por lo menos una estrella</p>}
          </div>
          <div className={`RateAdventureDe ${descriptionError ? 'error' : ''}`}>
            <h4 className='UserRating'>{userRate}</h4>
            <h6>Descripción:</h6>
            {submitted ? (
              <p className='DescribeRateP'>{opinion}</p>
            ) : (
              <div>
                <textarea
                  className='DescribeRate'
                  placeholder='Describe tu experiencia (opcional)'
                  value={opinion}
                  onChange={handleDescriptionChange}
                />
                {descriptionError && <p className='textError'>Debe tener al menos 5 caracteres</p>}
              </div>
            )}
          </div>
          <div className='buttonRateAdv'>
            <button onClick={handlePublish} disabled={submitted}>
              {buttonText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}