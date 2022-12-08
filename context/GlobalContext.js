import {createContext, useState} from 'react'
import axios from 'axios';


export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    let [tes, ] = useState("ok, ini adalah state dari context")

    const  [input, setInput] = useState({
        name: "",
        gender: "",
        height: ""
    })

    // indikator
    const [fetchStatus, setFetchStatus] = useState(false)
    const [currentId, setCurrentId] = useState(-1)

  

    const handleDelete = (event) => {
        let idData = event.target.value

        axios.delete(`https://backendexample.sanbercloud.com/api/contestants/${idData}`)
        .then((res) => {
            console.log(res)
            setFetchStatus(true)
        })
    }

    const handleEdit = (event) => {
        let idData = event.target.value

        axios.get(`https://backendexample.sanbercloud.com/api/contestants/${idData}`)
        .then((res) => {
            console.log(res)
            setCurrentId(res.data.id)

            setInput({
                name : res.data.name,
                gender: res.data.gender,
                height: res.data.height

            })
        })
    }

    const handleChange = (event) => {
        setInput({...input, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let {name, gender, height} = input

        if(currentId === -1 ){
            axios.post(`https://backendexample.sanbercloud.com/api/contestants`, {name, gender, height})
            .then((res) => {
                setFetchStatus(true)
            })
        } else {
            axios.put(`https://backendexample.sanbercloud.com/api/contestants/${currentId}`, {name, gender, height})
            .then((res) => {
                setFetchStatus(true)
            })
        }

        setInput({
            name: "",
            gender: "",
            height: ""
        })

        setCurrentId(-1)
    }


    // inisialisasi
    let state = {
        input, setInput,
        fetchStatus, setFetchStatus,
        currentId, setCurrentId
    }

    let handle = {
        handleDelete , handleEdit,
        handleChange, handleSubmit
    }

    return (
        <GlobalContext.Provider value={{state, handle}}>
            {props.children}
        </GlobalContext.Provider>
    )
} 