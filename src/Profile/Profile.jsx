import React from 'react'

export default function Profile({userData}) {
  if(!userData){
    return <div>Loading user data...</div>;
  }
  let{name}=userData;
  console.log(userData);
  
  return (
    <div>
       <h2>name :{name}</h2>
    
    </div>
     
     
  )
}
