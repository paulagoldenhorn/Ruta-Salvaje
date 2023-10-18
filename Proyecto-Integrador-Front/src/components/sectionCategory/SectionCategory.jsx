import { useState, useEffect } from "react";
//import { CardCategory } from "../cardCategory/CardCategory";
import './SectionCategory.css';
import CategoryCards from "./categoryCards/CategoryCards";

export const SectionCategory = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setLoading(true);
        fetch("http://184.73.112.5:8080/category/all")
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="orderSection">
            <div className="explore-container">
                <p className="explore">Explora todos los rincones <br /> del mundo con nosotros</p>
            </div>
            <CategoryCards/>
        </div>
    );
};