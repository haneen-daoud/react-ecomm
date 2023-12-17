import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../context/Cart';

export default function Product() {
    const {productId}=useParams();
const {addToCartContext}= useContext(CartContext)
const getProduct = async()=>{
const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
return data.product
}
const addToCart = async(productId)=>{
 const res =await addToCartContext(productId)
return res
  }
  
const{data,isLoading}=useQuery('product',getProduct)
if(isLoading){
  return <h2>Loading ....</h2>
}
  return (
   <div className="container">
    <div className="row">
      <div className="col-md-4">
        {
          data.subImages.map((img,index)=>
          <React.Fragment key={index}>
          <ReactImageMagnify {...{
            smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: img.secure_url
            },
            largeImage: {
                src: img.secure_url,
                width: 1200,
                height: 1800
            },
            isActivatedOnTouch	:true
            ,
            isHintEnabled	:true
            
        }} />
            
           </React.Fragment>
          )
        }
      </div>
      <div className="col-md-4">
        <h2>{data.name}</h2>
        <p>{data.price}</p>
        <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)} >add ptoduct</button>
      </div>
    </div>
   </div>
  )
  }

 