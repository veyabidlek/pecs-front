import Image from "next/image";

export function Team() {
  return (
    <section
      id="team"
      className="flex flex-col md:flex-row  pt-16 md:pt-36 px-4 md:px-0"
    >
      <div className="pt-16 lg:pt-36 lg:mr-36 md:w-[60%] lg:w-[55%]">
        <h4 className="text-lg md:text-xl font-bold text-[#2B5C34] mb-4">
          {`О нас`}
        </h4>
        <p className="mb-4">
          {`Мы - команда предпринимателей, инженеров и исследователей, посвятивших
          себя созданию инновационных решений для улучшения жизни детей с
          расстройствами аутистического спектра (РАС).`}
        </p>
        <p className="mb-4">
          {`Наша миссия - сделать коммуникацию и обучение детей с РАС более
          доступными и эффективными, используя современные технологии и
          индивидуальный подход.`}
        </p>
        <p className="mb-8">
          {`Мы гордимся тем, что были удостоены звания финалистов в конкурсе
          "Social Impact 2023", организованном Фондом социального развития
          Назарбаев Университета. Это признание подчеркивает наш вклад в
          социальное развитие и подтверждает важность нашего проекта.`}
        </p>
      </div>

      {/* Images section */}
      <div className="flex flex-col  mt-8 md:mt-0 md:ml-8 md:w-[40%] lg:w-[45%]">
        <Image
          src="/images/index_team1.png"
          alt="Team photo 1"
          width={350}
          height={268}
          className="rounded-3xl mb-4"
          priority
        />
        <Image
          src="/images/index_team2.png"
          alt="Team photo 2"
          width={350}
          height={260}
          className="rounded-3xl"
          priority
        />
      </div>
    </section>
  );
}

export default Team;
