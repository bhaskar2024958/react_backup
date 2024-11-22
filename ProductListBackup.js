import { useEffect,useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
import { Link } from "react-router-dom";



function ProductListBackup() {

    var [products, setProducts] = useState([]);

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

    function handleFav(data) {
        console.log("Fav clicked for this Product ",data.id);
        let result = products.map(product => {
            if(product.id === data.id){
                product.isFav = !product.isFav;
            }
            return product;
        })
        console.log(result);
        setProducts(result);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Header/>
                </div>
            </div>
            <div className="row mt-5 mb-5">
                {
                    products.map(product => (
                        <div className="col-3 mb-3">
                            <div className="card">
                                <img src={product.images} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <h5><i className="bi bi-currency-rupee"></i> {product.price}</h5>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary" onClick={e => handleFav(product)}><i className="bi bi-heart"></i>
                                    {
                                        product.isFav == true && <span> Remove</span>
                                    }
                                    {
                                        product.isFav == false && <span> Add</span>
                                    }
                                    </button>
                                    <button className="btn btn-primary ms-2">
                                        
                                        <Link to={`/viewproducts/${product.id}`} className="nav-link">View</Link>
                                    </button>
                                 </div>
                            </div>
                        </div>
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

export default ProductListBackup;