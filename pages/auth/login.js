import React from 'react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import {useRouter} from 'next/router'
import axios from 'axios';



export default function login() {
    let router = useRouter()

    const [input, setInput] = useState({
        email : "",
        password: ""
    })

    const handleChange =  (event) => {
        setInput({...input, [event.target.name] : event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(`https://backendexample.sanbersy.com/api/user-login`,  {email: input.email, password: input.password})
        .then((res) => {
            console.log(res)
            let data = res.data

            console.log(data.token)
            router.push('/static')
            Cookies.set('token', data.token, {expires : 1} )
        })
    }

  return (
    <form className='p-5' onSubmit={handleSubmit} >
        <label>Email</label><br />
        <input className='inline-block py-3 h-5 border-solid border-2 border-gray-500' onChange={handleChange} value={input.email} name='email' type="email" /><br />
        <label>Password</label><br />
            <input className='inline-block py-3 h-5 border-solid border-2 border-gray-500' onChange={handleChange} value={input.password} name='password' type="password" /><br />

            <br />
            <button className='px-2 text-white bg-gray-500' type='submit'>Login</button>
    </form>
  )
}
