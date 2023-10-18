/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Styles from './AdminRegisterCategory.module.css'
import { useState, useContext } from 'react'
import { LuFolderCheck } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";
import { UserContext } from '../../context/userContext';

export const AdminRegisterCategory = () => {


    const userValues = useContext(UserContext)
    const token = userValues.jwtCode

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [alt, setAlt] = useState('')
    const [responseStatus, setResponseStatus] = useState(0)
    const [loading, setLoading] = useState(false)

    const [categoryError, setCategoryError] = useState('noError')
    const [descriptionError, setDescriptionError] = useState('noError')
    const [urlError, setUrlError] = useState('noError')
    const [altError, setAltError] = useState('noError')
    const [error, setError] = useState(false)

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleCategoryChange = (e) => {
        setCategoryError('noError');
        setCategory(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescriptionError('noError')
        setDescription(e.target.value)
    }

    const handleUrlChange = (e) => {
        setUrlError('noError')
        setUrl(e.target.value)
    }

    const handleAltChange = (e) => {
        setAltError('noError')
        setAlt(e.target.value)
    }

    const validateData = () => {
        category === '' || category.length < 3 ? setCategoryError('error') : setCategoryError('noError')
        description === '' || description.length < 21 ? setDescriptionError('error') : setDescriptionError('noError')
        url === '' || url.length < 10 ? setUrlError('error') : setUrlError('noError')
        alt === '' || alt.length < 5 ? setAltError('error') : setAltError('noError')
    }

    const DynamicLetter = ({ status }) => {
        if (status === 201) {
            return <div className={`${Styles.success} animate__animated animate__fadeIn`}><LuFolderCheck className={Styles.iconSuccess} /></div>
        }
        if (status === 400) {
            return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ya existe una categoria con ese nombre</p></div>
        }
        if (status != 0 && status != 201 && status != 400) {
            return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ocurrio un error, intente mas tarde</p></div>
        }
    }


    const handleSubmit = (e) => {
        setButtonDisabled(true)
        e.preventDefault()

        validateData()
        if (category === '' || category.length < 3 || description === '' || description.length < 21 || url === '' || url.length < 10 || alt === '' || alt.length < 5) {
            setError(true)
        }
        else {
            setLoading(true)
            const categoryData = {
                name: category,
                description: description,
                image: {
                    src: url,
                    alt: alt
                }
            }

            const urlPost = 'http://184.73.112.5:8080/category'
            const settings = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(categoryData)
            }

            fetch(urlPost, settings)
                .then(response => {
                    setResponseStatus(response.status)
                    setLoading(false)
                })
        }
    }

    return (
        <div className='listProductsAdmin'>
            <p>
                Administracion &gt; Categorias &gt; <span className='spanAdminList'>Agregar nueva</span>
            </p>
            <h3>Agregar nueva categoria</h3>
            <div className={Styles.contentRegisterCategory}>
                <div className={Styles.registerFeatureContainer}>
                    <form className={Styles.registerFeatureForm} type='submit'>
                        <div className={Styles.inputBox}>
                            <label htmlFor="categoryName">Categoria</label>
                            <input type="text" value={category} onChange={handleCategoryChange} placeholder='Ingrese nombre de la categoria' className={Styles[categoryError]} />
                            <p className={`${Styles.textError} ${categoryError === 'error' ? Styles.showCategory : Styles.hideCategory}`}>Debe tener mas de 5 caracteres</p>
                        </div>
                        <div className={Styles.inputBox}>
                            <label htmlFor="catDescription">Descripcion</label>
                            <textarea type="text" value={description} onChange={handleDescriptionChange} placeholder='Ingrese descripcion de la categoria' className={Styles[descriptionError]} />
                            <p className={`${Styles.textError} ${descriptionError === 'error' ? Styles.showDescription : Styles.hideDescription}`}>Debe tener mas de 20 Caracteres</p>
                        </div>
                        <div className={Styles.inputBox}>
                            <label htmlFor="catUrl">URL de imagen</label>
                            <input type="text" value={url} onChange={handleUrlChange} placeholder='Ingrese URL de la categoria' className={Styles[urlError]} />
                            <p className={`${Styles.textError} ${urlError === 'error' ? Styles.showUrl : Styles.hideUrl}`}>Debe tener mas de 9 caracteres</p>
                        </div>
                        <div className={Styles.inputBox}>
                            <label htmlFor="altImage">Descripcion de imagen</label>
                            <input type="text" value={alt} onChange={handleAltChange} placeholder='Ingrese descripcion de la imagen' className={Styles[altError]} />
                            <p className={`${Styles.textError} ${altError === 'error' ? Styles.showAlt : Styles.hideAlt}`}>Debe tener mas de 4 caracteres</p>
                        </div>
                        {
                            responseStatus === 0 ? <button className={Styles.addFeatureButton} onClick={handleSubmit}>{
                                !loading ? 'Agregar' : <div className={Styles.loader}></div>
                            }</button> : <DynamicLetter status={responseStatus} />

                        }

                    </form>
                </div>
                {
                    url === '' || url.length < 10 ? <Skeleton circle={true} width={300} height={300} className={Styles.skeletonBox} /> : <div className={`${Styles.previewImgBox} animate__animated animate__fadeIn`}><img src={url} alt={alt} className={Styles.previewImg} /></div>
                }

            </div>
        </div>
    )
}