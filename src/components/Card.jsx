import React from "react";
import { useContext } from "react";
import { PostContext } from "../store/PostContext";
import { useNavigate ,Link} from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

const Card = (data) => {
    const {product} = data
    console.log(product)
    const { setPostDetails } = useContext(PostContext);
    const navigate = useNavigate();

    const postHandle = () => {
        setPostDetails(data);
        navigate(`/productDetail`);
    }

    const { productName, category, location, imageUrl, price, createdAt } = product;
    return (
        <div className="border border-gray-300 cursor-pointer p-3  shadow-lg container rounded-md">
            <FaRegHeart />
            <div onClick={postHandle} className="m-2">
               
                <div className="relative">
                <Link to='/productDetail'>
                <img className="h-60 object-cover mx-auto" src={imageUrl} alt="" />
                </Link>
                   
                </div>
                <div className="my-3 mx-2 space-y-2 flex flex-col">
                    <h1 className="font-bold text-2xl">₹ {price}</h1>
                    <p className="text-gray-500 mb-2">{productName} sale</p>
                    <p className="text-xs text-gray-500">( {category} )</p>
                    <p className="text-xs text-gray-500">{location.toUpperCase()}</p>
                    <p className="text-small self-end text-gray-500">{createdAt}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
