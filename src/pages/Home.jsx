import HomeHero from "../assets/imgs/home-hero.png";
export default function Home() {
  return (
    <div className="home-page">
      <div className="hero-content">
        <h1>New collections for everyone</h1>
        <button className="btn">Latest Collection</button>
      </div>
      <div className="hero-img-wrapper">
        <img src={HomeHero} alt="" />
      </div>
    </div>
  );
}
