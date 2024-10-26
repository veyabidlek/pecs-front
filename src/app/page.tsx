// src/app/page.tsx
import { HomeHero } from "./components/home/homeHero";
import { AboutApp } from "./components/home/aboutApp";
import { Advantages } from "./components/home/advantages";
import { Solutions } from "./components/home/solutions";
import { Team } from "./components/home/team";
import Navbar from "./components/navBar";

export default function HomePage() {
  return (
    <main className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      {" "}
      {/* Centering styles */}
      <Navbar />
      <HomeHero />
      <AboutApp />
      <Advantages />
      <Solutions />
      <Team />
    </main>
  );
}
