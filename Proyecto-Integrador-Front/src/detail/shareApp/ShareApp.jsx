/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { BsShareFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import queryString from 'query-string';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import axios from 'axios'
import './ShareApp.css';

export const ShareApp = ({ product }) => {

  const [shortenedURL, setShortenedUrl] = useState("")
  const currentURL = window.location.href
  const canonicURL = "http://rutassalvajesfront.s3-website.us-east-2.amazonaws.com"


  const [ShareApp, setShareApp] = useState(false);

  const abrirVentana = () => {
    setShareApp(true);
  };

  const cerrarVentana = () => {
    setShareApp(false);
  };

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
  }, [shortenedURL]);

  const fetchData = async () => {
    try {
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${currentURL}`)
      setShortenedUrl(res.data.result.full_short_link2)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className='btn-share' onClick={abrirVentana}>
        <BsShareFill />
      </div>
      {ShareApp && (
        <div>
        <div className="backGVentana"></div>
        <div className="ventanaEmergente">
          <div className='orderTitleClose'>
            <p></p>
            <h5 className='titleShare'>Crear post</h5>
            <span className="closeShare" onClick={cerrarVentana}>
              <AiOutlineCloseCircle />
            </span>
          </div>
          <p className='leyendaCompartir'>Compartí en tus redes nuestras experiencias!</p>
          <div className='ShareImgRat'>
            <div className='shareImgBox'>
              <img src="/images/login.jpg" alt="" />
            </div>
            <div className='detailShareph'>
              <h5>Ruta Salvaje</h5>
              <p>Encontrá mas experiencias en RS</p>
              <href>{currentURL}</href>
            </div>

          </div>
          <div className='socialMediaIcons'>
            <FacebookShareButton url={currentURL}>
              {/* <FacebookIcon></FacebookIcon> */}
              <h3 className="social-link">
                <FaFacebook />
              </h3>
            </FacebookShareButton>
            <TwitterShareButton url={canonicURL} title={`Dale un vistazo a esta experiencia, ${product?.name}, en Ruta Salvaje!  ${product?.name} : ${shortenedURL}. Pagina principal: `}>
              {/* <TwitterIcon></TwitterIcon> */}
              <h3 className="social-link">
                <FaTwitter />
              </h3>
            </TwitterShareButton>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
