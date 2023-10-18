/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

const starValue = localStorage.getItem("stars")

export const UserProvider = (props) => {

    const [jwtCode, setJwtCode] = useState(sessionStorage.getItem('token') || '')
    const [userType, setUserType] = useState("no-logeado");
    const [user, setUser] = useState([])
    const [dateResults, setDateResults] = useState([])
    const [loginMessage, setLoginMessage] = useState(false)
    const [productId, setProductId] = useState(0)

    useEffect(() => {
        userFetch()
    }, [])

    const saveProductId = (prodId) => {
        setProductId(prodId)
    }

    const saveResults = (results) => {
        setDateResults(results)
    }

    const updateLoginMessageState = (value) => {
        setLoginMessage(value)
    }

    const userFetch = async () => {

        const url = `http://184.73.112.5:8080/user`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwtCode}`
            },
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                setUser(data)
                setUserType(data.role)
            })
    }

    return (
        <UserContext.Provider value={{ jwtCode, userType, user, dateResults, saveResults, loginMessage, updateLoginMessageState, productId, saveProductId }}>
            {props.children}
        </UserContext.Provider>
    )
}