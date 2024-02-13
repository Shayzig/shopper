import { useParams } from "react-router";

export function ProductIndex() {
  const params = useParams();

  console.log(params);

  return (
    <section className="product-index">
      <h1>{params.productType}</h1>
    </section>
  );
}
