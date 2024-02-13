import recipeImg from "../assets/imgs/omlette.jpeg"
export default function Banner() {
  return (
    <article className="banner">
      <img src={recipeImg} alt="an omellete image" />
      <h2 className="title">Simple Omlette Recipe</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae cumque
        tempora laboriosam itaque officia harum ullam eaque maxime maiores
        quidem!
      </p>
    </article>
  );
}
