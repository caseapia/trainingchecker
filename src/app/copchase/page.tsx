"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import { Table, TBody, Td, Th, Thead, Tr } from "@/components/table/Table";
import Loader from "@/modules/Loaders/index";
import { fetchCopchaseLobbies, getStatus } from "@/services/CopchaseService";
import { Lobbies } from "@/models/Copchase";
import { useTranslation } from "react-i18next";

const Page = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [chData, setChData] = useState<Lobbies[] | null>(null);
  const [tCopchase] = useTranslation("copchase")

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
    <PageWrapper title={tCopchase("title")}>
      <Table>
        {isLoaded ? (
          <>
            <Thead>
              <Tr>
                <Th>{tCopchase("content.number")}</Th>
                <Th>{tCopchase("content.status")}</Th>
                <Th>{tCopchase("content.time")}</Th>
                <Th>{tCopchase("content.rating")}</Th>
                <Th>{tCopchase("content.players")}</Th>
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