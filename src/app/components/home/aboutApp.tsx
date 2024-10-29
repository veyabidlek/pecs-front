import Image from "next/image";

export function AboutApp() {
  return (
    <section id="aboutApp" className="pt-16 md:pt-24">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[35%] my-auto px-4 md:px-0 text-center md:text-left">
          <h6 className="inline-block px-5 py-1.5 border-2 border-primary rounded-full text-primary font-bold">
            О платформе
          </h6>
          <h4 className="my-6 md:my-8 text-primary font-bold text-xl md:text-2xl">
            PECS Образование в новом формате
          </h4>
          <p className="mb-4">
            Наша платформа SӨYLEM предлагает современное решение для улучшения
            коммуникации детей с расстройствами аутистического спектра (РАС).
          </p>
          <p className="mb-8 md:mb-0">
            Используя популярную систему карточек ПЕКС, мы переносим все
            преимущества в цифровую форму, устраняя недостатки традиционных
            бумажных карточек.
          </p>
        </div>

        {/* Image container */}
        <div className="relative w-full md:flex-1 h-[300px] sm:h-[400px] md:h-[650px] mt-8 md:mt-0 flex justify-center md:justify-end px-4 md:px-8">
          <Image
            src="/images/index_aboutApp_tablet.png"
            alt="App tablet view"
            width={900}
            height={700}
            className="md:absolute md:top-[200px] md:right-0 z-10 w-auto h-auto scale-75 md:scale-100"
          />
        </div>
      </div>
    </section>
  );
}
