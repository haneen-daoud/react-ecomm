import axios from 'axios';
import{useQuery} from "react-query"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Link} from 'react-router-dom'
import './Categories.css'
import { useContext } from 'react';
export default function Categories() {
const getCategories=async()=>{
  const{data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`);
  return data
}
const{data,isLoading}=useQuery('web-categories',getCategories);



  if(isLoading)
  {
    return <h2>Loading...</h2>
  }
  return (
    //to write without swiper //note(npm i swiper)
    /*<div className="container">
     <div className="row">
      
        {data?.categories.length? data?.categories.map( (category)=>
          <div className="col-lg-4" key={category._id}>
         <img src={category.image.secure_url}></img>
         <h2>{category.name}</h2>
  
          </div>

        ):'<h2>no gategories found</h2>'}
      
     </div>
    </div>*/
    <div className="container">
    <div className="swiper-custom-pagination"></div>
<Swiper
       modules={[Navigation, Pagination,Autoplay]}
   
      pagination={{ 
        clickable: true ,
         el:'.swiper-custom-pagination'
      }}
      spaceBetween={50}
      slidesPerView={5.5}
      //to run self
      loop={true}
      autoplay={{
        delay:2000
      }}
      navigation
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      
      {data?.categories.length? data?.categories.map( (category)=>
      
          <SwiperSlide key={category._id}>
            <Link to={`/products/category/${category._id}`}>
            <div className="category ">
            <img src={category.image.secure_url} ></img>
            </div>
            </Link>
            </SwiperSlide>


        ):'<h2>no gategories found</h2>'}

    </Swiper>
    </div>
 
  )
}
