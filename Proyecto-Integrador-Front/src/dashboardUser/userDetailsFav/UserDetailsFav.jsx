// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BiSad } from "react-icons/bi"
import { FaRegBookmark } from "react-icons/fa"
import { IoTrashOutline } from "react-icons/io5";
import { Toaster, toast } from 'react-hot-toast';
import { LoaderAnimation } from '../../components/loaderAnimation/LoaderAnimation';
import Styles from './UserDetailsFavs.module.css'

export const UserDetailsFav = (id) => {

    const [products, setProducts] = useState([])
    const [favoriteProducts, setFavoriteProducts] = useState([])
    const [width, setWidth] = useState(window.innerWidth);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        fetchProducts()
    }, [])

    useEffect(() => {
        const favIDs = JSON.parse(localStorage.getItem("favID")) || [];
        setFavoriteProducts(favIDs);
    }, []);

    async function fetchProducts() {
        const response = await (await fetch(`http://184.73.112.5:8080/product/all`)).json()
        setProducts(response.content)
    }

    const deleteCard = (id) => {
        setFavoriteProducts(favoriteProducts.filter(fav => fav !== id))
        toast.success('Favorito eliminado con éxito', {
            duration: 2000,
        });
    }

    useEffect(() => {
        let arrayFavs = JSON.stringify(favoriteProducts)
        localStorage.setItem("favID", arrayFavs)
        fetchProducts().then(() => setIsLoading(false));
    }, [favoriteProducts])

    return (
        <section className={Styles.cardRender}>
            {favoriteProducts.length === 0 ? (
                <div className={Styles.skeletonFav}>
                    <h2>Aun no tienes favoritos  <BiSad /> </h2>
                </div>
            ) : (
                <>
                    <div className={Styles.boxXitemsContainer}>
                        <h3>Mis Favoritos
                            <label htmlFor="">
                                <FaRegBookmark className="save-solid" />
                                <span className={Styles.favoriteCount}>{favoriteProducts.length}</span>
                            </label>
                        </h3>
                    </div>
                    <div className={Styles.itemsContainer}>
                        {isLoading ? (
                            <div className={Styles.loadddddd}>
                                <LoaderAnimation />
                            </div>
                        ) : (
                            products?.filter(products => favoriteProducts.includes(products.id)).map((prod, index) => (
                                <div key={prod.id} className={Styles.productContainer}>
                                    <div className={Styles.containerImage}>
                                        <img className={Styles.itemImageStyle} src={prod.mainImage.src} alt="" />
                                    </div>
                                    <div className={Styles.productDescription}>
                                        <p className={Styles.titleDescription}>{prod.name}</p>
                                        <div className={`${prod.description.length > 150 ? 'limitText' : 'noLimit'}`}>{width > 679 ? <p className={Styles.textDescription}>{prod.description}</p> : undefined}</div>
                                        <div className={Styles.buttonsFavs}>
                                            <Link to={`/detail/${prod.id}`}>
                                                <button className={Styles.seeMoreBtn} type="submit">
                                                    Ver más
                                                </button>
                                            </Link>
                                            <div>
                                                <p className={Styles.deleteFavBtn} onClick={() => deleteCard(prod.id)}>
                                                    <IoTrashOutline />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)))}
                    </div>
                </>
            )}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </section>
    )
}