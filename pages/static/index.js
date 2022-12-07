import axios from 'axios'
import React, { useEffect, useState } from 'react'

export async function getServerSideProps(){
    let res = await fetch(`https://backendexample.sanbercloud.com/api/contestants`)
    let data = await res.json()

    return {
        props: {
            data
        }
    }

}   

export default function Static({data}) {
    const [dataContestant, setDataContestant] = useState(data)    
    const  [input, setInput] = useState({
        name: "",
        gender: "",
        height: ""
    })

    const [fetchStatus, setFetchStatus] = useState(false)
    const [currentId, setCurrentId] = useState(-1)

    let fetchData = async () => {
        let res = await axios.get(`https://backendexample.sanbercloud.com/api/contestants`)
        let result = await res.data
        setDataContestant([...result])
    }

    useEffect(() => {
        if (fetchStatus) {
            fetchData()
            setFetchStatus(false)
        }
    }, [fetchStatus, setFetchStatus])

  
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


    return (
        <div className='w-1/2 mx-auto mt-20  '>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Nama
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Gender
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Height
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataContestant !== undefined && dataContestant.map((res, index) => {
                        return (
                            <tr key={index}>
                                <th className="bg-white border-b dark:bg-gray-800 drak:border-gray-700">
                                    {res.name}
                                </th>
                                <td className="py-4 px-6">
                                    {res.gender}
                                </td>
                                <td className="py-4 px-6">
                                    {res.height}
                                </td>
                                <td className="py-4 px-6">
                                    <button value={res.id} onClick={handleDelete} className="font-medium text-blue-600 dark:text-blue-600 hover:underline p-5">Delete</button>
                                    <button value={res.id} onClick={handleEdit}  className="font-medium text-blue-600 dark:text-blue-600 hover:underline p-5">Edit</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
        <form onSubmit={handleSubmit} className='w-full mx-auto mt-5'>
            <div className='mb-6'>
                <label className='block mb-2 text-sm font-medium text-gray-900'>Name</label>
                <input
                name='name'
                type='text'
                value={input.name}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder='Input Name'
                required 
                >
                </input>
            </div>
            <div className='mb-6'>
                <label className='block mb-2 text-sm font-medium text-gray-900'>Gender</label>
                <input
                name='gender'
                type='text'
                value={input.gender}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder='Input Name'
                required 
                >
                </input>
            </div>
            <div className='mb-6'>
                <label className='block mb-2 text-sm font-medium text-gray-900'>Height</label>
                <input
                name='height'
                type='text'
                value={input.height}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder='Input Name'
                required 
                >
                </input>
            </div>

            <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Submit</button>

        </form>
    </div>
 

  )
}
