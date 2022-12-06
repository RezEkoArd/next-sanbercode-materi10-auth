import React, { useEffect, useState } from 'react'

export async function getServerSide(){
    let res = await fetch('https://backendexample.sanbercloud.com/api/contestants/')
    let data = await res.json()

    return{
        props: {
            data
        }
    }
}

export default function Static({data}) {
    const [dataContestant, setDataContestant] = useState(data)
    const [input, setInput] = useState({
        name: "",
        gender: "",
        height: ""
    })

    // indikator
    const [fetchStatus, setFetchStatus] = useState(false)
    const [currentId, setCurrentId] = useState(-1) 

    let fetchData = async () => {
        let res = await axios.get(`https://backendexample.sanbercloud.com/api/contestants/`)
        let result = res.data

        setDataContestant([...result])
    }


    useEffect(() => {
        if(fetchStatus){
            fetchData(false)
        }
    },[fetchStatus, setFetchStatus])

    return (
        <div className='w-1/2 mx-auto mt-20  '>

        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" classname="py-3 px-6">
                            Nama
                        </th>
                        <th scope="col" classname="py-3 px-6">
                            Gender
                        </th>
                        <th scope="col" classname="py-3 px-6">
                            Height
                        </th>
                        <th scope="col" classname="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    

                </tbody>
            </table>
        </div>


    </div>

  )
}
