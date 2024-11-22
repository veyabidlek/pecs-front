import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section
      id="homePage"
      className="flex flex-col md:flex-row pt-8 md:pt-16 px-4 sm:px-8 md:px-0"
    >
      <div className="w-full md:w-[45%] md:mr-5 pt-4 md:pt-8 text-center md:text-left">
        <h2 className="font-bold text-primary text-2xl sm:text-3xl md:text-4xl">
          SӨYLEM: ваш помощник в терапии РАС
        </h2>
        <p className="mt-4 md:mt-5 text-sm sm:text-base md:text-lg">
          Начните использовать SӨYLEM и улучшите коммуникацию вашего ребенка
          сегодня!
        </p>
        <Link
          href="/signup"
          className="inline-block mt-6 px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Попробовать бесплатно
        </Link>
      </div>

      {/* Image container */}
      <div className="relative w-full md:flex-1 h-[300px] sm:h-[400px] md:h-[550px] mt-8 md:mt-0 flex justify-center md:justify-end">
        <Image
          src="/images/kidonhomepage.png"
          alt="Home illustration"
          width={560} // Adjust width for small screens
          height={560} // Adjust height for small screens
          className="md:absolute md:top-1/2 md:-translate-y-1/2 z-10"
        />
      </div>
    </section>
  );
}
