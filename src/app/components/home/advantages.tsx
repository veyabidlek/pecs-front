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
    <section className="relative pt-36 inline-block w-full">
      <div className="w-full text-center">
        <h6 className="mx-auto border-2 border-navy-blue inline-block px-5 py-1.5 rounded-full text-navy-blue font-bold">
          Наши преимущества
        </h6>
        <h4 className="mx-auto text-navy-blue font-bold mt-4">
          Преимущества платформы SӨYLEM
        </h4>
      </div>

      <div className="mt-5">
        <table>
          <tbody>
            <tr>
              <td className="py-5 pr-5 pb-12">
                <AdvantageItem
                  bgColor="bg-navy-blue"
                  title="Индивидуальные настройки"
                  description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
                />
              </td>
              <td className="py-5 pr-5 pb-12">
                <AdvantageItem
                  bgColor="bg-primary"
                  title="Реалистичные карточки"
                  description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
                />
              </td>
            </tr>
            <tr>
              <td className="py-5 pr-5 pb-12">
                <AdvantageItem
                  bgColor="bg-light-purple"
                  title="Распознавание и создание речи"
                  description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
                />
              </td>
              <td className="py-5 pr-5 pb-12">
                <AdvantageItem
                  bgColor="bg-orange"
                  title="Отслеживание прогресса"
                  description="Приложение позволяет настраивать карточки под потребности каждого ребенка."
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
