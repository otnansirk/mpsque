import About from "./components/about";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Quote from "./components/Quote";
import Report from "./components/report";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Features/>
      <Quote/>
      <About/>
      <Report/>
      <Footer/>
    </div>
  );
}
