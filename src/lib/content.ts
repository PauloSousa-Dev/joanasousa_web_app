import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

const reader = createReader("", config);

export const getHome = () => reader.singletons.home.read();
export const getAbout = () => reader.singletons.about.read();
export const getPricing = () => reader.collections.pricing.all();
export const getGallery = () => reader.collections.gallery.all();
