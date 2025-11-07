import Navigation from '@/components/common/Navigation'
import styles from '@/styles/layouts/WithNavigation.module.css'

export default function WithNavigationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}