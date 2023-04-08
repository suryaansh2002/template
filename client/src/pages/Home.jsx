import React, {useEffect} from 'react'
import { handleAuthenticate } from '../utilities/auth'

export default function Home() {
  useEffect(()=>{
    handleAuthenticate();
  },[])
  return (
    <div>Home Page</div>
  )
}
