import { Link } from "react-router-dom";


function Product({product,updateCart,removeCart}){

    function AddToCart(){
        updateCart();
    }

    function RemoveCart(){
        removeCart();
    }

    return(
        <div className="col-3">
            <div className="card">
                <img src={product.images} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                     <p className="card-text">{product.description}</p>
                     <h5><i className="bi bi-currency-rupee"></i> {product.price}</h5>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={e => AddToCart()}>Add To Cart</button>
                    <button className="btn btn-danger m-1" onClick={e => RemoveCart()}>Remove</button>
                    <button className="btn btn-primary ms-1">
                      <Link to={`/viewproducts/${product.id}`} className="nav-link">View</Link>
                 </button>
                </div>
                
            </div>
        </div>
    )
}

export default Product;