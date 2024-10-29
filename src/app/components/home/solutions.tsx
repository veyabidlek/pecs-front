// src/components/home/Solutions.tsx
import Image from "next/image";

interface SolutionItemProps {
  number: number;
  text: string;
}

function SolutionItem({ number, text }: SolutionItemProps) {
  return (
    <li className="flex mt-4">
      <div className="bg-yellowish w-9 h-9 p-1.5 rounded-full text-center text-white mr-4">
        {number}
      </div>
      <p>{text}</p>
    </li>
  );
}

export function Solutions() {
  return (
    <section className="flex flex-col md:flex-row pt-16 md:pt-24 px-4 md:px-0">
      <div className="w-full md:w-[40%] h-[300px] md:h-[350px] relative flex justify-center mb-8 md:mb-0">
        <Image
          src="/images/index_solution_img.png"
          alt="Solution illustration"
          width={300}
          height={300}
          className="absolute z-10"
        />
        <div className="absolute z-0 bg-yellowish w-[290px] h-[290px] rounded-[40px] transform rotate-[102deg] scale-x-[-1]" />
        <div className="absolute -top-8 z-20 [text-shadow:_-3px_0_white,_0_3px_white,_3px_0_white,_0_-3px_white,_-2px_-2px_white,_-2px_2px_white,_2px_2px_white,_2px_-2px_white] text-yellowish transform rotate-[70deg] scale-x-[-1]">
          {/* <PuzzlePiece size={50} /> */}
        </div>
      </div>

      <div className="w-full md:w-[60%]">
        <h4 className="my-6 text-navy-blue font-bold text-lg md:text-xl">
          Проблемы, которые мы решаем
        </h4>
        <ul className="p-0 space-y-4">
          <SolutionItem
            number={1}
            text="Постоянная необходимость распечатывать новые карточки"
          />
          <SolutionItem number={2} text="Потеря или износ карточек" />
          <SolutionItem
            number={3}
            text="Сложность переноски большого количества карточек"
          />
          <SolutionItem
            number={4}
            text="Запутанность из-за большого количества карточек"
          />
        </ul>
      </div>
    </section>
  );
}
