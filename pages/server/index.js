import React from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import { useContext } from 'react'

export default function Server({data}) {
    const {test} = useContext(GlobalContext)
    console.log(test)

  return (
    <>
        
    </>
  )
}
