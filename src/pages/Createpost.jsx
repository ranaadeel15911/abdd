import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import "dotenv"
const Createpost = () => {
    const first = '123ABCf'
    console.log(first.toLocaleLowerCase())
    const [image,setImage]= useState()
    console.log(image)
    const ref = useRef(null)
    const handleImage = (e)=>{
        if (e.target.files[0].size > 1048576) {
            alert('Please select less than 1mb file')
            e.target.value = ""
            // ref.current.value = ""
            return
        }
        else{
            setImage(e.target.files[0])
        }
    }
    const navigate = useNavigate()
    console.log(image)
    const [input,setInput] = useState({
        name:'',
        email:"",
        address:"",
        cloudinary_src:"",
        cloud_id:"",
    })
    console.log(input)
    const upload = process.env.REACT_APP_UPLOAD_PRESET
    console.log(upload)
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('submit')
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset",process.env.REACT_APP_UPLOAD_PRESET)
        data.append("cloud_name",process.env.REACT_APP_CLOUD_NAME)

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dr3ie9gpz/image/upload",data).then(async(res)=>{

                console.log(res)
                const ano = await axios.post("http://localhost:9000/api/v1/create",{
                    ...input,cloudinary_src:res.data.url,cloud_id:res.data.public_id
                })
                console.log(ano)
                setInput({
                    name:'',
                    email:"",
                    address:"",
                    cloudinary_src:"",
                    cloud_id:"",
            
                })
                ref.current.value = ""

            }
            ).catch((err)=>console.log(err))
        } catch (error) {
            console.log(error)
        } finally {
navigate('/getpost')
        }

    }
// const handleImg = ()=>{
// }
  return (
    <>
    <h1 style={{textAlign:'center'}}>Form</h1>
    <form onSubmit={handleSubmit}>

    Name : <input type="text" name='name' value={input.name} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}/><br />
    Email : <input type="text" name='email' value={input.email} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}/><br />
    Address : <input type="text"  name='address' value={input.address} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}/><br />
    <input style={{cursor:'pointer'}} type="file" ref={ref} name="image" accept='images/*' onChange={handleImage} />
    <br />
    <button type='submit' style={{cursor:'pointer'}}>Submit</button>
    </form>
    <br /><br />

    </>
  )
}

export default Createpost