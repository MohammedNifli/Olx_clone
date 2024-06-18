import { LOGO_URL } from "../utilities/constant";
import React,{ useState, useContext, useRef } from "react";
import Banner from '../components/Banner.jsx';

import Shimmer from "../components/Hummer.jsx";
import ProPosts from '../components/ProPosts.jsx'

const Home = () => {
  return (
    <>
    
       <Banner/>
       <ProPosts/>
       </>
   
  )
}

export default Home