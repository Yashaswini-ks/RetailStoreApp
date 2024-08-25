import { useState,useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function ProductForm({ productData,onPopupClose }) {
    const [productDetails, setProductDetails] = useState(productData ?? {});
    const [loading,setLoading] = useState(false)

    useEffect(() =>{
        console.log(productData)
        setProductDetails(productData)

    },[productData])
    const handleInputChange = (e) => {
        const {name,value} = e.target
        setProductDetails({...productDetails,[name]:value})
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        
        try {
            const res = await api.put(`api/product/edit/${productData.id}/`, productDetails)
        } catch (error) {
            alert(error)
        } finally {
            onPopupClose()
            setLoading(false)
        }
    };

    return (
       <form >
            <div className="form-edit">
            <label>Store ID</label>
            <input
                className="form-input"
                type="text"
                value={productDetails.store_id}
                onChange={handleInputChange}
                name="store_id"
                placeholder="Store ID"
                label = "Store ID"
            />
            </div>
            <div className="form-edit">
            <label>SKU</label>
            <input
                className="form-input"
                type="text"
                value={productDetails.sku}
                onChange={handleInputChange}
                name="sku"
                placeholder="SKU"
            />
            </div>
            <div className="form-edit">
            <label>Product Name</label>
             <input
                className="form-input"
                type="text"
                value={productDetails.product_name}
                onChange={handleInputChange}
                name="product_name"
                placeholder="Product Name"
            />
            </div>
            <div className="form-edit">
            <label>Price</label>
             <input
                className="form-input"
                type="text"
                value={productDetails.price}
                onChange={handleInputChange}
                name="price"
                placeholder="Price"
            />
            </div>
            <div className="form-edit">
            <label>Date</label>
             <input
                className="form-input"
                type="date"
                value={productDetails.date}
                onChange={handleInputChange}
                placeholder="Date"
                name="date"
            />
            </div>
            {loading && <LoadingIndicator />}

           <div className="form-product-button">
           <button className="form-button" type="submit" onClick={onPopupClose}>
                Cancel
            </button>
            <button className="form-button" type="submit" onClick={handleSubmit}>
                Submit
            </button>
            </div>
        </form>
    );
}

export default ProductForm