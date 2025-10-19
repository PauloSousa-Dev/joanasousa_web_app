import {
  getHome,
  getAbout,
  getGallerySettings,
  getScheduleSettings,
  getProgramsSettings,
  getProgramItems,
  getContact,
} from "@/lib/content";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import GallerySection from "@/components/sections/GallerySection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import ContactSection from "@/components/sections/ContactSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch all content from Keystatic
  const [home, about, gallerySettings, scheduleSettings, programsSettings, programItems, contact] =
    await Promise.all([
      getHome(),
      getAbout(),
      getGallerySettings(),
      getScheduleSettings(),
      getProgramsSettings(),
      getProgramItems(),
      getContact(),
    ]);

  // Transform program items for component
  const programs = programItems.map((item) => ({
    title: item.entry.title,
    description: item.entry.description,
    icon: item.entry.icon,
    benefits: item.entry.benefits,
  }));

  return (
    <>
      <Header />
      <main>
        <HeroSection
          heroTitle={home?.heroTitle}
          heroSubtitle={home?.heroSubtitle}
          cta={home?.cta}
        />
        <AboutSection
          title={about?.title}
          subtitle={about?.subtitle}
          description={about?.description}
          bio1={about?.bio1}
          bio2={about?.bio2}
          yearsExperience={about?.yearsExperience}
          videoWebm={about?.videoWebm}
          videoMp4={about?.videoMp4}
          videoPoster={about?.videoPoster}
        />
        <ProgramsSection
          title={programsSettings?.title}
          subtitle={programsSettings?.subtitle}
          ctaTitle={programsSettings?.ctaTitle}
          ctaDescription={programsSettings?.ctaDescription}
          ctaPrimaryText={programsSettings?.ctaPrimaryText}
          ctaSecondaryText={programsSettings?.ctaSecondaryText}
          programs={programs}
        />
        <GallerySection
          title={gallerySettings?.title}
          subtitle={gallerySettings?.subtitle}
          description={gallerySettings?.description}
        />
        <ScheduleSection
          title={scheduleSettings?.title}
          subtitle={scheduleSettings?.subtitle}
          description={scheduleSettings?.description}
        />
        <ContactSection
          title={contact?.title}
          subtitle={contact?.subtitle}
          phone={contact?.phone}
          email={contact?.email}
          location={contact?.location}
          mapLatitude={contact?.mapLatitude}
          mapLongitude={contact?.mapLongitude}
          instagram={contact?.instagram}
          facebook={contact?.facebook}
        />
      </main>
      <Footer />
    </>
  );
}
