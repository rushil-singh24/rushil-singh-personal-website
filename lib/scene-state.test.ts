import { describe, it, expect } from 'vitest'
import { sceneReducer, getInitialSceneState, INTRO_SEEN_KEY } from './scene-state'

describe('getInitialSceneState', () => {
  it('starts at intro when no flag is set', () => {
    expect(getInitialSceneState(null)).toEqual({ view: 'intro' })
  })

  it('starts at scene when the intro-seen flag is set', () => {
    expect(getInitialSceneState('true')).toEqual({ view: 'scene' })
  })
})

describe('sceneReducer', () => {
  it('moves from intro to scene on INTRO_FINISHED', () => {
    const result = sceneReducer({ view: 'intro' }, { type: 'INTRO_FINISHED' })
    expect(result).toEqual({ view: 'scene' })
  })

  it('moves from scene to zoomed on WINDOW_CLICKED', () => {
    const result = sceneReducer(
      { view: 'scene' },
      { type: 'WINDOW_CLICKED', sectionId: 'about' }
    )
    expect(result).toEqual({ view: 'zoomed', sectionId: 'about' })
  })

  it('moves from zoomed back to scene on BACK', () => {
    const result = sceneReducer(
      { view: 'zoomed', sectionId: 'about' },
      { type: 'BACK' }
    )
    expect(result).toEqual({ view: 'scene' })
  })

  it('switching windows while zoomed returns to scene first, not directly to the new section', () => {
    const result = sceneReducer(
      { view: 'zoomed', sectionId: 'about' },
      { type: 'WINDOW_CLICKED', sectionId: 'projects' }
    )
    expect(result).toEqual({ view: 'scene' })
  })

  it('INTRO_FINISHED is a no-op once already in scene', () => {
    const result = sceneReducer({ view: 'scene' }, { type: 'INTRO_FINISHED' })
    expect(result).toEqual({ view: 'scene' })
  })

  it('BACK is a no-op while in intro', () => {
    const result = sceneReducer({ view: 'intro' }, { type: 'BACK' })
    expect(result).toEqual({ view: 'intro' })
  })

  it('WINDOW_CLICKED is a no-op while in intro', () => {
    const result = sceneReducer(
      { view: 'intro' },
      { type: 'WINDOW_CLICKED', sectionId: 'about' }
    )
    expect(result).toEqual({ view: 'intro' })
  })

  it('REPLAY_INTRO returns to intro from the scene', () => {
    expect(sceneReducer({ view: 'scene' }, { type: 'REPLAY_INTRO' })).toEqual({
      view: 'intro',
    })
  })

  it('REPLAY_INTRO returns to intro from a zoomed section', () => {
    expect(
      sceneReducer({ view: 'zoomed', sectionId: 'about' }, { type: 'REPLAY_INTRO' })
    ).toEqual({ view: 'intro' })
  })
})
