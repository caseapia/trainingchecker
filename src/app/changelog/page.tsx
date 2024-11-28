"use client"
import { Table, Tr, Td, Thead, TBody, Th } from '@/components/Table/Table';
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Lottie from 'lottie-react';
import Preloader from '@/public/assets/lotties/Preloader.json';

type Commit = {
  sha: string;
  author: string;
  message: string;
  date: string;
  url: string;
  author_url: string;
}

const changelog = () => {
  const [commitData, setCommitData] = useState<Commit[]>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const cutOffDate = new Date("2024-11-28T16:59:35Z");

  useEffect(() => {
    const getCommits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/caseapia/trainingchecker/commits`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        if (data && data.length > 0) {
          const formattedData = data
          .filter((commit: any) => {
            const commitDate = new Date(commit.commit?.author?.date);
            return commitDate > cutOffDate;
          })
          .map((commit: any) => ({
            sha: commit?.sha ?? "Н/Д",
            author: commit?.commit?.author?.name ?? "Н/Д",
            message: commit?.commit?.message ?? "Н/Д",
            date: commit?.commit?.author?.date
              ? new Date(commit.commit.author.date).toLocaleString()
              : "N/A",
            url: commit?.html_url ?? "#",
            author_url: commit?.author?.html_url,
          }));
          setCommitData(formattedData);
          setIsLoaded(true);
        } else {
        }
      } catch (err) {
        console.error('Error fetching commits:', err);
      }
    }
    getCommits();
  }, [])
  return isLoaded ? (
    <div className={styles.PageWrapper}>
      {commitData ? (
        <>
          <h1>Список изменений</h1>
          <Table>
            <Thead>
              <Tr>
                <Th>SHA-код</Th>
                <Th>Автор</Th>
                <Th>Изменения</Th>
                <Th>Дата</Th>
              </Tr>
            </Thead>
            <TBody>
              {commitData.map((commit, index) => (
                <Tr key={index}>
                  <Td><a href={commit.url} target='_blank'>{commit.sha}</a></Td>
                  <Td><a href={commit.author_url} target='_blank'>{commit.author === '1dontkillme' ? 'caseapia' : `${commit.author}`}</a></Td>
                  <Td>{commit.message}</Td>
                  <Td>{commit.date}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </>
      ) : null}
    </div>
  ) : (
    <div className={styles.PageWrapper}>
      <Lottie animationData={Preloader} />
    </div>
  )
}

export default changelog;