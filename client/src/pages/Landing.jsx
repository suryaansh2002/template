import React, {useState} from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

export default function Landing() {
    const [pageComponent, setPageComponent]=useState('signup')
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [cnfPassword, setCnfPassword]=useState('')
    const [responseStatus, setResponseStatus]=useState(true);
    const [responseMsg, setResponseMsg]=useState('')
  return (
    <div className='flex justify-center items-center text-center w-[100vw] h-[100vh]'>
        {pageComponent==='login' ? 

        <Login 
        setPageComponent={setPageComponent}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        responseMsg={responseMsg}
        setResponseMsg={setResponseMsg}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus}
        /> : 
        pageComponent==='signup' ? 
        <Signup  
        setPageComponent={setPageComponent}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        cnfPassword={cnfPassword}
        setCnfPassword={setCnfPassword}
        responseMsg={responseMsg}
        setResponseMsg={setResponseMsg}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus}
        />
        : <></>
        }
    </div>
  )
}
