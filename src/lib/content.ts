import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "../../keystatic.config";

// In production, use GitHub reader to access content via API
// In development, use local reader to access filesystem content/
const isDevelopment = process.env.NODE_ENV !== "production";

const reader = isDevelopment
  ? createReader(process.cwd(), keystaticConfig)
  : createGitHubReader(keystaticConfig, {
      repo: "PauloSousa-Dev/joanasousa_web_app",
      ref: "main",
      token: process.env.GITHUB_TOKEN,
    });

// Singletons
export const getSiteSettings = () => reader.singletons.siteSettings.read();
export const getHome = () => reader.singletons.home.read();
export const getAbout = () => reader.singletons.about.read();
export const getGallerySettings = () => reader.singletons.gallery.read();
export const getScheduleSettings = () => reader.singletons.schedule.read();
// export const getProgramsSettings = () => reader.singletons.programs.read();
export const getContact = () => reader.singletons.contact.read();

// Collections
export const getPricing = () => reader.collections.pricing.all();
export const getGalleryImages = () => reader.collections.galleryImages.all();
export const getClasses = () => reader.collections.classes.all();
export const getFeatures = () => reader.collections.features.all();

// export const getProgramItems = async () => {
//   const programs = await reader.collections.programItems.all();
//   // Sort by order field
//   return programs.sort((a, b) => (a.entry.order || 0) - (b.entry.order || 0));
// };

export const getTestimonials = async () => {
  const testimonials = await reader.collections.testimonials.all();
  return testimonials.sort(
    (a, b) => (a.entry.order || 0) - (b.entry.order || 0)
  );
};

export const getNavigation = async () => {
  const navItems = await reader.collections.navigation.all();
  return navItems.sort((a, b) => (a.entry.order || 0) - (b.entry.order || 0));
};
