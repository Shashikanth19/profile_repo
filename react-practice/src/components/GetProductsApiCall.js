export default function ProductsData({ title, price, image, rating }) {
  return (
    <>
      <div className="card">
        <img src={image}></img>
        <p>{title}</p>
        <p>{price}</p>
      </div>
    </>
  );
}
