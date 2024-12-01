"use client"
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import React, { useEffect, useState } from 'react';
import changeLog from '@/shared/consts/changelog';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import Lottie from 'lottie-react';
import Preloader from '@/public/assets/lotties/Preloader.json';

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const filteredNews = changeLog.filter((log) => log.id === id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_NEWS_URL}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const files: Array<{ name: string; download_url: string }> = await response.json();
      const markdownFiles = files.filter((file) => filteredNews.some((log) => file.name.includes(log.id)));

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
  })

  useEffect(() => {
    if (!filteredNews.length) {
      router.push('../');
    }
  }, [filteredNews])

  return isLoaded ? (
    <PageWrapper classname={styles.NewWrapper}>
      {filteredNews.map((news, idx) => {
        return (
          <div className={styles.newsWrapper} key={idx}>
            <section className={styles.headWrapper}>
              <h1>{news.title}</h1>
              Автор: {news.author}
            </section>
            <section className={styles.newsBody}>
            {news.content.map((item, idx) => (
              <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
            </section>
          </div>
        )
      })}
    </PageWrapper>
  ) : (
    <PageWrapper>
      <Lottie animationData={Preloader} />
    </PageWrapper>
  )
}

export default page