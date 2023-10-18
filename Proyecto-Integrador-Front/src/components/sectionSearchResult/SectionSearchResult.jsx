/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Item } from '../item/Item';
import Styles from './SectionSearchResult.module.css';

export const SectionSearchResult = (
  { products,
    searchQuery,
    onSelectProduct,
    selectedCategories,
    selectedFeatures,
    selectedPriceFilters,
  }) => {

  const [orderByText, setOrderByText] = useState("aleatorio");
  const [orderByPrice, setOrderByPrice] = useState("relevancia");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const productInSelectedCategories = (product) => {
    return selectedCategories.length === 0 || selectedCategories.includes(product.category.name);
  };
  const productInSelectedFeatures = (product) => {
    if (selectedFeatures.length === 0) {
      return true;
    }
  
    return selectedFeatures.every((selectedFeature) =>
      product.features.some((productFeature) => selectedFeature === productFeature.name)
    );
  };
  const productInSelectedPrices = (product) => {
    if (selectedPriceFilters.length === 0) {
      return true;
    }
    const price = product.price;
    return selectedPriceFilters.some((filter) => {
      if (filter === "menos de $15000") {
        return price < 15000;
      }
      if (filter === "entre $15000 y $18000") {
        return price >= 15000 && price <= 18000;
      }
      if (filter === "entre $18000 y $30000") {
        return price >= 18000 && price <= 30000;
      }
      if (filter === "mas de $30000") {
        return price > 30000;
      }
      return false;
    });
  };

  const handleOrderChange = (event) => {
    setOrderByPrice(event.target.value);
    setOrderByText(event.target.value);
  };

  useEffect(() => {
    let sorted = [...filteredProducts];
    if (orderByPrice === "ascp") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (orderByPrice === "descp") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (orderByText === "ascendente") {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderByText === "descendente") {
      sorted = sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (orderByText === "aleatorio") {
      sorted = sorted.sort(() => Math.random() - 0.5);
    }
    setSortedProducts(sorted);
  }, [orderByPrice, orderByText, filteredProducts]);

  useEffect(() => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const filtered = products
      .filter(productInSelectedCategories)
      .filter(productInSelectedFeatures)
      .filter(productInSelectedPrices)
      .filter((product) => searchRegex.test(product.name) || searchRegex.test(product.description));
    setFilteredProducts(filtered);
  }, [products, selectedCategories, selectedFeatures, selectedPriceFilters, searchQuery]);

  return (
    <div className={Styles.allBoxHomeItems}>
      <div className={Styles.OrderBy}>
        <p className={Styles.parrafOrder}>
          {filteredProducts.length === 0
            ? "Sin resultados"
            : `(${filteredProducts.length}) aventuras encontradas`}
        </p>
        <div className={Styles.OrderByTwo}>
          <p className={Styles.parrafOrderTwo}>Ordenar por</p>
          <select className={Styles.selectOrderTwo} name="orderPrice" id="orderPrice" value={orderByPrice} onChange={handleOrderChange}>
            <option value="relevancia">Más relevantes</option>
            <option value="ascp">Menor a mayor $</option>
            <option value="descp">Mayor a menor $</option>
            <option value="ascendente">Alfabetico A-Z</option>
            <option value="descendente">Alfabetico Z-A</option>
          </select>
        </div>
      </div>
      <div className={Styles.boxProducts}>
        <div className={Styles.orderItems} id="idOrderItems">
          {sortedProducts.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              image={product.mainImage.src}
              title={product.name}
              description={product.description}
              price={product.price}
              onSelectProduct={onSelectProduct}
            />
          ))}
          {sortedProducts.length % 2 !== 0 && (
            <div className={Styles.additionalItem}>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};