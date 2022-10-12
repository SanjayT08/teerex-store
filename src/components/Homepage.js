import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { config } from "../App";
import Header from "./Header";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

function Homepage({ cartItems, handleAddtocart, totalQuantity }) {
  const url = `${config.endpoint}`;
  const [productList, setProductlist] = useState([]);
  const [filterProducts, setFilterproducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const searchParams = ["name", "color", "gender", "type"];
  const [isOpen, setIsopen] = useState(false); 

  const performAPICall = async (url) => { 
    try {
      let responseAPI = await axios.get(url);
      setProductlist(responseAPI.data);
    } catch (e) {
      alert(e.message); 
    }
  };

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const handleSearch = (filterProducts, searchParams, searchFilter) => {
    const search = searchFilter.toLowerCase();
    if (search.length) {
      let filteredProducts = filterProducts.filter((product) =>
        searchParams.some((category) =>
          product[category].toLowerCase().includes(search)
        )
      );
      setFilterproducts(filteredProducts);
    } else {
      setFilterproducts(productList);
    }
  };

  useEffect(() => {
    performAPICall(url);
  }, []);

  useEffect(() => {
    setFilterproducts([...productList]);
  }, [productList]);

  return (
    <div className="container">
      <Header cartItems={cartItems} totalQuantity={totalQuantity} />

      <div className="searchbar">
        <input
          className="input"
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <div className="space-gap"></div> 
        <button
          className="searchbutton"
          onClick={(e) =>
            handleSearch(filterProducts, searchParams, searchFilter)
          }         
        >
          <i
            className="fa fa-search"
            style={{ fontSize: "20px", color: "white" }}
          ></i>
        </button>
        <div className="space-gap"></div>
        <div className="filterToggle">
          <button className="filterbutton" onClick={ToggleSidebar}>
            <i
              className="fa fa-filter"
              style={{ fontSize: "20px", color: "white", margin: "0.5rem" }}
            ></i>
          </button>
          <Filter
            productList={productList}
            searchFilter={searchFilter}
            setProductlist={setProductlist}
            setFilterproducts={setFilterproducts}
            filterProducts={filterProducts}
            isOpen={isOpen}
            toggle
            ToggleSidebar={ToggleSidebar}
          />
        </div>
      </div>

      
      <div className="dashboard">
      <Filter
        productList={productList}
        searchFilter={searchFilter}
        setFilterproducts={setFilterproducts}
        filterProducts={filterProducts}
      />
      <ProductCard 
        filterProducts={filterProducts}
        handleAddtocart={handleAddtocart}
      />
    </div>
    </div>
  );
}

export default Homepage;

