"use client"
import React, { Suspense } from "react"
import PageWrapper from "@/shared/layouts/pageWrapper/PageWrapper";
import Badges from "@/app/badges/widgets/badges/badges";
import { useTranslation } from "react-i18next";

const page = () => {
  const [tBadges] = useTranslation("badges");

  return (
    <Suspense>
      <PageWrapper title={tBadges("title")}>
        <Badges />
      </PageWrapper>
    </Suspense>
  )
}

export default page