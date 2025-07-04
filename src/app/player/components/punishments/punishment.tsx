import React, { FC } from "react";
import { Modal } from "@/components/modal/Modal";
import Types from "@/app/player/components/punishments/types";
import { Table, TBody, Td, Th, Thead, Tr } from "@/components/table/Table";
import Link from "next/link";
import CopyIcon from "@/icons/copy.svg";
import CheckIcon from "@/icons/checkCircle.svg";
import { toast } from "@/utils/toast";
import { useTranslation } from "react-i18next";

const Punishment: FC<Types> = ({ id, login, warns, statusAction, status }) => {
  const [tPunishment] = useTranslation("punishments");
  const [tErrors] = useTranslation("errors");

  const copyPunishments = async () => {
    if (!warns.length) {
      toast.error(tErrors("error_playerHasNoPunishments", { nickname: login }));
      return;
    }

    const punishmentsText = warns
      .map(warn => `${warn.admin} // ${warn.reason} // ${warn.bantime}`)
      .join(";\n");

    try {
      await navigator.clipboard.writeText(tPunishment("list.text", {
        nickname: login,
        id: id,
        punishments: punishmentsText,
        length: warns.length
      }));
      toast.success(tPunishment("list.copied", { nickname: login }), { isByModal: true });
    } catch (error) {
      console.error(error);
      toast.error(tErrors("error_unexpectedCopyError"));
    }
  };

  return status && (
    <Modal
      isOpen={status}
      onClose={() => statusAction(false)}
      title={`${tPunishment("title")} ${login} (${id})`}
      firstButtonContent={tPunishment("button.copy")}
      firstButtonIcon={CopyIcon}
      firstButtonAction={copyPunishments}
      secondButtonContent={tPunishment("button.close")}
      secondButtonIcon={CheckIcon}
      secondButtonAction={() => statusAction(false)}
    >
      <Table width={100}>
        <Thead>
          <Tr>
            <Th>{tPunishment("content.admin")}</Th>
            <Th>{tPunishment("content.reason")}</Th>
            <Th>{tPunishment("content.date")}</Th>
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