import { useContext, useEffect, useState } from 'react'
import { SectionSearch } from '../../components/sectionSearch/SectionSearch'
import { SectionSearchFilter } from '../../components/sectionSearchFilter/SectionSearchFilter'
import { SectionSearchResult } from '../../components/sectionSearchResult/SectionSearchResult'
import { Pagination } from '../../components/pagination/Pagination'
import { UserContext } from '../../context/userContext'
import { LoaderAnimation } from '../../components/loaderAnimation/LoaderAnimation'
import Styles from './SearchProduct.module.css'

export const SearchProduct = (props) => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [showFilters, setShowFilters] = useState(false);
  const userValues = useContext(UserContext)
  let productsByDates = userValues.dateResults

  const [totalProducts, setTotalProducts] = useState(0);
  async function fetchProducts(page, searchQuery) {
    let url = `http://184.73.112.5:8080/product/all?page=${page - 1}&size=6`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.content.sort(() => Math.random() - 0.5));
    setLoading(false);
    setIsFetched(true)
  }

  const getTotalProductsCount = async () => {
    let url = `http://184.73.112.5:8080/product/all/count`;
    if (searchQuery) {
      url += `?search=${searchQuery}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setTotalProducts(data.count);
  };
  useEffect(() => {
    getTotalProductsCount();
  }, [searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true)
    fetchProducts(page, searchQuery);
  };

  useEffect(() => {
    fetchProducts(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleCategoryChange = (newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handleFeaturesChange = (newFeatures) => {
    setSelectedFeatures(newFeatures);
  };

  const handlePriceFilterChange = (newPrices) => {
    setSelectedPriceFilters(newPrices);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setLoading(true);
    fetchProducts(1, query);
  };
  return (
    <div className={Styles.orderSearchItems} ref={props.refProps}>
      <div className={Styles.SearchItemHeader}>
        <SectionSearch
          onSearch={handleSearch}
        />
      </div>
      <div className={Styles.orderresultsAFilte}>
        <div className={Styles.ordersectionFilteHome}>
          <div className={Styles.orderBtnFiltrosMobile}>
            <div className={Styles.BtnFiltrosMobile}>
              <p>
                Filtrar por
              </p>
              <button onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? `${Styles.orangeButton}` : ''}>
                {showFilters ? "Esconder filtros" : "Desplegar filtros"}
              </button>
            </div>
            {showFilters && (
              <SectionSearchFilter
                onCategoryChange={handleCategoryChange}
                onPriceFilterChange={handlePriceFilterChange}
                onFeatureChange={handleFeaturesChange}
              />
            )}
          </div>
          <div className={Styles.orderBtnFiltrosDesktop}>
            <SectionSearchFilter
              onCategoryChange={handleCategoryChange}
              onPriceFilterChange={handlePriceFilterChange}
              onFeatureChange={handleFeaturesChange}
            />
          </div>
        </div>
        <div className={Styles.ordersectionFilteProduct}>
          {loading ? (
            <div className={Styles.loaderAnimationFilters}>
              <LoaderAnimation />
            </div>
          ) : products.length === 0 && selectedCategories.length > 0 && selectedFeatures.length > 0 ? (
            <div className="no-products-message">
              <h3>No hay más productos disponibles</h3>
              <p>Lamentablemente, hemos agotado nuestras aventuras en esta página.</p>
              <p>Puede volver a la página anterior para explorar otras proximas experiencias emocionantes.</p>
              <div className="sad-face">:(</div>
            </div>
          ) : (
            <SectionSearchResult
              products={productsByDates.length === 0 ? products : productsByDates}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              selectedPriceFilters={selectedPriceFilters}
              selectedFeatures={selectedFeatures}
              totalProducts={totalProducts}
            />
          )}
          {
            productsByDates.length === 0 ? <Pagination
              onPageChange={handlePageChange}
              currentPage={currentPage}
            /> : undefined
          }
        </div>
      </div>
    </div >
  )
}