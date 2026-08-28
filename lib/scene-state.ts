export type SceneState =
  | { view: 'intro' }
  | { view: 'scene' }
  | { view: 'zoomed'; sectionId: string }

export type SceneAction =
  | { type: 'INTRO_FINISHED' }
  | { type: 'WINDOW_CLICKED'; sectionId: string }
  | { type: 'BACK' }
  | { type: 'REPLAY_INTRO' }

export const INTRO_SEEN_KEY = 'portfolio:introSeen'

export function getInitialSceneState(introSeenFlag: string | null): SceneState {
  return introSeenFlag === 'true' ? { view: 'scene' } : { view: 'intro' }
}

export function sceneReducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'INTRO_FINISHED':
      return state.view === 'intro' ? { view: 'scene' } : state

    case 'WINDOW_CLICKED':
      return state.view === 'scene'
        ? { view: 'zoomed', sectionId: action.sectionId }
        : state.view === 'zoomed'
        ? { view: 'scene' }
        : state

    case 'BACK':
      return state.view === 'zoomed' ? { view: 'scene' } : state

    case 'REPLAY_INTRO':
      return { view: 'intro' }

    default:
      return state
  }
}
