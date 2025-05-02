"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Table, Td, TBody, Th, Tr, Thead } from "@/components/Table/Table";
import Link from "next/link";
import formatUnixDate from "@/utils/helpers/formatUnixDate";
import AdminList from "@/services/AdminService";
import Admin from "@/models/Admin";
import Loader from "@/modules/Loaders/index";

const Page = () => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<Admin[] | null>(null);

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
    <PageWrapper title="Список администраторов">
      <Table>
        {isLoaded ? (
          <>
            <Thead>
              <Th>ID</Th>
              <Th>Никнейм</Th>
              <Th>Последний вход</Th>
              <Th>Выдано варнов</Th>
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
        ) : <Loader type="Table" rows={4} columns={4}/>}
      </Table>
    </PageWrapper>
  );
};

export default Page;