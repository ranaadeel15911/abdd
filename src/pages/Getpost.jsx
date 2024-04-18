import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Getpost = () => {
  const [data,setData]= useState([])

  const fetchAllData = async()=>{
    const res = await axios.get("http://localhost:9000/api/v1/getuser")
    console.log(res.data)
    setData(res.data)
      }

  useEffect(()=>{
fetchAllData()
  },[])
  
const handleDelete = async(item)=>{
  // const res = await axios.delete(`https://api.cloudinary.com/v1_1/dr3ie9gpz/image/destroy/${item.cloud_id}`)
  const data = await axios.delete(`http://localhost:9000/api/v1/deleteuser/${item._id}`)
  // console.log(res.data)
  console.log(data.data)
  if (data.data.message) {
    fetchAllData()
  }
}
  return (
    <>
    <h1 style={{textAlign:'center'}}>Get Post</h1>
    {
      data.map((item,index)=>{
        return(
          <div key={index}>
            <h2>Name : {item.name}</h2>
            <h2>Email : {item.email}</h2>
            <h2>Address : {item.address}</h2>
            <img src={item.cloudinary_src} width={100} height={100} alt="" />
            <button style={{cursor:'pointer'}} onClick={()=>handleDelete(item)}>Delete</button>
          </div>
        )
      })
    }

    </>
  )
}

export default Getpost