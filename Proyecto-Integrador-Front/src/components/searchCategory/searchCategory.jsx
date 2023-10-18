import { useState, useEffect } from "react"


export const SearchCategory = () => {
    const [category, setCategory] = useState([])

    async function fetchCategory() {
        const response = await (await fetch(`http://184.73.112.5:8080/category/all `, settings)).json()
        setCategory(response)
    }
    const settings = {
        method: 'GET'
    }
    useEffect(() => {
        fetchCategory()
    }, []);

    return (
        <div className="filter-category-container">
            <h3 className="filter-title">Categorias</h3>
            <ul>
                {category.map((item, index) => {
                    return (
                        <li className='description' key={index}>
                            <p className='iconDescription'>{item.name}</p>
                        </li>)
                })}
            </ul>
        </div>
    )
}