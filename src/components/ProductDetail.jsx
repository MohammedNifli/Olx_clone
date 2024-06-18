import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { PostContext } from "../store/PostContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

console.log("postContext",PostContext)

const ProductDetail = () => {
  const { postDetails } = useContext(PostContext);
  const [userDet, setUserDet] = useState({});
  const [loading, setLoading] = useState(true);

  const findUser = async () => {
    try {
      console.log("postsss:  ", postDetails);
      // Check if postDetails and postDetails.userId are defined before making the query
      if (postDetails && postDetails?.userId) {
        const m = query(collection(db, "users"), where("id", "==", postDetails.userId));
       
        const querySnapshot = await getDocs(m);

        querySnapshot.forEach((doc) => {
         
          setUserDet(doc.data());
          setLoading(false);
        });
      } else {
        // Handle case where postDetails or postDetails.userId is undefined
        setLoading(false);
        console.error("postDetails or postDetails.userId is undefined");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  if (!postDetails) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <img className="p-5 mx-auto object-cover w-52" src={postDetails.product.imageUrl} alt="" />
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2 space-y-4 p-5 bg-gray-50 shadow-lg ml-3 rounded-lg my-6">
          <h1 className="text-4xl font-bold">{postDetails.product.productName}</h1>
          <h2>Category: {postDetails.product.category}</h2>
          <p>Price: Rs. {postDetails.product.price}</p>
          <p>Location: {postDetails.product.location}</p>
        </div>

        {/* {!loading && (
          <div className="col-span-2 p-5 bg-gray-50 rounded-lg space-y-4 shadow-lg my-6">
            <p className="text-xl underline mb-1">Seller Details</p>
            <h1 className="text-lg">Seller name: <span className="font-medium">{userDet.username}</span></h1>
            <h1>Phone: <span className="font-medium">{userDet.phoneNumber}</span></h1>
          </div>
        )} */}

        <div className="col-span-1 p-5 bg-gray-50 rounded-lg my-6">
          <h1 className="text-4xl font-bold text-center py-5">₹</h1>
          <button className="bg-green-950 text-white w-full rounded-lg font-semibold py-3">
            Buy Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
