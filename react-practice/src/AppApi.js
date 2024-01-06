import { useEffect, useState } from "react";
import ProductsData from "./components/GetProductsApiCall";
import '../../react-practice/src/components/Products.css'

export default function App() {
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    let res = await fetch("https://fakestoreapi.com/products");

    let productList = await res.json();
    updateProducts(productList);

    console.log(productList);
  }

  if (products.length == 0) {
    return <h1>Fetching Data...</h1>;
  }
  return (
    <>
      <div className="product-list">
        {products.map((p) => (
          <ProductsData {...p} key={p.id}></ProductsData>
        ))}
      </div>
    </>
  );
}
