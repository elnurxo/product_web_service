import { BASE_URL } from "./base_url";
import axios from "axios";

export const getAll = async()=>{
    let AllProducts;
    await axios.get(`${BASE_URL}/products`)
    .then((res)=>{
        AllProducts = res.data;
    })
    return AllProducts;
}

export const getOne = async(id)=>{
    let SingleProduct;
    await axios.get(`${BASE_URL}/products/${id}`)
    .then((res)=>{
        SingleProduct = res.data;
    })
    return SingleProduct;
}

export const deleteProduct = (id)=>{
    axios.delete(`${BASE_URL}/products/${id}`);
}