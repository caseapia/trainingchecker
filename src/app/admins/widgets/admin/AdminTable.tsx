import React from "react";
import Link from "next/link";
import formatUnixDate from "@/utils/helpers/formatUnixDate";
import Admin from "@/shared/models/Admin";
import { Table, TBody, Td, Th, Thead, Tr } from "@/shared/components/ui/table/Table";
import Loader from "@/widgets/Loaders/index";
import { useTranslation } from "react-i18next";

interface AdminTableProps {
  isLoading: boolean;
  data: Admin[] | null;
}

const AdminTable: React.FC<AdminTableProps> = ({ isLoading, data }) => {
  const [tCopchase] = useTranslation("admins");

  if (isLoading) {
    return (
      <Table>
        <Loader type="Table" rows={4} columns={4} />
      </Table>
    );
  }

  if (!data) return null;

  return (
    <Table>
      <Thead>
        <Th>{tCopchase("content.id")}</Th>
        <Th>{tCopchase("content.nickname")}</Th>
        <Th>{tCopchase("content.lastConnect")}</Th>
        <Th>{tCopchase("content.warnsIssued")}</Th>
      </Thead>
      <TBody>
        {data.map((item, index) => (
          <Tr key={item.id || index}>
            <Td>{item.id}</Td>
            <Td>
              <Link href={`/player?nickname=${item.login}`}>{item.login}</Link>
            </Td>
            <Td>{formatUnixDate(item.lastLogin)}</Td>
            <Td>{item.warn}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default AdminTable;