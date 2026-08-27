import { SceneStateProvider } from '@/lib/scene-state-context'
import { PortfolioApp } from '@/components/portfolio-app'

export default function Home() {
  return (
    <SceneStateProvider>
      <PortfolioApp />
    </SceneStateProvider>
  )
}
