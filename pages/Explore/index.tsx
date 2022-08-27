//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { GET_TWEETS } from '@/src/requests/graphql'
import { useQuery } from '@apollo/client'
import { decodeToken } from 'react-jwt'
import { DATAUSER_QUERY } from '@/src/requests/graphql'
const index = () => {
const [token, setToken] = useState()
    useEffect (() => {

        const item = localStorage.getItem('Bearer')
        setToken(decodeToken(item))

    }, [])

    const { loading, error, data } = useQuery(DATAUSER_QUERY, {
        variables: {
            where: {
                id: 31
              },
        },
    });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    
  return (
    <div>
        <button onClick={() => console.log(token.data.id)}>CLIK</button>
    </div>
  )
}

export default index