import RepoGrid from "./RepoGrid";
import styles from "./GitHub.module.css";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  pushed_at: string;
};

async function getRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch("https://api.github.com/users/ahmadyoga/repos?per_page=100", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;

    const data: Repo[] = await res.json();
    return data
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 6);
  } catch {
    return null;
  }
}

export default async function GitHub() {
  const repos = await getRepos();

  return (
    <section id="github" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.figLabel} aria-hidden="true">
          FIG.06
        </div>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>GitHub</h2>
          <a
            href="https://github.com/ahmadyoga"
            target="_blank"
            rel="noopener"
            className={styles.profileLink}
          >
            github.com/ahmadyoga ↗
          </a>
        </div>

        {repos && repos.length > 0 ? (
          <RepoGrid repos={repos} />
        ) : (
          <p className={styles.fallback}>
            Repositories are best viewed directly on{" "}
            <a href="https://github.com/ahmadyoga" target="_blank" rel="noopener">
              github.com/ahmadyoga ↗
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
