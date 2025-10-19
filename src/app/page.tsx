"use client"
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useTranslation } from "react-i18next";
import Readme from "@/modules/readme/Readme";

export default function Home() {
  const router = useRouter();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [tCommon] = useTranslation("common");
  const [tErrors] = useTranslation("errors");

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
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastCommit();
  }, []);

  const onSubmit = async ({ nickname }: FormValues) => {
    setLoading(true);

    const nicknames = ["vibe.czo.ooo"]

    if (nicknames.includes(nickname)) {
      router.push('/player?nickname=czo.ooo')
      return
    }

    router.push(`/player?nickname=${encodeURIComponent(nickname.trim())}`);
  };


  const validationSchema = z.object({
    nickname: z
      .string()
      .min(1, tCommon("inputLabel"))
      .regex(/^[a-z._0-9]+$/i, tErrors("error_symbols"))
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
            <Readme
              trainingApiLink={trainingApiLink}
              lastUpdate={lastUpdate}
            />

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
                    label={tCommon("inputLabel")}
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
                {tCommon("buttonLabel")}
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
