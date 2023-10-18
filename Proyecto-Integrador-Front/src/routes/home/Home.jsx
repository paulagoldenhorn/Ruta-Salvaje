import { Header } from "../../components/header/Header"
import { SectionCategory } from "../../components/sectionCategory/SectionCategory"
import { AppDetail } from "../../components/appDetail/AppDetail"
import { SearchProduct } from "../searchProduct/SearchProduct"
import { useRef } from "react"
import './Home.css'

export const Home = () => {

    const menuRef = useRef(null)

    const doScroll = () => {
        menuRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="home">
            <Header setScroll={doScroll}/>
            <SectionCategory />
            <AppDetail/>
            <SearchProduct refProps={menuRef}/>
        </div>
    )
}