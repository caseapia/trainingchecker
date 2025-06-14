"use client"
import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BootstrapTooltip from "@/components/styles/TooltipStyles";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./page.module.scss";
import { getLastCommit } from "@/services/LandingService";

import { Input } from "@/components/input/Input";
import Button from "@/components/button/Button";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import LandingLoader from "@/modules/Loaders/LandingLoader";

import UserSearchIcon from "@/icons/page-main/userSearch.svg";
import UserIcon from "@/icons/user.svg";
import GithubIcon from "@/icons/page-main/github.svg";

export default function Home() {
  const router = useRouter();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [lastCommit, setLastCommit] = useState<string>("");
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const trainingApiLink = (
    <Link href="https://forum.training-server.com/d/3921-training-api"
      target="_blank"
      rel="noopener noreferrer">
      TRAINING API
    </Link>
  );

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        const response = await getLastCommit();

        setLastUpdate(new Date(response.commit.author.date).toLocaleDateString("ru-RU", dateOptions));
        setLastCommit(response.commit.message);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastCommit();
  }, []);

  const onSubmit = async ({ nickname }: FormValues) => {
    setLoading(true);
    router.push(`/player?nickname=${encodeURIComponent(nickname.trim())}`);
  };


  const validationSchema = z.object({
    nickname: z
      .string()
      .min(1, "Введите никнейм")
      .regex(/^[a-z._0-9]+$/i, "Эти символы запрещены для ввода")
  });

  type FormValues = z.infer<typeof validationSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: { nickname: "" }
  })

  const nicknameValue = watch("nickname");

  return (
    <Suspense fallback={<LandingLoader/>}>
      <PageWrapper classname={styles.gapped}>
        {isLoaded ? (
          <>
            <div className={styles.readmeWrapper}>
              <section style={{ textAlign: "center", marginBottom: "1rem" }}>
                <p>
                  SAMP сервер{" "}
                  <Link href="https://training-server.com/"
                    target="_blank"
                    rel="noopener noreferrer">
                    TRAINING
                  </Link>{" "}
                  не имеет отношения к созданию данного сайта. Этот сайт является частным и
                  использует {trainingApiLink} с разрешения его создателя.
                </p>
              </section>
              <section style={{ marginBottom: "1rem" }}>
                <p>Разработано для упрощения работы с {trainingApiLink}.</p>
              </section>
              <section style={{ marginBottom: "1rem" }}>
                <p>
                  Этот проект имеет открытый исходный код. Вы можете дополнить или исправить его через{" "}
                  <a
                    href="https://github.com/1dontkillme/trainingchecker"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon width={16}
                      height={16}/> исходный код на GitHub
                  </a>.
                </p>
              </section>
              <section>
                <p>
                  Последнее обновление было{" "}
                  <BootstrapTooltip title={lastCommit}>
                    <span className={styles.lastUpdate}>{lastUpdate}</span>
                  </BootstrapTooltip>
                </p>
              </section>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              method="get"
              className={styles.FormContainer}
              ref={formRef}
            >
              <Controller
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    icon={UserIcon}
                    label="Введите никнейм игрока"
                    type="text"
                    ref={inputRef}
                    required
                    disabled={isLoading}
                    marginBottom={7}
                    error={errors.nickname}
                  />
                )}
                name="nickname"
              />
              <Button
                type="Primary"
                action="submit"
                icon={UserSearchIcon}
                ref={null}
                isLoading={isLoading}
                disabled={!nicknameValue?.trim() || !!errors.nickname || isLoading}
              >
                Проверить
              </Button>
            </form>
          </>
        ) : (
          <LandingLoader/>
        )}
      </PageWrapper>
    </Suspense>
  );
}
