import About from "@/app/components/about";
import Features from "@/app/components/features";
import Footer from "@/app/components/footer";
import Hero from "@/app/components/hero";
import Quote from "@/app/components/quote";
import Report from "@/app/components/report";

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
