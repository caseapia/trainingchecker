"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Table, Thead, Tr, Td, Th, TBody } from "@/components/Table/Table";
import Loader from "@/modules/Loaders/index";
import { fetchCopchaseLobbies, getStatus } from "@/services/CopchaseService";
import { CopchaseLobbies } from "@/models/Copchase";

const Page = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [chData, setChData] = useState<CopchaseLobbies[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCopchaseLobbies();

      setChData(response.lobbies);
      setLoaded(true);
    }

    fetchData();
  }, [])

  return (
    <PageWrapper title="Мониторинг копчейза">
      <Table>
        {isLoaded ? (
          <>
            <Thead>
              <Tr>
                <Th>Номер</Th>
                <Th>Статус</Th>
                <Th>Время</Th>
                <Th>Рейтинг</Th>
                <Th>Игроков</Th>
              </Tr>
            </Thead>
            <TBody>
              {chData?.map((item: CopchaseLobbies, index: number) => (
                <Tr key={index}>
                  <Td>{item.number}</Td>
                  <Td>{getStatus(chData, item.number)}</Td>
                  <Td>{item.time || "0:00"}</Td>
                  <Td>{item.rating}</Td>
                  <Td>{item.players}</Td>
                </Tr>
              ))}
            </TBody>
          </>
        ) : <Loader type="Table" rows={2} columns={5}/>}
      </Table>
    </PageWrapper>
  );
};

export default Page;