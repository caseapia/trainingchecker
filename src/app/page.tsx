"use client"
import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BootstrapTooltip from "@/components/Styles/TooltipStyles";
import { toast } from "@/utils/toast";
import styles from "./page.module.scss";
import { getLastCommit } from "@/services/LandingService";

import { Input } from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
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

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const [lastCommit, setLastCommit] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const trainingApiLink = (
    <Link href="https://forum.training-server.com/d/3921-training-api" target="_blank" rel="noopener noreferrer">
      TRAINING API
    </Link>
  );

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        const response = await getLastCommit();
        setLastUpdate(new Date(response.commit.author.date).toLocaleDateString("ru-RU", dateOptions));
        setLastCommit(response.commit.message);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastCommit();
  }, []);

  const validateInput = () => {
    const input = inputRef.current?.value || "";
    const hasCyrillic = /[а-яА-ЯёЁ]/.test(input);

    if (hasCyrillic) {
      toast.error("Никнейм не может содержать кириллицу", { lifeTime: 4000 });
      inputRef.current!.value = "";
      setIsButtonDisabled(true);
    } else if (input.trim() === "") {
      toast.error("Поле никнейма не может быть пустым", { lifeTime: 4000 });
      setIsButtonDisabled(true);
    } else {
      toast.clear();
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nickname = inputRef.current?.value.trim();

    if (!nickname) {
      toast.error("Вы не заполнили поле никнейма", { lifeTime: 4000 });
      setIsButtonDisabled(true);
      return;
    }

    setIsButtonLoading(true);
    router.push(`/player?nickname=${encodeURIComponent(nickname)}`);
  };

  return (
    <Suspense fallback={<LandingLoader/>}>
      <PageWrapper classname={styles.gapped}>
        {isLoaded ? (
          <>
            <div className={styles.readmeWrapper}>
              <section style={{ textAlign: "center", marginBottom: "1rem" }}>
                <p>
                  SAMP сервер{" "}
                  <Link href="https://training-server.com/" target="_blank" rel="noopener noreferrer">
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
                    <GithubIcon width={16} height={16}/> исходный код на GitHub
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
              onSubmit={handleSubmit}
              method="get"
              className={styles.FormContainer}
              ref={formRef}
            >
              <Input
                icon={UserIcon}
                label="Введите никнейм игрока"
                type="text"
                name="nickname"
                ref={inputRef}
                onChange={validateInput}
                required
                marginBottom={7}
              />
              <Button
                type="Primary"
                action="submit"
                icon={UserSearchIcon}
                ref={null}
                disabled={isButtonDisabled}
                isLoading={isButtonLoading}
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
