import PosterCarousel from "../components/PosterCarousel";
import ScrollVelocity from "../components/ScrollVelocity";

function HomeHero() {
  return (
    <div>
      <div
        id="Home"
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen"
      >
        <PosterCarousel />
      </div>
      <div className="mt-2  w-full h-full">
        <ScrollVelocity />
      </div>
    </div>
  );
}

export default HomeHero;