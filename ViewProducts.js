import { useParams } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import axios from "axios";


function ViewProducts() {

    var [productId, setProductId] = useState(useParams().id);
    var [product, setProduct] = useState({});


    useEffect(() => {

        async function getSingleProduct() {
            console.log("Product ID is ", productId);
            var response = await axios.get(`https://dummyjson.com/products/${productId}`);
            console.log(response.data);
            setProduct(response.data);
        }

        getSingleProduct();

    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Header />
                </div>
            </div>
            <div className="row mt-5 mb-5">
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            {
                                product.images != null && product.images.map(image => (
                                    <div className="col-6">
                                        <img src={image} className="img-fluid" width="350px" />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-6 border">
                            <h3>{product.title}</h3>
                            <div className="btn btn-success">{product.rating} <i className="bi bi-star"></i></div>
                            <div className="display-5 mt-3">${product.price}</div>
                            <h5 className="mt-4"><span className="text-success">Discount </span>: {product.discountPercentage}</h5>
                            <h5 className="mt-4"><span className="text-success">Category </span>: {product.category}</h5>
                            <h5 className="mt-4">{product.description}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default ViewProducts;