import { homeBanner } from "../assets";
import Container from "./Container";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
  return (
    <>
      <Container className="relative py-10 overflow-hidden">
        <div className="relative">
          <img
            src={homeBanner}
            alt="homeBanner"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-7 font-semibold mt-[65px]">
          <h2 className="text-xl md:text-3xl lg:text-6xl text-whiteText ">
            Charly's Bikinis
          </h2>
          <p className="text-base md:text-lg font-semibold leading-6 text-whiteText/90 max-w-[250px] mt-4">
            High quality bikinis you are wishing for right here.
          </p>
          <LinkButton className="w-44 flex items-center justify-center bg-[#5ec0eb] text-white hover:bg-white hover:text-black duration-200 mt-4" />
        </div>
      </Container>
      <div className="my-6 h-[2px] w-full bg-black" />
    </>
  );
};

export default HomeBanner;