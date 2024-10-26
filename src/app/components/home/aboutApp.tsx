import Image from "next/image";

export function AboutApp() {
  return (
    <section id="aboutApp" className="pt-24">
      <div className="flex">
        <div className="w-[35%] my-auto">
          <h6 className="inline-block px-5 py-1.5 border-2 border-primary rounded-full text-primary font-bold">
            О платформе
          </h6>
          <h4 className="my-8 text-primary font-bold text-2xl">
            PECS Образование в новом формате
          </h4>
          <p className="mb-4">
            Наша платформа SӨYLEM предлагает современное решение для улучшения
            коммуникации детей с расстройствами аутистического спектра (РАС).
          </p>
          <p>
            Используя популярную систему карточек ПЕКС, мы переносим все
            преимущества в цифровую форму, устраняя недостатки традиционных
            бумажных карточек.
          </p>
        </div>

        <div className="relative px-8 h-[650px] flex-1 ml-24">
          <Image
            src="/images/index_aboutApp_tablet.png"
            alt="App tablet view"
            width={900}
            height={700}
            className="absolute top-[200px] right-0 z-10 w-auto h-auto"
          />

          <div className="absolute h-[70%] w-5 rounded-xl bg-light-blue right-[30%] top-[25%] z-20" />
          <div className="absolute h-[70%] w-5 rounded-xl bg-yellowish right-[60%] top-[35%] z-20" />

          {/* Cards */}
          <div className="absolute top-[55%] right-[50%] w-[150px] h-[200px] text-center bg-white/80 backdrop-blur-md rounded-lg z-20 shadow-lg">
            <Image
              src="/images/cat_card.png"
              alt="Cat"
              width={140}
              height={140}
              className="mx-auto my-6"
            />
            <label className="font-bold text-lg">мысық</label>
          </div>

          <div className="absolute right-[20%] top-[35%] w-[150px] h-[250px] text-center bg-white/80 backdrop-blur-md rounded-lg z-20 shadow-lg">
            <Image
              src="/images/dress_card.png"
              alt="Dress"
              width={140}
              height={140}
              className="mx-auto my-6"
            />
            <label className="font-bold text-lg">көйлек</label>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="inline-block px-8 py-3 border-2 border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
          Наши преимущества
        </button>
      </div>
    </section>
  );
}
