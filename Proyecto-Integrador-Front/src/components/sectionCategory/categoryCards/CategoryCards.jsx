import './CategoryCards.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from "react";
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi';
import "animate.css";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { LoaderAnimation } from '../../loaderAnimation/LoaderAnimation';

const CategoryCards= () => {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [seeDetails, setSeeDetails] = useState(false)

    useEffect(() => {
        setLoading(true);
        fetch("http://184.73.112.5:8080/category/all")
            .then(response => response.json())
            .then(data => {
                setCategories(data.sort(() => Math.random() - 0.5));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });

            window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    const toggleDetails = () => {
        seeDetails? setSeeDetails(false) : setSeeDetails(true)
    }

    const DescriptionCat = ({titleCat , descr}) => {

        if(titleCat==='Agua') {
            return(
                <p className='descrFull animate__animated animate__slideInUp'>Buceo en Paraísos Submarinos, aventuras en Ríos, cruceros Relajantes, observación de Fauna Marina y mucho mas...</p>
            )
        }
        if(titleCat==='Aire') {
            return(
                <p className='descrFull animate__animated animate__slideInUp'>Aventuras en Globo Aerostático, parapente y ala Delta, viajes en Avión, cielos Estrellados y mucho mas...</p>
            )
        }
        if(titleCat==='Tierra') {
            return(
                <p className='descrFull animate__animated animate__slideInUp'>Caminatas epicas, Experiencias culturales, Observacion de Fauna y Flora y mucho mas...</p>
            )
        }
        if(titleCat==='Fuego') {
            return(
                <p className='descrFull animate__animated animate__slideInUp'>Volcanes activos, Festivales de fuego, Aventuras en el desierto, noches de fogatas y mucho mas...</p>
            )
        }
        return (
            <p className='descrFull animate__animated animate__slideInUp'>{descr}</p>
        )
    }


    return(
<>
    {
        loading || !categories ? (
            <div className='loadingAniCategory'>
                <LoaderAnimation/>
            </div>
        ) : (
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                initialSlide= {1}
                onSlideChange={() => setSeeDetails(false)}
                spaceBetween= {width<1120? 5:40}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                >
                    {
                        categories.map((cat)=> {
                            return (
                                <SwiperSlide key={cat.name}>
                                    {
                                        ({isActive}) => (<div> <img className={`${isActive? 'activo':'noActivo'} ${seeDetails? 'detallesActivos': 'sinDetalles'}`} src={cat.image.src} /> {width>1119? (isActive? (!seeDetails? <p className='titleCat  animate__animated animate__slideInDown'>{cat.name}<BiUpArrowAlt onClick={toggleDetails}/></p>:<div><p className='titleCatFull animate__animated animate__slideInUp'>{cat.name}<BiDownArrowAlt onClick={toggleDetails}/></p> <DescriptionCat titleCat={cat.name} descr={cat.description}/></div>):<p className='titleCat'>{cat.name}<BiUpArrowAlt onClick={toggleDetails}/> </p>):<p className='titleCat'>{cat.name}</p>}</div>)
                                    }
                                </SwiperSlide>
                            )}) 
                    }
            </Swiper>
        )
        
    }
</>
    )
}

export default CategoryCards