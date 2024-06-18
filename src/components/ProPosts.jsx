import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import Shimmer from "./Hummer.jsx"; // Ensure the correct import
import Card from "./Card.jsx";

const ProductsList = () => {
  const [prod, setProd] = useState([]); // Corrected the state variable name
  const [loading, setLoading] = useState(true); // State to manage loading status

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const allPosts = querySnapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      console.log("Posts", allPosts);
      setProd(allPosts); // Corrected the state setter function name
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Shimmer />; // Show a loading indicator while fetching data
  }

  return (
    <div className="products-list flex space-x-5">
      {prod.length === 0 ? (
        <p>No products found</p>
      ) : (
        prod.map((product) => <Card key={product.id} product={product}/>)
      )}
    </div>
  );
};

export default ProductsList;
