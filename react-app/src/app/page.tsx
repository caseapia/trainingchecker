"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Input } from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import { FaUser } from "react-icons/fa";

export default function Home() {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [readme, setReadme] = useState<string>('');
  useEffect(() => {
    const commits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/caseapia/trainingchecker/commits`, {
          headers: {
            'Authorization': `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`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cmts = await response.json();
        console.debug(cmts);

        if (Array.isArray(cmts) && cmts.length > 0) {
          const lastcmtday = cmts[0].commit.committer.date;
          console.debug('Last commit date:', lastcmtday);
          const lastUpdate = new Date(lastcmtday).toLocaleString();
          setLastUpdate(lastUpdate);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const readme = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/caseapia/trainingchecker/contents/README.md`, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching the README file: ${response.statusText}`);
        }

        const content: { content: string; encoding: string } = await response.json();
        const decodedContent = content.encoding === "base64"
        ? new TextDecoder("utf-8").decode(Uint8Array.from(atob(content.content), c => c.charCodeAt(0)))
        : content.content;
        setReadme(decodedContent);
      } catch (error) {
          console.error(error);
      }
    }

    commits();
    readme();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.readmeWrapper}>
        <p dangerouslySetInnerHTML={{ __html: readme }} />
        <p>Последнее обновление произошло: {lastUpdate}</p>
      </div>
      <form action="" className={styles.FormContainer}>
        <Input label="Введите никнейм игрока" type="text" />
        <Button btnType="Danger" text="XUI" type="button" icon={ <FaUser/> } />
      </form>
    </div>
  );
}
