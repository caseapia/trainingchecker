import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import GithubIcon from "@/icons/page-main/github.svg"
import styles from "./Readme.module.scss"

interface ReadmeProps {
  trainingApiLink: React.ReactNode;
  lastUpdate: string;
}

const Readme: FC<ReadmeProps> = ({ trainingApiLink, lastUpdate }) => {
  const [tCommon] = useTranslation("common")

  return (
    <div className={styles.readmeWrapper}>
      <section style={{ textAlign: "center", marginBottom: "1rem" }}>
        <p>
          {tCommon("landing.disclaimer_part1")}{" "}
          <Link href="https://training-server.com/"
            target="_blank"
            rel="noopener noreferrer">
            {tCommon("landing.disclaimer_part2")}
          </Link>{" "}
          {tCommon("landing.disclaimer_part3")} {trainingApiLink} {tCommon("landing.disclaimer_part4")}
        </p>
      </section>
      <section style={{ marginBottom: "1rem" }}>
        <p>
          {tCommon("landing.purpose")} {trainingApiLink}.
        </p>
      </section>
      <section style={{ marginBottom: "1rem" }}>
        <p>
          {tCommon("landing.open_source_message")}{" "}
          <a
            href="https://github.com/1dontkillme/trainingchecker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon
              width={16}
              height={16}
            /> {tCommon("landing.source_code_link")}
          </a>.
        </p>
      </section>
      <section>
        <p>
          {tCommon("landing.last_update_prefix")}{" "}{lastUpdate}
        </p>
      </section>
    </div>
  );
};

export default Readme;