"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import { Table, Thead, Tr, Td, Th, TBody } from "@/components/table/Table";
import Loader from "@/modules/Loaders/index";
import { fetchCopchaseLobbies, getStatus } from "@/services/CopchaseService";
import { Lobbies } from "@/models/Copchase";

const Page = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [chData, setChData] = useState<Lobbies[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCopchaseLobbies();
        setChData(response.lobbies);
        setLoaded(true);
      } catch (error: any) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

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
              {chData?.map((lobby, index) => (
                <Tr key={index}>
                  <Td>{lobby.number}</Td>
                  <Td>{getStatus(chData, lobby.number)}</Td>
                  <Td>{lobby.time || "0:00"}</Td>
                  <Td>{lobby.rating}</Td>
                  <Td>{lobby.players}</Td>
                </Tr>
              ))}
            </TBody>
          </>
        ) : <Loader type="Table"
          rows={2}
          columns={3}/>}
      </Table>
    </PageWrapper>
  );
};

export default Page;