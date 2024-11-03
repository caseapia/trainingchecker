"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Input } from "@/components/Input/Input";

export default function Home() {
  const [lastUpdate, setLastUpdate] = useState<string>('');
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

    commits();
  }, []);

  return (
    <div className={styles.container}>
      <Input label="xui" type="text" />
    </div>
  );
}
