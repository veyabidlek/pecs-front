// src/components/home/Advantages.tsx
import { Wrench } from "lucide-react";

interface AdvantageItemProps {
  bgColor: string;
  title: string;
  description: string;
}

function AdvantageItem({ bgColor, title, description }: AdvantageItemProps) {
  return (
    <div className="flex items-center">
      <div className="mr-8">
        <div className={`${bgColor} p-4 rounded-full`}>
          <Wrench className="text-white w-5 h-5" />
        </div>
      </div>
      <div>
        <h5 className="font-bold">{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function Advantages() {
  return (
    <section className="relative pt-16 md:pt-36 px-4 md:px-0">
      <div className="w-full text-center">
        <h6 className="mx-auto border-2 border-navy-blue inline-block px-5 py-1.5 rounded-full text-navy-blue font-bold">
          Наши преимущества
        </h6>
        <h4 className="mx-auto text-navy-blue font-bold mt-4 text-lg md:text-xl">
          Преимущества платформы SӨYLEM
        </h4>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdvantageItem
          bgColor="bg-navy-blue"
          title="Индивидуальные настройки"
          description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
        />
        <AdvantageItem
          bgColor="bg-primary"
          title="Реалистичные карточки"
          description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
        />
        <AdvantageItem
          bgColor="bg-light-purple"
          title="Распознавание и создание речи"
          description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
        />
        <AdvantageItem
          bgColor="bg-orange"
          title="Отслеживание прогресса"
          description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
        />
      </div>
    </section>
  );
}
