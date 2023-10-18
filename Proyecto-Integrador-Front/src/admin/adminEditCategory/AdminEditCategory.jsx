import Styles from './adminEditCategory.module.css'
import { useContext, useEffect, useState } from 'react'
import { LuFolderCheck } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export const AdminEditCategory = () => {
    const { cid } = useParams();
    const [categoryData, setCategoryData] = useState(
        {
            id: '',
            name: '',
            description: '',
            image: {
                id: '',
                url: '',
                alt: ''
            }
        }
    )
    const userValues = useContext(UserContext)
    const token = userValues.jwtCode
    const [id, setId] = useState(categoryData.id)
    const [category, setCategory] = useState(categoryData.name)
    const [description, setDescription] = useState(categoryData.description)
    // const [idImage, setIdImage] = useState(categoryData.image.id)    
    const [url, setUrl] = useState(categoryData.image.url)
    const [alt, setAlt] = useState(categoryData.image.alt)
    const [responseStatus, setResponseStatus] = useState(0)
    const [categoryError, setCategoryError] = useState('noError')
    const [descriptionError, setDescriptionError] = useState('noError')
    const [urlError, setUrlError] = useState('noError')
    const [altError, setAltError] = useState('noError')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dataCategoryFetch()
    }, [])

    const dataCategoryFetch = async () => {
        const response = await fetch(`http://184.73.112.5:8080/category/${cid}`)
        const data = await response.json()
        setCategoryData(data)
    }
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
        category === '' || category.length < 6 ? setCategoryError('error') : setCategoryError('noError')
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
        e.preventDefault()

        validateData()
        if (category === '' || category.length < 6 || description === '' || description.length < 21 || url === '' || url.length < 10 || alt === '' || alt.length < 5) {
            setError(true)
        }
        else {
            setLoading(true)
            const categoryPut = {
                id: categoryData.id,
                name: category,
                description: description,
                image: {
                    id: categoryData.image.id,
                    src: url,
                    alt: alt
                }
            }

            const url = 'http://184.73.112.5:8080/category'
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(categoryPut)
            }

            fetch(url, settings)
                .then(response => {
                    setResponseStatus(response.status)
                    setLoading(false)
                })
                
            const categoryData = {
                id: categoryData.id,
                name: category,
                description: description,
                image: {
                    id: idImage,
                    src: url,
                    alt: alt
                }
            }
        }
    }


    return (
        <div className='listProductsAdmin'>
            <p>
                Administracion &gt; Categorias &gt; <span className='spanAdminList'>Editar categoria</span> &gt; <span className='spanAdminList'>ID: {categoryData.id}</span>
            </p>
            <h3>Editar categoria</h3>
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
                            !loading? 'Actualizar' : <div className={Styles.loader}></div>
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