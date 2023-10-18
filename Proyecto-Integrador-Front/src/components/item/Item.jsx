import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import './Item.css';

export const Item = ({ id, image, title, description, price }) => {

  const [width, setWidth] = useState(window.innerWidth);
 const [favState, setFavState] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    let favorites = JSON.parse(localStorage.getItem("favID")) || []
    if (favorites.some(fav => fav === id) && favState === false) {
      setFavState(true)
    }
  }, []);

  const userValues = useContext(UserContext)
  const logged = userValues.userType

  useEffect(() => {
    if (favState) {
      const favArrAdd = JSON.parse(localStorage.getItem("favID")) || [];
      favArrAdd.push(id);
      localStorage.setItem("favID", JSON.stringify(favArrAdd));
    } else {
      let favArrDelete = JSON.parse(localStorage.getItem('favID')) || [];
      favArrDelete = favArrDelete.filter(fav => fav !== id)
      localStorage.setItem('favID', JSON.stringify(favArrDelete))
    }
  }, [favState]);

  return (
    <div key={id} className="product-container">
      <div className="container-image">
        <img className='itemImageStyle' src={image} alt="" />
      </div>
      <div className="product-description">
        <div className="pDescIntern">
          <p className="title-description">{title}</p>
          {width > 679 ? <div className={`containerTextDescr ${description.length > 150 ? 'limitText' : 'noLimit'}`}><p className="text-description">{description}</p></div> : undefined}
        </div>
        <div className="orderbtnAndInfo">
          <div className="product-price">
            <h3>${price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</h3>
          </div>
          <div className="orderBtnAndFav">
            <Link to={`/detail/${id}`}>
              <button className='see-more-btn' type="submit">
                Ver más
              </button>
            </Link>
            {
              logged == 'ADMIN' || logged == 'BASIC' ? <div className="containerbtnSave" onClick={() => setFavState(!favState)}>
                {favState ? (
                  <FaBookmark className="save-solid" />
                ) : (
                  <FaRegBookmark className="save-regular" />
                )}
              </div> : undefined
            }
          </div>
        </div>
      </div>
    </div>
  );
};
