"use client";
import React from "react";
import PageWrapper from "@/shared/layouts/pageWrapper/PageWrapper";
import { useTranslation } from "react-i18next";
import { useAdminList } from "@/app/admins/components/shared/hooks/useAdminList";
import AdminTable from "@/app/admins/widgets/admin/AdminTable";

const Page = () => {
  const { data, isLoading } = useAdminList();
  const [tCopchase] = useTranslation("admins");

  return (
    <PageWrapper title={tCopchase("title")}>
      <AdminTable
        isLoading={isLoading}
        data={data}
      />
    </PageWrapper>
  );
};

export default Page;