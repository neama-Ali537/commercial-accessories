import React from 'react'

export default function Error() {
  return (
    <div className='container text-center d-flex justify-content-center'>
      <div className=''> 
         <h1>404 Not Found</h1>
      <p >you visites page not found you may go home page</p>
      <button className='btn btn-danger'><a className='text-light text-decoration-none' href="/">Back to home page</a> </button>
      </div>
     
    </div>
  )
}
