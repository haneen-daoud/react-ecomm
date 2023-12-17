import React from 'react'
import Input from '../../pages/Input'
import {useFormik} from 'formik'
import{registerSchema} from '../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function Register() {
const initialValues={
    name:'',
    email:'',
    passsword:'',
    image:'',
}
const handleFieldChange =(event)=>{
formik.setFieldValue('image',event.target.files[0])
}

  const onSubmit = async (users) => {
    const formData = new FormData();
    formData.append("userName", users.userName);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("image", users.image);
    const { data } = await axios.post(
      "https://ecommerce-node4.vercel.app/auth/signup",
      formData
    );
    if ((data.message = "success")) {
      toast.success(
        "acount created succesfully , plz verify your email to login",
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };
    const formik =useFormik({
        
        initialValues,
        onSubmit,
        validationSchema:registerSchema
    })
  
const inputs=[
    {
      id:'useername',
      type:'text',
      name:'userName',
      title:'user name',
      value:formik.values.userName,
    }
    ,
    {
        id:'email',
        type:'email',
        name:'email',
        title:'user email',
        value:formik.values.email,
      },
      {
        id:'password',
        type:'password',
        name:'password',
        title:'user password',
        value:formik.values.password,
      },
      {
        id:'image',
        type:'file',
        name:'image',
        title:'user image',
        onChange:handleFieldChange
      }

]
const renderInputs= inputs.map((input,index)=>
<Input id={input.id} 
type={input.type}
 name={input.name} 
 title={input.title} 
 value={input.value} 
 onChange={input.onChange || formik.handleChange}
 errors={formik.errors} 
 onBulr = {formik.handleBlur}
 touched={formik.touched}
 key={index} />
)
  return (
    <>
    <h2>create account</h2>
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
     {renderInputs}
     <button type='submit' disabled={!formik.isValid}>Register</button>
    </form>
    </>
  )
}
