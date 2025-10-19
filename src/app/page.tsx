import {
  getSiteSettings,
  getHome,
  getAbout,
  getGallerySettings,
  getGalleryImages,
  getScheduleSettings,
  getProgramsSettings,
  getProgramItems,
  getContact,
  getTestimonials,
  getFeatures,
  getNavigation,
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
  const [
    siteSettings,
    home,
    about,
    gallerySettings,
    galleryImages,
    scheduleSettings,
    programsSettings,
    programItems,
    contact,
    testimonials,
    features,
    navigation,
  ] = await Promise.all([
    getSiteSettings(),
    getHome(),
    getAbout(),
    getGallerySettings(),
    getGalleryImages(),
    getScheduleSettings(),
    getProgramsSettings(),
    getProgramItems(),
    getContact(),
    getTestimonials(),
    getFeatures(),
    getNavigation(),
  ]);

  // Transform program items for component
  const programs = programItems.map((item) => ({
    title: item.entry.title ?? "",
    description: item.entry.description ?? "",
    icon: item.entry.icon,
    benefits: [...item.entry.benefits],
  }));

  // Transform gallery images for component
  const gallery = galleryImages
    .map((item) => ({
      title: item.entry.title ?? "",
      alt: item.entry.alt ?? "Imagem de treino",
      aspect: item.entry.aspect as "tall" | "wide" | "square",
      image: item.entry.image || undefined,
      order: item.entry.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order);

  // Transform testimonials for component
  const testimonialsData = testimonials.map((item) => ({
    name: item.entry.name ?? "",
    role: item.entry.role ?? "",
    quote: item.entry.quote ?? "",
  }));

  // Transform features for component
  const featuresData = features.map((item) => ({
    title: item.entry.title ?? "",
    description: item.entry.description ?? "",
    icon: item.entry.icon,
  }));

  // Transform navigation for header/footer (only show items with showInHeader/showInFooter)
  const navForHeader = navigation
    .filter((item) => item.entry.showInHeader)
    .map((item) => ({
      name: item.entry.name ?? "",
      href: item.entry.href ?? "#",
    }));

  const navForFooter = navigation
    .filter((item) => item.entry.showInFooter)
    .map((item) => ({
      name: item.entry.name ?? "",
      href: item.entry.href ?? "#",
    }));

  return (
    <>
      <Header navItems={navForHeader} />
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
          yearsExperience={about?.yearsExperience ?? undefined}
          videoWebm={about?.videoWebm}
          videoMp4={about?.videoMp4}
          videoPoster={about?.videoPoster}
          features={featuresData}
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
          images={gallery}
          testimonials={testimonialsData}
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
      <Footer
        siteName={siteSettings?.siteName}
        brandText={siteSettings?.footerBrandText}
        copyrightText={siteSettings?.copyrightText}
        copyrightNote={siteSettings?.copyrightNote}
        phone={contact?.phone}
        email={contact?.email}
        location={contact?.location}
        instagram={contact?.instagram}
        facebook={contact?.facebook}
        footerNavItems={navForFooter}
      />
    </>
  );
}
