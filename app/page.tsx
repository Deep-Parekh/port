import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import ProjectsSection from '@/components/projects/ProjectsSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <ProjectsSection />
      {/* <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>More projects coming soon...</p>
      </div> */}
    </>
  );
}
