import type { ComponentType } from 'react'
import { AboutSection } from './about-section'
import { ExperienceSection } from './experience-section'
import { TechStackSection } from './tech-stack-section'
import { ProjectsSection } from './projects-section'
import { ContactSection } from './contact-section'

export type SectionComponent = ComponentType<{ onBack: () => void }>

export const sectionRegistry: Record<
  string,
  { title: string; component: SectionComponent }
> = {
  about: { title: 'About', component: AboutSection },
  experience: { title: 'Experience', component: ExperienceSection },
  techstack: { title: 'Tech Stack', component: TechStackSection },
  projects: { title: 'Projects', component: ProjectsSection },
  contact: { title: 'Personal Info', component: ContactSection },
}
