import Image from "next/image";

export function Team() {
  return (
    <section id="team" className="flex mb-12 pt-36">
      <div className="w-[45%] my-auto">
        <h4 className="text-xl font-bold text-[#2B5C34]">О нас</h4>
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
        <p>
          {`Мы гордимся тем, что были удостоены звания финалистов в конкурсе
          "Social Impact 2023", организованном Фондом социального развития
          Назарбаев Университета. Это признание подчеркивает наш вклад в
          социальное развитие и подтверждает важность нашего проекта.`}
        </p>
      </div>

      <div className="relative px-24 h-[550px]">
        <div className="relative">
          {/* First image group */}
          <div className="absolute bg-[#1B365D] w-[350px] h-[268px] transform -rotate-10 scale-x-[-1] rounded-3xl" />
          <div className="relative z-10">
            <Image
              src="/images/index_team1.png"
              alt="Team photo 1"
              width={350}
              height={268}
              className="rounded-3xl"
              priority
            />
          </div>

          {/* Second image group */}
          <div className="absolute bg-[#2B5C34] w-[350px] h-[350px] top-[253px] left-[297px] rounded-3xl" />
          <div className="absolute top-60 left-[280px] z-10">
            <Image
              src="/images/index_team2.png"
              alt="Team photo 2"
              width={350}
              height={350}
              className="rounded-3xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
