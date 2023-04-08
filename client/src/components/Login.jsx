import React from 'react';
import { handleLogin } from '../utilities/auth';

export default function Login({
  setPageComponent,
  email,
  setEmail,
  password,
  setPassword,
  responseMsg,
  setResponseMsg,
  responseStatus,
  setResponseStatus
}) {
  const handleSubmit = async () => {
    setResponseMsg('Logging in...')
    setResponseStatus(false)
    handleLogin(email, password).then((response) => {
      setResponseStatus(response.error)
      setResponseMsg(response.message)
      localStorage.setItem('auth-token', response.data)
      if(!response.error){
        setTimeout(()=>{
          window.location.href='home'
        },[1000])
      }
    });
  };
  return (
    <div className='w-full max-w-sm'>
      <h4 className='font-semibold text-xl'>Login</h4>
      {responseMsg && <label className={!responseStatus ? `text-center text-sm text-green-600 font-semibold py-2` : `text-center text-sm text-red-600 font-semibold py-2`}>{responseMsg}</label>}
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Email ID
          </label>
          <input
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          autoComplete='email'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Email ID'
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Password
          </label>
          <input
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          autoComplete='current-paasword'
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='******'
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={()=>handleSubmit()}
          >
            Login
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-none text-gray-700 no-underline font-bold text-sm pt-4 px-4 hover:underline hover:text-gray-700 focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => setPageComponent('signup')}
          >
            New here? Sign Up!
          </button>
        </div>
      </form>
    </div>
  );
}
