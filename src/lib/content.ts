import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

// Singletons
export const getHome = () => reader.singletons.home.read();
export const getAbout = () => reader.singletons.about.read();
export const getGallerySettings = () => reader.singletons.gallery.read();
export const getScheduleSettings = () => reader.singletons.schedule.read();
export const getProgramsSettings = () => reader.singletons.programs.read();
export const getContact = () => reader.singletons.contact.read();

// Collections
export const getPricing = () => reader.collections.pricing.all();
export const getGalleryImages = () => reader.collections.galleryImages.all();
export const getClasses = () => reader.collections.classes.all();
export const getFeatures = () => reader.collections.features.all();

export const getProgramItems = async () => {
  const programs = await reader.collections.programItems.all();
  // Sort by order field
  return programs.sort((a, b) => (a.entry.order || 0) - (b.entry.order || 0));
};
