import styles from './CarrouselDetail.module.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const CarrouselDetail = ({ mainImage, sideImages, onClose }) => {
  return (
    <div className={styles.carrouselOverlay}>
      <div className={styles.carrouselContent}>
        <Carousel className={styles.carrouselContentImg}>
          <div>
            <img src={mainImage.src} alt={mainImage.alt} />
          </div>
          {sideImages.map((image, index) => (
            <div key={image.id}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};


