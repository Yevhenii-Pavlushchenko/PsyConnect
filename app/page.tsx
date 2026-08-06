import HeroSection from "@/components/sections/Home/HeroSection/HeroSection";
import StatsBar from "@/components/sections/Home/StatsBar/StatsBar";
import css from "./page.module.css";

export default function HomePage() {
  return (
    <main className={css.container}>
      <HeroSection />
      <StatsBar />
    </main>
  );
}
