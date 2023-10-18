/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SecondaryImage } from '../secondaryImage/SecondaryImage';
import { DynamicIcon } from '../../admin/adminRegisterProducts/DynamicIcon'
import { CarrouselDetail } from '../carrouselDetail/CarrouselDetail';
import { PoliticsDetail } from '../politics/PoliticsDetail';
import DatePicker, { DateObject } from "react-multi-date-picker"
import InputIcon from "react-multi-date-picker/components/input_icon"
import { ResultRateProduct } from '../resultRateProduct/ResultRateProduct';
import { RateProduct } from '../rateProduct/RateProduct';
import { ShareApp } from '../shareApp/ShareApp';
import { Footer } from "react-multi-date-picker/plugins/range_picker_footer";
import { UserContext } from '../../context/userContext';
import { Toaster, toast } from 'react-hot-toast';
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/layouts/prime.css"
import './ItemDetail.css'
import { AiFillStar } from 'react-icons/ai';


export const ItemDetail = ({ product }) => {
  const { jwtCode, userType, updateLoginMessageState, saveProductId } = useContext(UserContext);

  const [showCarrousel, setShowCarrousel] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [dateValues, setDateValues] = useState([])
  const [reservedDates, setReservedDates] = useState([])
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const [promoCode, setPromoCode] = useState("");
  const [errorPromoCode, setErrorPromoCode] = useState(false);
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [dateError, setDateError] = useState(false)
  const [firstDate, setFirstDate] = useState('')
  const [secondDate, setSecondDate] = useState('')


  let actualDate = new Date()
  actualDate.setDate(actualDate.getDate() - 1)

  const navigate = useNavigate();


  const currentURL = window.location.href

  useEffect(() => {
    fetchDates()
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [])

  const fetchDates = async () => {
    const response = await fetch(`http://184.73.112.5:8080/product/reservedDates/${product.id}`)
    const data = await response.json()
    setReservedDates(data);
  }

  useEffect(() => {
    if (dateValues.length > 1) {
        setDateError(false)

        let date1 = dateValues[0]
        let beginning = new Date(`${date1.year}/${date1.month}/${date1.day}`)
        let day1 = date1.day>9? date1.day : '0'+ date1.day
        let month1 = date1.month>9? date1.month: '0'+ date1.month
        setFirstDate(`${date1.year}-${month1}-${day1}`)

        let date2 = dateValues[1]
        let ending = new Date(`${date2.year}/${date2.month}/${date2.day}`)
        let day2 = date2.day>9? date2.day : '0'+ date2.day
        let month2 = date2.month>9? date2.month: '0'+ date2.month
        setSecondDate(`${date2.year}-${month2}-${day2}`)

        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        setNumberOfDays(diffDays)
    }
}, [dateValues])

useEffect(()=>{
},[firstDate, secondDate])

  const [showRateProduct, setShowRateProduct] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  const handleShowCarrousel = () => {
    setShowCarrousel(true);
  };

  const handleCloseCarrousel = () => {
    setShowCarrousel(false);
  };

  const handleShowRateProduct = () => {
    setShowRateProduct(true);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleNumOfPeopleChange = (e) => {
    setNumOfPeople(parseInt(e.target.value, 10));
  };
  const promoCodeDiscounts = {
    CAMADA10: 0.2,
    EQUIPO1: 0.50,
    DORIAN: 0.30,
  };


  const calculateFinalPrice = () => {
    let basePrice = product.price;
    let discountPercentage = 0;
    if (promoCodeDiscounts[promoCode]) {
      discountPercentage = promoCodeDiscounts[promoCode] * 100;
      basePrice *= 1 - promoCodeDiscounts[promoCode];
    }
    return {
      finalPrice: basePrice * numOfPeople,
      discountPercentage,
    };
  };


  const handleReservarAhora = () => {
    if (!jwtCode) {
      setShowLoginMessage(true);
      updateLoginMessageState(true);
      saveProductId(product.id)
    } else if (dateValues.length<2){
      setDateError(true)
    } else {
      //setShowRateProduct(true)
      const reservationData = {
        productInfo: product,
        datesInfo: {
          initialDate: dateValues[0].format('DD/MM/YYYY'),
          endDate: dateValues[1].format('DD/MM/YYYY')
        },
        people: numOfPeople,
        totalPrice: (product.price*numberOfDays) * numOfPeople,
        discount: promoCode,
        dates: {
          beggining: firstDate,
          ending: secondDate
        }
      }
      navigate(`/reservation`, { state: reservationData })
      const finalPrice = calculateFinalPrice();
      if (finalPrice > 0) {
        handleAddToCart();
        handleShowRateProduct();
        toast.success('¡Código promocional aplicado con éxito!');
      } else {
        setErrorPromoCode(true)
      }
    }
  };

  const handleRateClick = () => {
    setShowRateProduct(true)
  }

  return (
    <div className='item-detail-body'>
      <div>
        {/* IMAGENES, TENGO OTRO COMPONENTE QUE ORDENA LAS SECUNDARIAS */}
        <div className='detailImages'>
          <img src={product.mainImage.src} className="mainImg" alt={product.mainImage.alt} />
          <div className='button-container'>
            <Link to={'/'} className="btn-BackPage">&lt; volver al inicio</Link>
            <button className='btn-OpenCarrousel' onClick={handleShowCarrousel}>
              ver mas &gt;
            </button>
          </div>
          <div className="secondaryImages">
            {product.sideImages.map((image, index) => (
              <SecondaryImage key={image.id} image={image.src} alt={image.alt} />
            ))}
          </div>
          {showCarrousel && (
            <CarrouselDetail
              mainImage={product.mainImage}
              sideImages={product.sideImages}
              onClose={handleCloseCarrousel}
            />
          )}
        </div>

        {/* MINI ENRUTADO DEBAJO DE IMAGENES */}
        <div className='orderRoutesDetail'>
          <h4>
            Aventuras &gt; Detalle &gt; {product.category.name} &gt; <span>{product.name}</span>
          </h4>
        </div>

        {/* ESTA LA COLUMNA IZQUIERDA DESDE TITULO HASTA EL MAPA*/}
        <div className='detailOrder'>
          <section className='orderTextDetailInt'>
            <div className='titleFeatureShare'>
              <h4 className='titleProduct'>{product.name}</h4>
              <ShareApp product={product} />
            </div>
            <p>Ruta Perilago s/n, Potrerillos, Lujan de Cuyo</p>
            <ResultRateProduct productId={product.id}/>
            <div className='iconDetailFeaturesDetail'>
              <h4>Caracteristicas</h4>
              <div className='iconContainerFeaturesDetail'>
                {product.features?.map((item, index) => {
                  return (
                    <div className='featuresDetailProduct' key={index}>
                      <DynamicIcon name={item.icon} />{" "}
                      <p className='iconDescriptionFeaturesD'>{item.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="tapeDetailProducts">
              <h3>Descripcion</h3>
              <p>{product.description}</p>
            </div>
            <section className="listDetailProducts">
              <div className="tapeDetailProducts">
                <h4>Informacion Importante</h4>
                <p>✔ Uso obligatorio de equipo de proteccion</p>
                <p>✔ Capacitacion previa de tecnicas de conduccion</p>
                <p>✔ Edad minima 16 años</p>
              </div>
              <div className="tapeDetailProducts">
                <h4>Horarios</h4>
                <p>✔ Viernes a Domingos</p>
                <p>✔ 10:00 AM - 15:45 PM</p>
              </div>
            </section>
            <div className="mapsDetail">
              <h4>Ubicacion</h4>
              <iframe className='map'
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.4901022216163!2d-69.19325712432942!3d-32.964469173586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967de94b0ec57e83%3A0x1777ad7db1995e60!2sRuta%20Perilago%2C%20Potrerillos%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1691550322695!5m2!1ses-419!2sar"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>

          {/* ESTA PARTE ES LA TARJETA DE RESERVA */}
          <section className='SaveAndRate'>
            <section className="SaveAdventure">
              <div className='SaveAdventureTitle'>
                <h4>Empezá tu reserva</h4>
              </div>
              <div className='borderAdnv'>
                <div className='SaveAdventureDe'>
                  <h6>Fecha</h6>
                  <div className="form-input">
                    <DatePicker 
                    // plugins={[<Footer position="bottom" />]}
                     className={width >= 1670 ? "rmdp-prime" : "rmdp-mobile"} numberOfMonths={width<620? 1:2} render={<InputIcon />} range minDate={new DateObject().toFirstOfYear} maxDate={new DateObject().toLastOfYear} onChange={dateObjects => { setDateValues(dateObjects) }} containerClassName="custom-container" mapDays={({ date }) => {
                      const { year, month, day } = date
                      let mappedDate = new Date(`${year}/${month}/${day}`)
                      let dateSelected = reservedDates.some(reservedDate => {
                        let dateFrom = Date.parse(reservedDate[0])
                        let finishDate = new Date(reservedDate[1])
                        finishDate.setDate(finishDate.getDate() + 1)
                        let dateTo = Date.parse(finishDate)
                        let dayAsked = Date.parse(mappedDate)
                        return (
                          dayAsked <= dateTo && dayAsked >= dateFrom
                        )
                      })

                      let isPastDate = mappedDate <= actualDate
                      if (isPastDate || dateSelected) return {
                        disabled: true,
                        style: { color: "#ccc" }
                      }
                    }} />
                    <p className={dateError? 'dateError':'noDateError'}>Campo obligatorio, ingrese fecha de ingreso y salida</p>
                  </div>
                </div>
                <div className='SaveAdventureDe'>
                  <h6>Personas</h6>
                  <select className='selectPeople'
                    value={numOfPeople}
                    onChange={handleNumOfPeopleChange}>
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                  </select>
                </div>
                <div className='SaveAdventureDe'>
                  <h6>Codigo Promocional</h6>
                  <input className='selectPeople'
                    type="text"
                    placeholder='Ingresa tu Codigo'
                    value={promoCode}
                    onChange={handlePromoCodeChange} />
                </div>
                <div className='SaveAdventurePrice'>
                  <div className='savetotalPorcent'>
                    {calculateFinalPrice().discountPercentage > 0 && (
                      <p className='DiscountPercentage'>
                        Promo {calculateFinalPrice().discountPercentage}%
                      </p>
                    )}
                    <h2>Precio</h2>
                  </div>

                  {calculateFinalPrice().finalPrice === product.price ? (
                    <h2 className='priceAdv'>
                      ${(calculateFinalPrice().finalPrice * numberOfDays).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                    </h2>
                  ) : (
                    <div>
                      <p className='PriceDiscontStart'>${product.price}</p>
                      <h2 className='priceAdv PriceDiscontFinal'>
                        ${(parseFloat(calculateFinalPrice().finalPrice * numberOfDays).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                      </h2>
                    </div>
                  )}
                </div>
                <div className="buttonSaveAdv">
                  {!isAddedToCart ? (
                    <button onClick={handleReservarAhora}>Reservar Ahora</button>
                  ) : (
                    <div className="continueBuy">
                      <Link to={'/'} className="btnBackBuy">
                        Volver
                      </Link>
                      <Link to={'/reserva'} className="btnGoProductBuy">
                        Ir a Reserva
                      </Link>
                    </div>
                  )}
                </div>
                <p className='aclaracion'>* El precio inicial es por persona por dia</p>
                {showLoginMessage && (
                  <div className='boxLogReserBtn'>
                    <p className='errorLogReserBtn'>
                      Debes iniciar sesión para continuar con el proceso de reserva.{' '}
                      <Link className='LogInBtnRes' to="/login">Ir a la página de inicio de sesión</Link>
                    </p>
                  </div>
                )}
              </div>
            </section>
            <div>
              {
                jwtCode? (!showRateProduct? <p className='scoreButton' onClick={handleRateClick}><AiFillStar/>  ¡Ayúdanos a mejorar! Danos tu opinión sobre este producto</p> : <RateProduct productId={product.id} />) : undefined
              }
            </div>
            {/*{showRateProduct && <RateProduct productId={product.id} />}*/}
          </section>
        </div>
        <div>
          <PoliticsDetail />
        </div>
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
    </div>
  );
};