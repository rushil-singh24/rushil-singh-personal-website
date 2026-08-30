export const sceneConfig = {
  // IntroVideo treats a falsy videoSrc as "skip the intro entirely."
  // These are the site's own compressed 15s cut (committed under public/),
  // not the raw source clip.
  videoSrc: '/intro.mp4' as string | null,
  videoWebmSrc: '/intro.webm' as string | null,
  videoPosterSrc: '/intro-poster.jpg',
  posterSrc: '/intro-poster.jpg',
}
