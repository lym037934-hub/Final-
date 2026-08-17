import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HomeHero from "../Lib/HomeHero";
import ContectSection from "../Lib/ContectSection";
import AboutUs from "../Lib/AboutUs";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";


const Homepage = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <HomeHero />
      
      <ContectSection />
      <AboutUs />
      <WhyChooseUs/>
      <Footer/>
    </div>
  );
};

export default Homepage;