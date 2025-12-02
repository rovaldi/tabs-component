import { Tabs } from './components/Tabs';
import { pillTabs, underlineTabs, pillPanels, underlinePanels } from './mockData';
import styles from './App.module.scss';

export const App = () => (
  <>
    <header className={styles.header}>
      <h1 className={styles.header__title}>Tab Component</h1>
    </header>

    <main className={styles.main}>
      <section className={styles.section} data-testid="pill-variant-section">
        <h2 className={styles.section__title}>Pill Variant</h2>
        <p className={styles.section__text}>Rounded pill-style tabs with badges</p>
        <Tabs
          className={styles['tab-container']}
          panels={pillPanels}
          tabBadge="negative"
          tabVariant="pill"
          tabs={pillTabs}
        />
      </section>

      <section className={styles.section} data-testid="underline-variant-section">
        <h2 className={styles.section__title}>Underline Variant</h2>
        <p className={styles.section__text}>
          Clean underline tabs with animated indicator and badge variations
        </p>
        <Tabs
          className={styles['tab-container']}
          panels={underlinePanels}
          tabBadge="positive"
          tabVariant="underline"
          tabs={underlineTabs}
        />
      </section>
    </main>
  </>
);

export default App;
