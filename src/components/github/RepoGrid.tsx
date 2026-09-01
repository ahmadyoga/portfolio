"use client";

import { useScrollReveal } from "../motion/useScrollReveal";
import styles from "./GitHub.module.css";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
};

export default function RepoGrid({ repos }: { repos: Repo[] }) {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: `.${styles.repoCard}` });

  return (
    <div className={styles.repoGrid} ref={ref}>
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener"
          className={styles.repoCard}
        >
          <div className={styles.repoName}>{repo.name}</div>
          {repo.description && <p className={styles.repoDesc}>{repo.description}</p>}
          {repo.language && <span className={styles.repoLang}>{repo.language}</span>}
        </a>
      ))}
    </div>
  );
}
