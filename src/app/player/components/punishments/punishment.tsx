import React, { FC } from "react";
import { Modal } from "@/components/modal/Modal";
import Types from "@/app/player/components/punishments/types";
import { Table, TBody, Td, Th, Thead, Tr } from "@/components/table/Table";
import Link from "next/link";
import CopyIcon from "@/icons/copy.svg";
import CheckIcon from "@/icons/checkCircle.svg";
import { toast } from "@/utils/toast";

const Punishment: FC<Types> = ({ id, login, warns, statusAction, status }) => {

  const copyPunishments = async () => {
    if (!warns.length) {
      toast.error(`У игрока ${login} нет наказаний.`);
      return;
    }

    const punishmentsText = warns
      .map(warn => `${warn.admin} // ${warn.reason} // ${warn.bantime}`)
      .join(";\n");

    try {
      await navigator.clipboard.writeText(
        `Список наказаний ${login} (${id})\n\n${punishmentsText}\n\nВсего наказаний: ${warns.length}`
      );
      toast.success(`Наказания игрока ${login} скопированы в буфер обмена`, { isByModal: true });
    } catch (error) {
      console.error(error);
      toast.error("Не удалось скопировать в буфер обмена.");
    }
  };

  return (
    <Modal
      isOpen={status}
      onClose={() => statusAction(false)}
      title={`Список наказаний ${login} (${id})`}
      firstButtonContent="Скопировать"
      firstButtonIcon={CopyIcon}
      firstButtonAction={copyPunishments}
      secondButtonContent="Закрыть"
      secondButtonIcon={CheckIcon}
      secondButtonAction={() => statusAction(false)}
    >
      <Table width={100}>
        <Thead>
          <Tr>
            <Th>Администратор</Th>
            <Th>Причина</Th>
            <Th>Дата</Th>
          </Tr>
        </Thead>
        <TBody>
          {warns.map((punish, idx) => (
            <Tr key={idx}>
              <Td>
                <Link
                  href={`?nickname=${punish.admin}`}
                  onClick={() => statusAction(false)}
                >
                  {punish.admin}
                </Link>
              </Td>
              <Td>{punish.reason}</Td>
              <Td>{new Date(punish.bantime).toLocaleString()}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Modal>
  );
};

export default Punishment;