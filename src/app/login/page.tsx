"use client"
import React from 'react';
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import styles from './page.module.scss';
import Input from '@/components/Input/Input';
import Button from "@/components/Buttons/Button";

const Page = () => {
 return (
	 <PageWrapper title="Авторизация">
		 <form action="" method='post' className={styles.formContainer}>
			 <Input
				 label="Никнейм"
				 type="text"
			 />
			 <Button type="Primary" action="submit" text="Авторизоваться" />
		 </form>
	 </PageWrapper>
 );
};

export default Page;