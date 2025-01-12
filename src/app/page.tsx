import Hero from "@/app/components/hero";
import Features from "@/app/components/features";
import About from "@/app/components/about";
import Quote from "@/app/components/quote";
import Report from "@/app/components/report";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Features/>
      <About/>
      <Quote/>
      <Report/>
      <Footer/>
    </div>
  );
}
