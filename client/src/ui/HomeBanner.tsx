import { homeBanner } from "../assets";
import Container from "./Container";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
  return (
    <section className="bg-[#f1f9fb]">
      <Container className="py-6 sm:py-9">
        <div className="mb-6 sm:mb-8">
          <p className="text-sm font-bold uppercase text-[#155d70]">
            Charly's Beach Design
          </p>
          <h1 className="mt-2 text-[length:var(--home-hero-title-size)] font-extrabold leading-tight text-black">
            Charly's Bikinis
          </h1>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[length:var(--home-hero-copy-size)] font-medium leading-relaxed text-black">
              High quality bikinis for beach days, pool days, and wherever
              summer takes you.
            </p>
            <LinkButton
              link="/product"
              className="mt-1 flex min-h-12 w-fit items-center justify-center rounded-md bg-[#5ec0eb] px-6 text-black hover:bg-[#4eadd7] hover:text-black duration-200"
            />
          </div>
        </div>
        <img
          src={homeBanner}
          alt="Red and navy bikini designs with the Charly's Beach Design logo"
          className="block h-auto w-full rounded-md"
        />
      </Container>
    </section>
  );
};

export default HomeBanner;