"use client";
import React, {useEffect, useState} from 'react';
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import {Table, Td, TBody, Th, Tr, Thead} from "@/components/Table/Table";
import Loader from "@/modules/Loader/Loader";
import Admins from './types';
import Link from "next/link";
import formatUnixDate from "@/utils/formatUnixDate";

const Page = () => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<Admins[] | null>(null);

  useEffect(() => {
    const getAdmins = async () => {
      const url = process.env.NEXT_PUBLIC_API_ADMINS_URL

      if (!url) {
        return;
      }

      try {
        const r = await fetch(url);

        if (!r.ok) {
          console.error(`HTTP error! status: ${r.status}`);
        }
        const jsonResponse = await r.json();
        console.log(jsonResponse);
        setResult(jsonResponse);
        setLoaded(true);
      } catch (err) {
        console.error(err)
      }
    }

    getAdmins();
  }, []);

  return (
    <PageWrapper title="Список администраторов">
      {isLoaded ? (
        <Table>
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
        </Table>
      ) : <Loader/>}
    </PageWrapper>
  );
};

export default Page;