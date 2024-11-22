import { useEffect,useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "./Product";



function ProductList() {

    var [products, setProducts] = useState([]);
    var [noOfCartItems, setNoOfCartItems] = useState(0);

    useEffect(() => {
           async function fetchProducts(){
                var response  = await axios.get("https://dummyjson.com/products");
                var temp = response.data.products;
                let data = temp.map(product => {
                    product.isFav = false;
                    return product;
                })

                console.log(data);
                setProducts(data);
            }
            fetchProducts();
    },[]);

    function updateCart(){
        setNoOfCartItems(noOfCartItems + 1);
    }

    function removeCart() {
        setNoOfCartItems(noOfCartItems - 1);
    }
   
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Header/>
                </div>
            </div>
            <div className="row mt-5 mb-5">
               <div className="col-12">
                    <h2>Cart : {noOfCartItems} items</h2>
               </div>
               {
                 products.map(product => (
                    <Product product={product} updateCart ={updateCart} removeCart={removeCart}/>
                 ))
               }
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default ProductList;