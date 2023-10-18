import Styles from "./AdminRegisterProducts.module.css";
import { useEffect, useState, useContext } from "react";
import "animate.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuFolderCheck } from "react-icons/lu";
import { DynamicIcon } from "./DynamicIcon";
import { UserContext } from '../../context/userContext';

export const AdminRegisterProducts = () => {
  
  const userValues = useContext(UserContext)
  const token = userValues.jwtCode

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainImageAlt, setMainImageAlt] = useState("");
  const [sideImagesFields, setSideImagesFields] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [category, setCategory] = useState(0);
  const [next, setNext] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [responseStatus, setResponseStatus] = useState(0);
  const [icons, setIcons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(true);
  const [nameError, setNameError] = useState("noError");
  const [descriptionError, setDescriptionError] = useState("noError");
  const [priceError, setPriceError] = useState("noError");
  const [categoryError, setCategoryError] = useState("noError");
  const [mainImageError, setMainImageError] = useState("noError");
  const [mainImageAltError, setMainImageAltError] = useState("noError");
  const [characteristicsError, setCharacteristicsError] = useState("noError");

  useEffect(() => {
    dataFeaturesFetch();
    dataCategoriesFetch();
  }, []);

  const dataFeaturesFetch = async () => {
    const response = await fetch(`http://184.73.112.5:8080/feature/all`);
    const data = await response.json();
    setIcons(data);
  };

  const dataCategoriesFetch = async () => {
    const response = await fetch(`http://184.73.112.5:8080/category/all`);
    const data = await response.json();
    setCategories(data);
  };

  //----------------------------------------

  // VALIDACIONES PRIMER CARD

  const validateData = () => {
    name.trim().length < 5 ? setNameError("error") : setNameError("noError");
    description.trim().length < 20
      ? setDescriptionError("error")
      : setDescriptionError("noError");
    price <= 0 || price === ""
      ? setPriceError("error")
      : setPriceError("noError");
    category === 0 ? setCategoryError("error") : setCategoryError("noError");
    mainImage.trim().length < 10
      ? setMainImageError("error")
      : setMainImageError("noError");
    mainImageAlt.trim().length < 5
      ? setMainImageAltError("error")
      : setMainImageAltError("noError");
  };
  const handleSideImage = (event, index) => {
    let data = [...sideImagesFields];
    data[index][event.target.name] = event.target.value;
    setSideImagesFields(data);
  };


  const addField = () => {
    setSideImagesFields([...sideImagesFields, { src: "", alt: "" }]);
  };

  const removeField = (index) => {
    let data = [...sideImagesFields];
    data.splice(index, 1);
    setSideImagesFields(data);
  };

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
    setMainImage(e.target.value);
  };

  const handleMainImageAltChange = (e) => {
    setMainImageAltError("noError");
    setMainImageAlt(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryError("noError");
    setCategory(e.target.value);
  };

  useEffect(()=> {
  }, [category])

  const onOptionChange = (e) => {
    setCharacteristicsError("noError");
    if (e.target.checked) {
      setCharacteristics([...characteristics, { id: e.target.value }]);
    } else {
      setCharacteristics(
        characteristics.filter((item) => item.id !== e.target.value)
      );
    }
  };

  useEffect(() => {
  }, [characteristics]);

  const handleNextDiv = () => {
    validateData();
    if (
      name.trim().length < 5 ||
      description.trim().length < 20 ||
      price <= 0 ||
      price === "" ||
      mainImage.trim().length < 10 ||
      mainImageAlt.trim().length < 5 ||
      category === ""
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
    if (status === 201) {
      return (
        <div className={`${Styles.success} animate__animated animate__fadeIn`}>
          <LuFolderCheck className={Styles.iconSuccess} />
        </div>
      );
    }
    if (status === 400) {
      return (
        <div
          className={`${Styles.errorMessage} animate__animated animate__fadeIn`}
        >
          <p>Ya existe una aventura con ese nombre</p>
        </div>
      );
    }
    if (status != 0 && status != 201 && status != 400) {
      return (
        <div
          className={`${Styles.errorMessage} animate__animated animate__fadeIn`}
        >
          <p>Ocurrio un error, intente mas tarde</p>
        </div>
      );
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (characteristics.length === 0) {
      setCharacteristicsError("error");
    } else {
      setLoading(true)
      const productData = {
        name: name,
        description: description,
        mainImage: {
          src: mainImage,
          alt: mainImageAlt,
        },
        price: price,
        category: {
          id: category,
        },
        sideImages: sideImagesFields,
        features: characteristics,
      };

      const url = "http://184.73.112.5:8080/product";
      const settings = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      };

      fetch(url, settings).then((response) => {
        setResponseStatus(response.status)
        setLoading(false)
      });
    }
  };

  return (
    <>
      <div className="listProductsAdmin">
        <p>
          Administracion &gt; Servicios &gt;{" "}
          <span className="spanAdminList">Agregar nueva</span>
        </p>
        <h3>Agregar nueva aventura</h3>
      </div>
      <div className={Styles.registerProductContainer}>
        {!next ? (
          <div className={Styles.firstPage}>
            <section
              className={`${Styles.formContainer} ${
                animation
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
                      placeholder="ingrese el nombre del producto"
                      value={name}
                      onChange={handleNameChange}
                    />
                    <p
                      className={`${Styles.textError} ${
                        nameError === "error"
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
                      placeholder="ingrese el precio del producto"
                      value={price}
                      onChange={handlePriceChange}
                    />
                    <p
                      className={`${Styles.textError} ${
                        priceError === "error"
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
                    placeholder="ingrese la descripcion del producto"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <p
                    className={`${Styles.textError} ${
                      descriptionError === "error"
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
                            name='categorias'
                            value={cat.id}
                            onChange={handleCategoryChange}
                          />
                          <label>{cat.name}</label>
                        </div>
                      );
                    })}
                  </div>
                  <p
                    className={`${Styles.textError} ${
                      categoryError === "error"
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
                    value={mainImage}
                    onChange={handleMainImageUrlChange}
                  />
                  <p
                    className={`${Styles.textError} ${
                      mainImageError === "error"
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
                    value={mainImageAlt}
                    onChange={handleMainImageAltChange}
                  />
                  <p
                    className={`${Styles.textError} ${
                      mainImageAltError === "error"
                        ? Styles.showMainImageAlt
                        : Styles.hideMainImageAlt
                    }`}
                  >
                    Minimo de 5 caracteres
                  </p>
                </div>
                {sideImagesFields.map((sideImageField, index) => {
                  return (
                    <div key={index} className={Styles.sideImageContainer}>
                      <div>
                        <input
                          name="src"
                          type="text"
                          placeholder="URL de imagen"
                          value={sideImageField.src}
                          onChange={(event) => handleSideImage(event, index)}
                        ></input>
                        {/*sideImagesUrlErrors[index] === 'error' ? <p className={Styles.textError}>Ingrese una URL valida</p> : undefined*/}
                      </div>
                      <div>
                        <input
                          name="alt"
                          type="text"
                          placeholder="descripcion de imagen"
                          value={sideImageField.alt}
                          onChange={(event) => handleSideImage(event, index)}
                        ></input>
                        {/*sideImagesAltErrors[index] === 'error' ? <p className={Styles.textError}>Ingrese una descripcion valida</p> : undefined*/}
                      </div>
                      <button
                        onClick={() => removeField(index)}
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
                  disabled={sideImagesFields.length === 5 ? true : false}
                >
                  Agregar imagen
                </button>
                <button onClick={handleNextDiv} className={Styles.nextDiv}>
                  Siguiente
                </button>
              </div>
            </section>
            <section
              className={`${Styles.previewContainer} ${
                animation
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
                      src={mainImage}
                      alt={mainImageAlt}
                      className="animate__animated animate__fadeIn"
                    />
                  )}
                </div>
                <div className={Styles.sideImagesPreview}>
                  {sideImagesFields.map((sideImageField, index) => {
                    return (
                      <div className={Styles.sideImageBox} key={index}>
                        {sideImageField.src === "" ? (
                          <Skeleton width={100} height={120} />
                        ) : (
                          <img
                            src={sideImageField.src}
                            alt=""
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
            className={`${Styles.formContainer} ${
              next ? "animate__animated animate__bounceInRight" : "noAnimation"
            } `}
          >
            <form action="">
              <div className={Styles.mainUrl}>
                <p className={Styles.addServicesTitle}>
                  Agregue servicios a su experiencia
                </p>
              </div>
              <div className={Styles.radioServices}>
                {icons.map((icon, index) => {
                  return (
                    <div key={icon.name} className={Styles.radioBox}>
                      <input
                        type="checkbox"
                        id={icon.name}
                        name={icon.name}
                        value={icon.id}
                        onChange={(e) => onOptionChange(e)}
                      />
                      <DynamicIcon name={icon.icon} />
                      <label>{icon.name}</label>
                    </div>
                  );
                })}
                <p
                  className={`${Styles.textError} ${
                    characteristicsError === "error"
                      ? Styles.showCharacteritics
                      : Styles.hideCharacteristics
                  }`}
                >
                  Ingrese al menos 1 servicio
                </p>
              </div>
            </form>
            <div className={Styles.buttonContainer}>
              {responseStatus === 0 ? (
                <button onClick={(e) => handleSubmit(e)} className={Styles.send}>
                  {
                    !loading? 'Registrar aventura' : <div className={Styles.loader}></div>
                  }
                </button>
              ) : (
                <DynamicLetter status={responseStatus} />
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
