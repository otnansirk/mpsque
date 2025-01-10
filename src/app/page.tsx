import About from "./components/about";
import Features from "./components/features";
import Hero from "./components/hero";
import Quote from "./components/Quote";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Features/>
      <Quote/>
      <About/>
      <div className="p-[200px]"></div>
    </div>
  );
}
