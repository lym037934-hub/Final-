import ShinyText from "../components/ShinyText";
import Store from "../assets/Store.jpg";

const AboutUs = () => {
  return (
    <div  id="about" className="px-4 py-8">
      <div className="flex justify-center mb-8">
        <ShinyText />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Image */}
        <div className="md:col-span-2" data-aos="fade-right">
          <img
            src={Store}
            alt="PC Store"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Text */}
        <div className="md:col-span-3 space-y-6" data-aos="fade-left">
          <div className=" p-3 text-center md:text-left text-xl sm:text-2xl lg:text-3xl font-black font-Orbitron tracking-tight leading-relaxed text-gray-900 dark:text-white">
            At TechParts Store, we provide high-quality PC components from
            trusted brands.
          </div>

          <div className="p-3 text-center md:text-left text-xl sm:text-2xl lg:text-3xl font-black font-Orbitron tracking-tight leading-relaxed text-gray-900 dark:text-white">
            Whether you're building your first gaming PC or upgrading your
            workstation, we offer reliable hardware at competitive prices.
          </div>

          <div className="p-3 text-center md:text-left text-xl sm:text-2xl lg:text-3xl font-black font-Orbitron tracking-tight leading-relaxed text-gray-900 dark:text-white">
            ✓ Genuine Products
          </div>

          <div className="p-3 text-center md:text-left text-xl sm:text-2xl lg:text-3xl font-black font-Orbitron tracking-tight leading-relaxed text-gray-900 dark:text-white">
            ✓ Fast Shipping
          </div>

          <div className="p-3 text-center md:text-left text-xl sm:text-2xl lg:text-3xl font-black font-Orbitron tracking-tight leading-relaxed text-gray-900 dark:text-white">
            ✓ Trusted Support
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
