import { useContext, useEffect, useState } from 'react';
import Styles from './SectionSearchFilter.module.css';
import { UserContext } from '../../context/userContext';
import DatePicker, { DateObject } from "react-multi-date-picker"
import InputIcon from "react-multi-date-picker/components/input_icon"
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { IoTrashOutline } from "react-icons/io5";

export const SectionSearchFilter = ({ onCategoryChange, onFeatureChange, onPriceFilterChange }) => {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
    const [selectedDateFilter, setSelectedDateFilter] = useState('');


    const [categories, setCategories] = useState([])
    const [features, setFeatures] = useState([])
    const [products, setProducts] = useState([])

    const [clearButton, setClearButton] = useState(false)


    const [showError, setShowError] = useState(false);
    const [shakeButton, setShakeButton] = useState(false);


    const userData = useContext(UserContext);
    const jwtCode = userData.jwtCode;

    const [width, setWidth] = useState(window.innerWidth);


    const userValues = useContext(UserContext)
    const [dateValues, setDateValues] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    let actualDate = new Date()
    actualDate.setDate(actualDate.getDate() - 1)

    useEffect(() => {
        if (dateValues.length > 1) {
            fetchProducts()
        }
    }, [dateValues])

    const fetchProducts = async () => {
        const response = await fetch(`http://184.73.112.5:8080/product/startDate/${dateValues[0].format('YYYY-MM-DD')}/endDate/${dateValues[1].format('YYYY-MM-DD')}`)
        const data = await response.json()
        setSelectedProducts(data)
        userValues.saveResults(data)
    }
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
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, [])

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (selectedCategories.includes(value)) {
            setSelectedCategories(selectedCategories.filter((category) => category !== value));
        } else {
            setSelectedCategories([...selectedCategories, value]);
        }
        setClearButton(true)
    };
    useEffect(() => {
        onCategoryChange(selectedCategories);
    }, [selectedCategories, onCategoryChange]);


    useEffect(() => {
        const fetchData = () => {
            fetch(`http://184.73.112.5:8080/feature/all`)
                .then(response => response.json())
                .then(data => {
                    setFeatures(data);
                })
                .catch(error => {
                    console.error("Error fetching features:", error);
                });
        };
        fetchData();
    }, []);

    const handleFeatureChange = (event) => {
        const value = event.target.value;
        if (selectedFeatures.includes(value)) {
            setSelectedFeatures(selectedFeatures.filter((features) => features !== value));
        } else {
            setSelectedFeatures([...selectedFeatures, value]);
        }
    };
    useEffect(() => {
        onFeatureChange(selectedFeatures);
    }, [selectedFeatures, onFeatureChange]);




    const handleDateFilterChange = (dateValue) => {
        setSelectedDateFilter(dateValue);
    };

    const handlePriceFilterChange = (e) => {
        const valuePrice = e.target.value;
        if (selectedPriceFilters.includes(valuePrice)) {
            setSelectedPriceFilters(selectedPriceFilters.filter((priceFilter) => priceFilter !== valuePrice));
        } else {
            setSelectedPriceFilters([...selectedPriceFilters, valuePrice]);
        }
    };
    useEffect(() => {
        onPriceFilterChange(selectedPriceFilters);
    }, [selectedPriceFilters, onPriceFilterChange]);


    const onClearFilters = () => {
        if (
            selectedCategories.length === 0 &&
            selectedFeatures.length === 0 &&
            selectedPriceFilters.length === 0 &&
            setDateValues([])
        ) {
            setShowError(true);
            setShakeButton(true);
            setTimeout(() => {
                setShowError(false);
                setShakeButton(false);
            }, 1500);
        } else {
            setSelectedCategories([]);
            setSelectedFeatures([]);
            setSelectedPriceFilters([]);
            setSelectedDateFilter('');
            userValues.saveResults([]);
        }
    };

    return (
        <div className={Styles.filterContainer}>
            <div>
                <div className={Styles.filterHeader}>
                    <h4>Filtros</h4>
                    <p
                        className={`${Styles.btnSectionSearch} ${shakeButton ? Styles.shakeButton : ''}`}
                        onClick={onClearFilters}
                    ><IoTrashOutline /> </p>
                </div>
                <div className={Styles.ErrorfilterHeader}>
                    {showError ? <p style={{ color: 'red' }}>No posee filtros</p> : <p style={{ color: '#D9D9D9' }}>.</p>}
                </div>
            </div>
            <hr className={Styles.filterSectionhrTop} />
            <div className={Styles.filterSectionOrder}>
                <div className={Styles.filterSection}>
                    <h5>por Categorias</h5>
                    <ul className={Styles.listFiltersul}>
                        {categories?.map((category) => (
                            <li key={category.id}>
                                <label className={Styles.listFilterslabel}>
                                    <input
                                        type="checkbox"
                                        value={category.name}
                                        checked={selectedCategories.includes(category.name)}
                                        onChange={handleCategoryChange}
                                    />
                                    {category.name}
                                </label>
                            </li>
                        ))}
                    </ul>

                </div>
                <hr className={Styles.filterSectionhr} />
                <div>
                    <h5>por Fecha</h5>
                    <div className={Styles.selectDateFilter}>
                        {/* ACA VA EL COMPONENTE PARA FILTRAR POR  LAS FECHAS */}
                        <DatePicker className={width >= 1121 ? "rmdp-prime" : "rmdp-mobile"} plugins={[<Footer position="bottom" />]} numberOfMonths={width < 620 ? 1 : 2} render={<InputIcon />} range minDate={new DateObject().toFirstOfYear} maxDate={new DateObject().toLastOfYear} onChange={dateObjects => { setDateValues(dateObjects) }} containerClassName='custom-container' mapDays={({ date }) => {
                            const { year, month, day } = date
                            let mappedDate = new Date(`${year}/${month}/${day}`)
                            let isPastDate = mappedDate <= actualDate
                            if (isPastDate) return {
                                disabled: true,
                                style: { color: "#ccc" }
                            }
                        }} />
                    </div>
                </div>
                <hr className={Styles.filterSectionhr} />
                <div className={Styles.filterSection}>
                    <h5>por Precio</h5>
                    <ul className={Styles.listFiltersul}>
                        <li>
                            <label className={Styles.listFilterslabel}>
                                <input
                                    type="checkbox"
                                    value="menos de $15000"
                                    checked={selectedPriceFilters.includes("menos de $15000")}
                                    onChange={handlePriceFilterChange}
                                />
                                menos de $15000
                            </label>
                        </li>
                        <li>
                            <label className={Styles.listFilterslabel}>
                                <input
                                    type="checkbox"
                                    value="entre $15000 y $18000"
                                    checked={selectedPriceFilters.includes("entre $15000 y $18000")}
                                    onChange={handlePriceFilterChange}
                                />
                                entre $15000 y $18000
                            </label>
                        </li>
                        <li>
                            <label className={Styles.listFilterslabel}>
                                <input
                                    type="checkbox"
                                    value="entre $18000 y $30000"
                                    checked={selectedPriceFilters.includes("entre $18000 y $30000")}
                                    onChange={handlePriceFilterChange}
                                />
                                entre $18000 y $30000
                            </label>
                        </li>
                        <li>
                            <label className={Styles.listFilterslabel}>
                                <input
                                    type="checkbox"
                                    value="mas de $30000"
                                    checked={selectedPriceFilters.includes("mas de $30000")}
                                    onChange={handlePriceFilterChange}
                                />
                                mas de $30000
                            </label>
                        </li>
                    </ul>
                </div>
                <hr className={Styles.filterSectionhr} />
                <div className={Styles.filterSection}>
                    <h5>por Caracteristicas</h5>
                    <ul className={Styles.listFiltersul}>
                        {features.map((features) => (
                            <li key={features.id}>
                                <label className={Styles.listFilterslabel}>
                                    <input
                                        type="checkbox"
                                        value={features.name}
                                        checked={selectedFeatures.includes(features.name)}
                                        onChange={handleFeatureChange}
                                    />
                                    {features.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div >
        </div>
    );
};