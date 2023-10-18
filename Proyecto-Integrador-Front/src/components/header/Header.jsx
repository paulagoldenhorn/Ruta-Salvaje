import DatePicker, { DateObject } from "react-multi-date-picker"
import { useState, useEffect, useContext } from 'react'
import InputIcon from "react-multi-date-picker/components/input_icon"
import { UserContext } from '../../context/userContext'
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { RotativeLetterHome } from "../rotativeLetterHome/RotativeLetterHome";
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/layouts/mobile.css"
import './Header.css'

export const Header = (props) => {

    const userValues = useContext(UserContext)
    const [dateValues, setDateValues] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    let actualDate = new Date()
    actualDate.setDate(actualDate.getDate() - 1)

    const [width, setWidth] = useState(window.innerWidth);
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (dateValues.length > 1) {
            fetchProducts()
        }
    }, [dateValues])

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            1900,
          );
          return () => clearTimeout(intervalId);
    }, [])

    const fetchProducts = async () => {
        const response = await fetch(`http://184.73.112.5:8080/product/startDate/${dateValues[0].format('YYYY-MM-DD')}/endDate/${dateValues[1].format('YYYY-MM-DD')}`)
        const data = await response.json()
        setSelectedProducts(data)
        userValues.saveResults(data)
    }

    return (
        <div className="header">
            <div className="header-container-header">
                <h2 className="header-title">Es hora de nuevas</h2>
                <RotativeLetterHome/>
            </div>           
            <p className='headerDescription'>Selecciona las fechas de tu próxima aventura</p>
            <div className="form-container-header">
                <DatePicker className={width >= 1121 ? "rmdp-prime" : "rmdp-mobile"} plugins={[<Footer position="bottom" />]} numberOfMonths={width<620? 1:2} render={<InputIcon />} range minDate={new DateObject().toFirstOfYear} maxDate={new DateObject().toLastOfYear} onChange={dateObjects => { setDateValues(dateObjects) }} containerClassName="custom-container" mapDays={({ date }) => {
                    const { year, month, day } = date
                    let mappedDate = new Date(`${year}/${month}/${day}`)
                    let isPastDate = mappedDate <= actualDate
                    if (isPastDate) return {
                        disabled: true,
                        style: { color: "#ccc" }
                    }
                }} />
                <div>
                    <button onClick={props.setScroll} className='botonHeader'>Encontrar destino </button>
                </div>
            </div>
        </div>
    )
}