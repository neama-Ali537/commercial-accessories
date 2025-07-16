

export default function Profile({userData}) {
  if(!userData){
    return <div>Loading user data...</div>;
  }
  let{name}=userData;
  return (
    <div className="p-2 d-flex justify-content-start align-items-center m-5">

       <h2 className="  m-2">name :{name}</h2>
    </div>
     
     
  )
}
