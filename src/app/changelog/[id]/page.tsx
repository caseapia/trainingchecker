"use client"
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import React, { useEffect, useState } from 'react';
import changeLog from '@/shared/consts/changelog';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import ReactMarkdown from 'react-markdown';
import Button from '@/components/Buttons/Button';
import circleArrowLeft from '@/icons/changelog/[id]/circleArrowLeft.svg';
import { toast } from '@/utils/toast';
import Loader from '@/modules/Loader/Loader';

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const filteredNews = changeLog.filter((log) => log.route === id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_NEWS_URL}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 500) {
        toast.error(`Ошибка отправки запроса к GitHub. Отправляем новый запрос`, { title: "Ошибка", lifeTime: 5000 } )
        return;
      }

      const files: Array<{ name: string; download_url: string }> = await response.json();
      const markdownFiles = files.filter((file) => filteredNews.some((log) => file.name === `${log.route}.md`));

      for (const file of markdownFiles) {
        const fileResponse = await fetch(file.download_url);

        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch file: ${file.name}, status: ${fileResponse.status}`);
        }

        const text = await fileResponse.text();
        setContent(text);
        break;
      }
      setIsLoaded(true);
    }
    fetchData();
  })

  useEffect(() => {
    if (!filteredNews.length) {
      window.location.href = "../not-found";
    }
  }, [filteredNews])

  return isLoaded ? (
    <PageWrapper classname={styles.NewWrapper}>
      <h1 className={styles.title}>
        <Button 
          action="button" 
          type="Secondary" 
          text="Вернуться" 
          icon={circleArrowLeft} 
          onClick={() => history.back()}
        />
        {filteredNews.map((log): string => {
          return `${log.title}`;
        })}
      </h1>
      <div className={styles.newsWrapper}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </PageWrapper>
  ) : (
    <Loader />
  )
}

export default page