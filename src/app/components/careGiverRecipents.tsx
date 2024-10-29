import { Recipient } from "../types/index";

interface CaregiverRecipientsProps {
  recipients?: Recipient[] | null;
}

export function CaregiverRecipients({
  recipients = [],
}: CaregiverRecipientsProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const hasRecipients = recipients?.length > 0;

  return (
    <div className="flex border border-[#D9D9D9] rounded p-2.5">
      {hasRecipients ? (
        <table className="w-full border-collapse font-sans">
          <thead>
            <tr>
              <th className="border border-[#dddddd] text-left p-2">Имя</th>
              <th className="border border-[#dddddd] text-left p-2">Фамилия</th>
              <th className="border border-[#dddddd] text-left p-2">
                Имя пользователя
              </th>
            </tr>
          </thead>
          <tbody>
            {recipients?.map((recipient, index) => (
              <tr
                key={recipient.user.username}
                className={index % 2 === 1 ? "bg-[#dddddd]" : ""}
              >
                <td className="border border-[#dddddd] p-2">
                  {recipient.user.first_name}
                </td>
                <td className="border border-[#dddddd] p-2">
                  {recipient.user.last_name}
                </td>
                <td className="border border-[#dddddd] p-2">
                  {recipient.user.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="text-lg">У вас пока нет опекунов</h5>
      )}
    </div>
  );
}
