import { useState, useContext } from 'react';
import Styles from './RatingsRate.module.css';
import { LiaStarSolid } from 'react-icons/lia';
import 'animate.css';
import { UserContext } from '../../context/userContext';

export const RatingsRate = ({ averageStars, allRatings, onClose }) => {

    const [filterValue, setFilterValue] = useState('relevantes');
    const { jwtCode, user } = useContext(UserContext);
    const [loader, setLoader] = useState(false)

    const userRatings = Array(5).fill(0);

    allRatings.forEach((rating) => {
        userRatings[rating.stars - 1] = rating.stars;
    });

    const calculateVotePercentage = (starValue, ratings) => {
        const count = ratings.filter(rating => rating.stars === starValue).length;
        const total = ratings.length;
        return (count / total) * 100;
    };

    const filterAndSortRatings = (ratings, filterValue) => {
        return filterValue === 'positivas'
            ? ratings.filter((rating) => rating.stars >= 3)
            : filterValue === 'negativas'
                ? ratings.filter((rating) => rating.stars <= 2)
                : ratings.reverse()
    };

    const deleteComment = (id) => {
        setLoader(true)
        const url = `http://184.73.112.5:8080/score/${id}`
        const settings= {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${jwtCode}`
            },
          }
          fetch(url, settings)
            .then(response=> {
                response.json()
                window.location.reload()
            })
    }

    return (
        <div className={`${Styles.ratingsRateModal} animate__animated animate__fadeIn animate__faster`}>
            <button className={Styles.closeButton} onClick={onClose}>
                x
            </button>
            <div className={Styles.ratingsRateDetail}>
                <h3>Calificaciones y opiniones</h3>
                <p>Las calificaciones provienen de usuarios registrados</p>
                <div>
                    <div className={Styles.Mediarating}>
                        <div className={Styles.Mediatitle}>
                            <h2>{averageStars.toFixed(1)}</h2>
                            <p>({allRatings.length} Reseñas)</p>

                        </div>
                        <ul className={Styles.listRatingGraph}>
                            <li>
                                <LiaStarSolid className={`${Styles.starRating} ${Styles.blueee}`} />
                                5 <progress className={Styles.progressDark} value={calculateVotePercentage(5, allRatings)} max="100"></progress>
                            </li>
                            <li>
                                <LiaStarSolid className={`${Styles.starRating} ${Styles.blueee}`} />

                                4 <progress className={Styles.progressDark} value={calculateVotePercentage(4, allRatings)} max="100"></progress>
                            </li>
                            <li>
                                <LiaStarSolid className={`${Styles.starRating} ${Styles.blueee}`} />

                                3 <progress className={Styles.progressDark} value={calculateVotePercentage(3, allRatings)} max="100"></progress>
                            </li>
                            <li>
                                <LiaStarSolid className={`${Styles.starRating} ${Styles.blueee}`} />

                                2 <progress className={Styles.progressDark} value={calculateVotePercentage(2, allRatings)} max="100"></progress>
                            </li>
                            <li>
                                <LiaStarSolid className={`${Styles.starRating} ${Styles.blueee}`} />

                                1 <progress className={Styles.progressDark} value={calculateVotePercentage(1, allRatings)} max="100"></progress>
                            </li>
                        </ul>
                    </div>
                    <div>
                    </div>
                </div>
                <div>
                    <div className={Styles.filterRatingOrder}>
                        <p>
                            Calificaciones de Usuarios:
                        </p>
                        <select
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        >
                            <option value="relevantes">Todas</option>
                            <option value="positivas">Positivas</option>
                            <option value="negativas">Negativas</option>
                        </select>
                    </div>
                    <ul className={Styles.listRatingUsers}>
                        {filterAndSortRatings(allRatings, filterValue).map((rating, index) => (
                            <li
                                key={index}
                                className={index % 2 === 0
                                    ? Styles.evenRow
                                    : Styles.oddRow
                                }
                            >
                                <div className={Styles.imageCalifc}>
                                    <div className={Styles.imgUserRat}>
                                        <img src="/images/useravatar.png" alt="" />
                                    </div>
                                    <div className={Styles.MobilesimgUserRat}>
                                        <div className={Styles.ratingUserd}>
                                            <p>
                                                {userRatings.map((userRating, i) => (
                                                    <LiaStarSolid
                                                        key={i}
                                                        className={`${Styles.starRating} ${i < rating.stars ? Styles.orangeStar : Styles.grayStar
                                                            }`}
                                                    />
                                                ))}
                                            </p>
                                            <p>{`${rating.date}`}</p>
                                        </div>
                                        <div className={Styles.boxCommentButton}>
                                            <p className={Styles.ratingpp}>{rating.comment}</p>
                                            {
                                                rating.userId === user.id? <button className={Styles.buttonDelete} onClick={()=>deleteComment(rating.id)}>Eliminar</button> : undefined
                                            }
                                        </div>
                                        
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    );
};
