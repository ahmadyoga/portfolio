"use client";

import { useScrollReveal } from "../motion/useScrollReveal";
import { projects } from "../projects/Projects";
import styles from "./Stack.module.css";

const categories = [
  { label: "Mobile", items: ["Flutter", "Dart", "Kotlin"] },
  { label: "Architecture", items: ["BLoC", "Clean Architecture", "Dependency Injection"] },
  { label: "Backend & Data", items: ["REST API", "Laravel", "Supabase", "PostgreSQL", "SQL"] },
  { label: "Realtime", items: ["WebSocket", "Supabase Realtime"] },
  { label: "Web", items: ["Next.js", "Vue.js", "TypeScript", "JavaScript"] },
  { label: "Tools", items: ["Git", "Firebase", "Gradle"] },
];

function usedIn(item: string): string[] {
  return projects.filter((project) => project.stack.includes(item)).map((project) => project.name);
}

export default function Stack() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: `.${styles.category}` });

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.figLabel} aria-hidden="true">
          FIG.05
        </div>
        <h2 className={styles.heading}>Stack</h2>

        <div className={styles.grid} ref={ref}>
          {categories.map((category) => (
            <div className={styles.category} key={category.label}>
              <div className={styles.categoryLabel}>{category.label}</div>
              <div className={styles.chips}>
                {category.items.map((item) => {
                  const projectNames = usedIn(item);
                  return (
                    <div className={styles.chipWrap} key={item}>
                      <span className={styles.chip}>{item}</span>
                      {projectNames.length > 0 && (
                        <span className={styles.usedIn}>→ {projectNames.join(", ")}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
