import Hero from "./components/hero";
import Features from "./components/features";
import About from "./components/about";
// import Quote from "./components/quote";
import Report from "./components/report";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Features/>
      <About/>
      {/* <Quote/> */}
      <Report/>
      <Footer/>
    </div>
  );
}
