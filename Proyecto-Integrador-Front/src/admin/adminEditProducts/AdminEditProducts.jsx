/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Styles from "./adminEditProducts.module.css";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { LuFolderCheck } from "react-icons/lu";
import { DynamicIcon } from "../adminRegisterProducts/DynamicIcon";
import { useParams } from "react-router-dom";
import { UserContext } from '../../context/userContext';
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";

export const AdminEditProducts = () => {
    const userValues = useContext(UserContext)
    const token = userValues.jwtCode

    const { aid } = useParams()
    const [dataProduct, setDataProduct] = useState([])
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [mainImage, setMainImage] = useState({});
    const [sideImages, setSideImages] = useState([]);
    const [features, setFeatures] = useState([]);
    const [category, setCategory] = useState({});
    const [next, setNext] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [responseStatus, setResponseStatus] = useState(0);
    const [icons, setIcons] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sideImage, setSideImage] = useState({})
    const [featuresToSend, setFeaturesToSend] = useState([])
    const [categoryToSend, setCategoryToSend] = useState(0)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dataProductFetch()
        dataFeaturesFetch()
        dataCategoriesFetch()
    }, [])

    const dataProductFetch = async () => {
        const response = await fetch(`http://184.73.112.5:8080/product/${aid}`)
        const data = await response.json()
        setDataProduct(data)
        setPrice(data.price)
        setName(data.name)
        setDescription(data.description)
        setMainImage(data.mainImage)
        setSideImages(data.sideImages)
            setFeaturesToSend(data.features)
            setCategory(data.category)
    }


    const dataFeaturesFetch = async () => {
        const response = await fetch(`http://184.73.112.5:8080/feature/all`)
        const data = await response.json()
        setFeatures(data)
    }

    const dataCategoriesFetch = async () => {
        const response = await fetch(`http://184.73.112.5:8080/category/all`)
        const data = await response.json()
        setCategories(data)
    }

    const [error, setError] = useState(true);
    const [nameError, setNameError] = useState("noError");
    const [descriptionError, setDescriptionError] = useState("noError");
    const [priceError, setPriceError] = useState("noError");
    const [categoryError, setCategoryError] = useState("noError");
    const [mainImageError, setMainImageError] = useState("noError");
    const [mainImageAltError, setMainImageAltError] = useState("noError");
    const [characteristicsError, setCharacteristicsError] = useState("noError");
    const [mainImageSrc, setMainImageSrc] = useState("")
    const [mainImageAlt, setMainImageAlt] = useState("")

    const validateData = () => {
        if (name == "") {
            name.trim().length < 5 ? setNameError("error") : setNameError("noError");
            description.trim().length < 20
                ? setDescriptionError("error")
                : setDescriptionError("noError");
        }
        price <= 0 || price === ""
            ? setPriceError("error")
            : setPriceError("noError");
        category.id == 0 ? setCategoryError("error") : setCategoryError("noError");
        mainImage.src.trim().length < 10
            ? setMainImageError("error")
            : setMainImageError("noError");
        mainImage.alt.trim().length < 5
            ? setMainImageAltError("error")
            : setMainImageAltError("noError");
    };

    const handleSideImage = (event, index) => {
        const updatedSideImages = [...sideImages];
        const updatedSideImage = { ...updatedSideImages[index] };
        updatedSideImage[event.target.name] = event.target.value;
        updatedSideImages[index] = updatedSideImage;
        setSideImages(updatedSideImages);
    };
    const addField = () => {
        setSideImages([...sideImages, { src: "", alt: "" }]);
    };
    const removeField = (e, index) => {
        e.preventDefault()
        let data = [...sideImages];
        data.splice(index, 1);
        setSideImages(data);
    };

    useEffect(() => {
    }, [sideImages])

    // HANDLERS  
    
    const handleNameChange = (e) => {
        setNameError("noError");
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionError("noError");
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPriceError("noError");
        setPrice(e.target.value);
    };
    
    const handleMainImageUrlChange = (e) => {
        setMainImageError("noError");
        setMainImage({ ...mainImage, src: e.target.value });
    };

    const handleMainImageAltChange = (e) => {
        setMainImageAltError("noError");
        setMainImage({ ...mainImage, alt: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setCategoryError("noError");
        setCategory(categories[e.target.value - 1])
    }
        const onOptionChange = (e) => {
            setCharacteristicsError("noError");
            const featureId = parseInt(e.target.value);

            if (e.target.checked) {
                setFeaturesToSend([...featuresToSend, { id: featureId }]);
            } else {
                setFeaturesToSend(featuresToSend.filter((item) => item.id !== featureId));
            }
        };
    

        const handleNextDiv = (e) => {

            validateData();
            if (
                name.trim().length < 5 ||
                description.trim().length < 20 ||
                price <= 0 ||
                price === "" ||
                mainImage.src.trim().length < 10 ||
                mainImage.alt.trim().length < 5 ||
                category.id == 0
            ) {
                setError(true);
            } else {
                setTimeout(() => {
                    setNext(true);
                }, 500);
                setAnimation(true);
            }
        };

        const DynamicLetter = ({ status }) => {
            if (status === 202) {
                return <div className={`${Styles.success} animate__animated animate__fadeIn`}><LuFolderCheck className={Styles.iconSuccess} /></div>
            }
            if (status === 400) {
                return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ya existe una aventura con ese nombre</p></div>
            }
            if (status != 0 && status != 202 && status != 400) {
                return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ocurrio un error, intente mas tarde</p></div>
            }
        }
        
        const handleSubmit = (e) => {
            e.preventDefault();

            if (features.length === 0) {
                setCharacteristicsError("error");
            } else {
                setLoading(true)
                const productData = {
                    id: dataProduct.id,
                    name: name,
                    description: description,
                    mainImage: {
                        id: dataProduct.mainImage.id,
                        src: mainImage.src,
                        alt: mainImage.alt
                    },
                    price: price,
                    sideImages: sideImages,
                    category: {
                        id: category.id,
                        name: categories[category.id - 1].name
                    },
                    features: featuresToSend,
                }

                const url = "http://184.73.112.5:8080/product"
                const settings = {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(productData),
                }
                fetch(url, settings)
                    .then(response => {
                        setResponseStatus(response.status)
                        setLoading(false)
                    })
            }
        }

        return (
            <div className='listProductsAdmin'>
                <p>
                    Administracion &gt; Aventuras &gt; <span className='spanAdminList'>Editar aventura</span> &gt; <span className='spanAdminList'>ID: {dataProduct.id}</span>
                </p>
                <h3>Editar aventura</h3>
                <div>
                    <div className={Styles.registerProductContainer}>
                        {!next ? (
                            <div className={Styles.firstPage}>
                                <section
                                    className={`${Styles.formContainer} ${animation
                                        ? "animate__animated animate__bounceOutLeft"
                                        : "noAnimation"
                                        } `}
                                >
                                    <form action="">
                                        <div className={Styles.namePriceFields}>
                                            <div>
                                                <label htmlFor="productName">Nombre</label>
                                                <input
                                                    id="productName"
                                                    className={`${Styles[nameError]}`}
                                                    type="text"

                                                    value={name}
                                                    onChange={handleNameChange}
                                                />
                                                <p
                                                    className={`${Styles.textError} ${nameError === "error"
                                                        ? Styles.showName
                                                        : Styles.hideName
                                                        }`}
                                                >
                                                    Minimo 5 caracteres
                                                </p>
                                            </div>
                                            <div>
                                                <label htmlFor="productPrice">Precio</label>
                                                <input
                                                    id="productPrice"
                                                    className={`${Styles[priceError]}`}
                                                    type="text"

                                                    value={price}
                                                    onChange={handlePriceChange}
                                                />
                                                <p
                                                    className={`${Styles.textError} ${priceError === "error"
                                                        ? Styles.showPrice
                                                        : Styles.hidePrice
                                                        }`}
                                                >
                                                    Ingrese un precio valido
                                                </p>
                                            </div>
                                        </div>
                                        <div className={Styles.description}>
                                            <label htmlFor="productDescription">Descripcion</label>
                                            <textarea
                                                className={`${Styles[descriptionError]}`}
                                                value={description}
                                                onChange={handleDescriptionChange}
                                            />
                                            <p
                                                className={`${Styles.textError} ${descriptionError === "error"
                                                    ? Styles.showDescription
                                                    : Styles.hideDescription
                                                    }`}
                                            >
                                                Minimo de 20 caracteres
                                            </p>
                                        </div>
                                        <div className={Styles.formCategories}>
                                            <p className={Styles.categoryTitle}>Categoria:</p>
                                            <div className={Styles.categories}>
                                                {categories.map((cat) => {
                                                    return (
                                                        <div key={cat.name}>
                                                            <input
                                                                type="radio"
                                                                name="product_category"
                                                                value={cat.id}
                                                                checked={cat.id === category.id}
                                                                onChange={handleCategoryChange}
                                                            />
                                                            <label value={cat.id}>{cat.name}</label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <p
                                                className={`${Styles.textError} ${categoryError === "error"
                                                    ? Styles.showCategory
                                                    : Styles.hideCategory
                                                    }`}
                                            >
                                                Elija una categoria
                                            </p>
                                        </div>
                                        <div className={Styles.mainUrl}>
                                            <label htmlFor="productMainImageUrl">
                                                URL imagen de portada
                                            </label>
                                            <input
                                                id="productMainImageUrl"
                                                className={`${Styles[mainImageError]}`}
                                                type="text"
                                                placeholder="ingrese la url de la imagen principal"
                                                value={mainImage.src}
                                                onChange={handleMainImageUrlChange}
                                            />
                                            <p
                                                className={`${Styles.textError} ${mainImageError === "error"
                                                    ? Styles.showMainImage
                                                    : Styles.hideMainImage
                                                    }`}
                                            >
                                                Ingrese una URL valida
                                            </p>
                                        </div>
                                        <div className={Styles.mainAlt}>
                                            <label htmlFor="productMainImageAlt">
                                                Descripcion de la imagen:{" "}
                                            </label>
                                            <input
                                                id="productMainImageAlt"
                                                className={`${Styles[mainImageAltError]}`}
                                                type="text"
                                                placeholder="ingrese un texto alternativo para la imagen principal"
                                                value={mainImage.alt}
                                                onChange={handleMainImageAltChange}
                                            />
                                            <p
                                                className={`${Styles.textError} ${mainImageAltError === "error"
                                                    ? Styles.showMainImageAlt
                                                    : Styles.hideMainImageAlt
                                                    }`}
                                            >
                                                Minimo de 5 caracteres
                                            </p>
                                        </div>
                                        {sideImages.map((sideImage, index) => {
                                            return (
                                                <div key={index} className={Styles.sideImageContainer}>
                                                    <div>
                                                        <input
                                                            name="src"
                                                            type="text"
                                                            placeholder="URL de imagen"
                                                            value={sideImage.src}
                                                            onChange={(event) => handleSideImage(event, index)}
                                                        ></input>
                                                        {/*sideImagesUrlErrors[index] === 'error' ? <p className={Styles.textError}>Ingrese una URL valida</p> : undefined*/}
                                                    </div>
                                                    <div>
                                                        <input
                                                            name="alt"
                                                            type="text"
                                                            placeholder="descripcion de imagen"
                                                            value={sideImage.alt}
                                                            onChange={(event) => handleSideImage(event, index)}
                                                        ></input>
                                                        {/*sideImagesAltErrors[index] === 'error' ? <p className={Styles.textError}>Ingrese una descripcion valida</p> : undefined*/}
                                                    </div>
                                                    <button
                                                        onClick={(e) => removeField(e, index)}
                                                        className={Styles.deleteButton}
                                                    >
                                                        Quitar
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </form>
                                    <div className={Styles.buttonContainer}>
                                        <button
                                            className={Styles.addImageButton}
                                            onClick={addField}
                                            disabled={dataProduct.sideImages?.length === 5 ? true : false}
                                        >
                                            Agregar imagen
                                        </button>
                                        <button onClick={(e) => handleNextDiv()} className={Styles.nextDiv}>
                                            Siguiente
                                        </button>
                                    </div>
                                </section>
                                <section
                                    className={`${Styles.previewContainer} ${animation
                                        ? "animate__animated animate__bounceOutLeft"
                                        : "noAnimation"
                                        }`}
                                >
                                    <p className={Styles.previewTitleBox}>Previsualizacion</p>
                                    <div className={Styles.imagesPreview}>
                                        <div className={Styles.mainImagePreview}>
                                            {mainImage === "" ? (
                                                <Skeleton width={256} height={312} />
                                            ) : (
                                                <img
                                                    src={mainImage.src == "" ? dataProduct.mainImage?.src : mainImage.src}
                                                    alt={mainImage.alt == "" ? dataProduct.mainImage?.alt : mainImage.alt}
                                                    className="animate__animated animate__fadeIn"
                                                />
                                            )}
                                        </div>
                                        <div className={Styles.sideImagesPreview}>
                                            {sideImages?.map((sideImage, index) => {
                                                return (
                                                    <div className={Styles.sideImageBox} key={index}>
                                                        {sideImage.src === "" ? (
                                                            <Skeleton width={100} height={120} />
                                                        ) : (
                                                            <img
                                                                src={sideImage.src}
                                                                alt={sideImage.alt}
                                                                className="animate__animated animate__fadeIn"
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <section
                                className={`${Styles.formContainer} ${next ? "animate__animated animate__bounceInRight" : "noAnimation"
                                    } `}
                            >
                                <form action="">
                                    <div className={Styles.mainUrl}>
                                        <p className={Styles.addServicesTitle}>Actualice los servicios de su experiencia</p>
                                    </div>
                                    <div className={Styles.radioServices}>
                                        {features.map((feature, index) => {
                                            return (
                                                <div key={feature.id} className={Styles.radioBox}>
                                                    <input
                                                        type="checkbox"
                                                        id={feature.id}
                                                        name={feature.name}
                                                        value={feature.id}
                                                /*-*/ checked={featuresToSend.some(singleFeature => singleFeature.id === feature.id)}
                                                        onChange={(e) => onOptionChange(e)}
                                                    />
                                                    <DynamicIcon name={feature.icon} />
                                                    <label>{feature.name}</label>
                                                </div>
                                            );
                                        })}
                                        <p
                                            className={`${Styles.textError} ${characteristicsError === "error"
                                                ? Styles.showCharacteritics
                                                : Styles.hideCharacteristics
                                                }`}
                                        >
                                            Ingrese al menos 1 servicio
                                        </p>
                                    </div>
                                </form>
                                <div className={Styles.buttonContainer}>
                                    {
                                        responseStatus === 0 ? <button onClick={(e) => handleSubmit(e)} className={Styles.send}>{
                                            !loading ? 'Actualizar aventura' : <div className={Styles.loader}></div>
                                        }</button> : <DynamicLetter status={responseStatus} />
                                    }
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        )
        
    }