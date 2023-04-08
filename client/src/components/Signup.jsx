import React from 'react';
import { handleSignup } from '../utilities/auth';
export default function Signup({
  setPageComponent,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  cnfPassword,
  setCnfPassword,
  responseMsg,
  setResponseMsg,
  responseStatus,
  setResponseStatus
}) {
  const handleSubmit = async () => {
    setResponseMsg('Setting up account...')
    setResponseStatus(false)
    handleSignup(name, email, password).then((response) => {
      setResponseStatus(response.error)
      setResponseMsg(response.message)
    });
  };
  return (
    <div className='w-full max-w-sm'>
      <h4 className='font-semibold text-xl'>Sign Up</h4>
      {responseMsg && <label className={!responseStatus ? `text-center text-sm text-green-600 font-semibold py-2` : `text-center text-sm text-red-600 font-semibold py-2`}>{responseMsg}</label>}
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            autoComplete='username'
            type='text'
            placeholder='Full Name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Email ID
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            autoComplete='email'
            type='email'
            placeholder='Email ID'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            autoComplete='new-password'
            type='password'
            placeholder='******'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Confirm Password
          </label>
          <input
            onChange={(e) => {
              setCnfPassword(e.target.value);
            }}
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='cnf-password'
            autoComplete='new-password'
            type='password'
            placeholder='******'
          />
          <div className='flex items-center justify-end text-right text-xs text-red-600 font-semibold'>
            {password && cnfPassword && password !== cnfPassword && (
              <label>Passwords do not match!</label>
            )}
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button
            onClick={() => handleSubmit()}
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            disabled={password !== cnfPassword || !password || !cnfPassword}
          >
            Sign Up
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-none text-gray-700 no-underline font-bold text-sm pt-4 px-4 hover:underline hover:text-gray-700 focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => setPageComponent('login')}
          >
            Already have an account? Login!
          </button>
        </div>
      </form>
    </div>
  );
}
