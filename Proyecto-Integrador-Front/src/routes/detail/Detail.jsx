import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemDetail } from '../../detail/itemDetail/ItemDetail';
import { LoaderAnimation } from '../../components/loaderAnimation/LoaderAnimation';
import './Detail.css';

export const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { pid } = useParams();
  const productID = parseInt(pid);

  async function fetchProduct() {
    const response = await (await fetch(`http://184.73.112.5:8080/product/${productID}`, settings)).json()
    setProduct(response)
    setIsLoading(false)
  }
  const settings = {
    method: 'GET',
  }
  useEffect(() => {
    fetchProduct()
  }, [productID]);

  return (
    <>
      <div className="orderItemDetail">
        {isLoading ? (
          <div className="loadDetailContain">
            <h2 className="loadDetail">Cargando la Aventura</h2>
            <div>
              <LoaderAnimation />
            </div>
          </div>
        ) : (
          <div>
            <ItemDetail product={product} />
          </div>
        )}
      </div>
    </>
  );
};