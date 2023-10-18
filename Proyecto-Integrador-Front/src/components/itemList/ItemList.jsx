/* eslint-disable react/prop-types */
import { Item } from '../item/Item'
import { UserContext } from '../../context/userContext';
import { useEffect, useContext, useState } from 'react';
import './itemList.css'

export const ItemList = ({ products, onSelectProduct }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([])
  const userData = useContext(UserContext);
  const jwtCode = userData.jwtCode;

  async function userFetch() {
    let dataAsync;
    try {
      dataAsync = await (await fetch(`http://184.73.112.5:8080/category/all`)).json();
    } catch (e) {
      console.error(e);
    }
    setCategories(dataAsync)
  }

  useEffect(() => {
    userFetch()
  }, [])


  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const productInSelectedCategories = (product) => {
    return selectedCategories.length === 0 || selectedCategories.includes(product.category.name);
  };

  return (
    <section className="cardRender">
      <div className="items-container">
        <div className="text-description">
          <p className="our-services">Nuestros Servicios</p>
          <p className="our-services">Nuestros Servicios</p>
          <p className="paragraph">Explorar paisajes y la adrenalina<br></br> de momentos inolvidables</p>
        </div>
        <div className='select'>
          <h3 className='categoriesSelectTitle'>Categorias</h3>
          <div className='selectCategories'>
            {categories?.map((category) => (
              <div key={category.id}>
                <label className='itemCategories'>
                  <input
                    type="checkbox"
                    value={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={handleCategoryChange}
                    />
                    {category.name}
                  </label>
                </div>))}
            </div>
          </div>
      </div>
      <div className='items-container'>
        <p>Mostrando {products.filter(productInSelectedCategories).length} de {products.length} aventuras disponibles</p>
      </div>
      <div className="orderItems" id="idOrderItems">
        {products
        .filter(productInSelectedCategories)
        .map((product) => (
          <Item key={product.id} id={product.id} image={product.mainImage.src} title={product.name} description={product.description} onSelectProduct={onSelectProduct} /> // Pasar la función onSelectProduct
        ))}
      </div>
    </section>
  )
}
