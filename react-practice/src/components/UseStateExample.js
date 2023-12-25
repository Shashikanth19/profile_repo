import { useState } from "react";

export default function UseStateExample() {
  const [productName, updateProductName] = useState("Honor 8C");
  const [productPrice, updateProductPrice] = useState(12000);

  return (
    <>
      <h1>Product name is : {productName}</h1>
      <h1>Product price is : {productPrice}</h1>

      <button onClick={() => {
        updateProductName("Redmi")
      }}>Update Product Name</button> <br /> <br />
      <button onClick={() => {
        updateProductPrice(15000)
      }}>Update Product Price</button>
    </>
  );
}
