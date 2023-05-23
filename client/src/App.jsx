import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { deleteProduct, getAll } from '../API/requests'

function App() {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    getAll().then((res)=>{
      setProducts(res)
    });
  },[])
  return (
    <>  
        <ul>
          {products && products.map((product)=>{
             return <li key={product._id}>{product.name}, {product.price}
             <button onClick={()=>{
                if (window.confirm("are you sure to delete?")) {
                  deleteProduct(product._id);
                  setProducts(products.filter((x)=>x._id!==product._id))
                }
             }}>delete</button>
             </li>
          })}
        </ul>
    </>
  )
}

export default App
