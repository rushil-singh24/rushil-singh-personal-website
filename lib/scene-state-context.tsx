'use client'

import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import {
  sceneReducer,
  getInitialSceneState,
  INTRO_SEEN_KEY,
  type SceneState,
} from './scene-state'

type SceneStateContextValue = {
  state: SceneState
  finishIntro: () => void
  clickWindow: (sectionId: string) => void
  goBack: () => void
}

const SceneStateContext = createContext<SceneStateContextValue | null>(null)

export function SceneStateProvider({ children }: { children: React.ReactNode }) {
  // Session storage is only readable client-side, so the reducer starts at
  // 'intro' during SSR/first paint and corrects to 'scene' in an effect if
  // the flag is already set — this can cause one client-side re-render for
  // returning-this-session visitors, which is an accepted trade-off (see
  // plan Task 3 note) rather than a hydration mismatch, since the server
  // render and first client render both start from 'intro'.
  const [state, dispatch] = useReducer(sceneReducer, { view: 'intro' } as SceneState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const flag = window.sessionStorage.getItem(INTRO_SEEN_KEY)
    const initial = getInitialSceneState(flag)
    if (initial.view === 'scene') {
      dispatch({ type: 'INTRO_FINISHED' })
    }
    setHydrated(true)
  }, [])

  const finishIntro = () => {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true')
    dispatch({ type: 'INTRO_FINISHED' })
  }

  const clickWindow = (sectionId: string) => dispatch({ type: 'WINDOW_CLICKED', sectionId })
  const goBack = () => dispatch({ type: 'BACK' })

  // Avoid mounting the video element for a single frame before the
  // session-storage check resolves.
  const effectiveState: SceneState = hydrated ? state : { view: 'intro' }

  return (
    <SceneStateContext.Provider value={{ state: effectiveState, finishIntro, clickWindow, goBack }}>
      {children}
    </SceneStateContext.Provider>
  )
}

export function useSceneState(): SceneStateContextValue {
  const ctx = useContext(SceneStateContext)
  if (!ctx) {
    throw new Error('useSceneState must be used within a SceneStateProvider')
  }
  return ctx
}
