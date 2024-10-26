import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section id="homePage" className="flex pt-16 container mx-auto">
      <div className="w-[45%] mr-5 pt-8">
        <h2 className="font-bold text-primary text-4xl">
          SӨYLEM: ваш помощник в терапии РАС
        </h2>
        <p className="mt-5 text-lg">
          Начните использовать SӨYLEM и улучшите коммуникацию вашего ребенка
          сегодня!
        </p>
        <Link
          href="/signup"
          className="inline-block mt-6 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Попробовать бесплатно
        </Link>
      </div>

      <div className="relative flex-1 h-[550px]">
        {/* Large circle background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-light-blue" />

        {/* Border circle */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-text rounded-full z-[1]" />

        {/* Main image */}
        <Image
          src="/images/index_homePage.png"
          alt="Home illustration"
          width={380}
          height={500}
          className="absolute right-16 top-1/2 -translate-y-1/2 z-10"
        />

        {/* Car card */}
        <div className="absolute bottom-36 right-[340px] w-[110px] h-[130px] text-center bg-white/40 backdrop-blur-md rounded-lg z-20 shadow-lg p-3">
          <Image
            src="/images/car_card.png"
            alt="Car"
            width={70}
            height={70}
            className="mx-auto mb-2"
          />
          <label className="font-medium text-sm">көлік</label>
        </div>

        {/* Carrot card */}
        <div className="absolute top-28 right-0 w-[110px] h-[130px] text-center bg-white/40 backdrop-blur-md rounded-lg z-20 shadow-lg p-3">
          <Image
            src="/images/carrot_card.png"
            alt="Carrot"
            width={70}
            height={70}
            className="mx-auto mb-2"
          />
          <label className="font-medium text-sm">сәбіз</label>
        </div>
      </div>
    </section>
  );
}
