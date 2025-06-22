"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import { Table, TBody, Td, Th, Thead, Tr } from "@/components/table/Table";
import Link from "next/link";
import formatUnixDate from "@/utils/helpers/formatUnixDate";
import AdminList from "@/services/AdminService";
import Admin from "@/models/Admin";
import Loader from "@/modules/Loaders/index";
import { useTranslation } from "react-i18next";

const Page = () => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<Admin[] | null>(null);
  const [tCopchase] = useTranslation("admins");

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await AdminList();

        setResult(response);
        setLoaded(true);
      } catch (err) {
        console.error(err)
      }
    }

    getAdmins();
  }, []);

  return (
    <PageWrapper title={tCopchase("title")}>
      <Table>
        {isLoaded ? (
          <>
            <Thead>
              <Th>{tCopchase("content_id")}</Th>
              <Th>{tCopchase("content_nickname")}</Th>
              <Th>{tCopchase("content_lastConnect")}</Th>
              <Th>{tCopchase("content_warnsIssued")}</Th>
            </Thead>
            <TBody>
              {result?.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td><Link href={`/player?nickname=${item.login}`}>{item.login}</Link></Td>
                    <Td>{formatUnixDate(item.lastLogin)}</Td>
                    <Td>{item.warn}</Td>
                  </Tr>
                );
              })}
            </TBody>
          </>
        ) : <Loader type="Table"
          rows={4}
          columns={4}/>}
      </Table>
    </PageWrapper>
  );
};

export default Page;