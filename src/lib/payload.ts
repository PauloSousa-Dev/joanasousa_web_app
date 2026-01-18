import { getPayload } from 'payload'
import config from '@payload-config'

// Initialize Payload instance
const getPayloadInstance = async () => {
  return await getPayload({ config })
}

// Helper to extract URL from media relationship
const getMediaUrl = (media: unknown): string | undefined => {
  if (!media) return undefined
  if (typeof media === 'string') return media

  if (typeof media === 'object' && media !== null) {
    const mediaObj = media as Record<string, string>
    // If URL starts with /api/media/file/, convert to /images/
    if (mediaObj.url && typeof mediaObj.url === 'string' && mediaObj.url.startsWith('/api/media/file/')) {
      const filename = mediaObj.filename || mediaObj.url.split('/').pop()
      // For images without extension, check if there's a mimeType
      if (filename && !filename.includes('.') && mediaObj.mimeType) {
        const ext = mediaObj.mimeType.split('/')[1] // e.g., 'image/jpeg' -> 'jpeg'
        return `/images/${decodeURIComponent(filename)}.${ext === 'jpeg' ? 'jpg' : ext}`
      }
      return `/images/${decodeURIComponent(filename || '')}`
    }
    // Otherwise use the URL as-is (for when staticURL works correctly)
    if (mediaObj.url && typeof mediaObj.url === 'string') return mediaObj.url
  }

  return undefined
}

// GLOBALS (Singletons)
export const getSiteSettings = async () => {
  const payload = await getPayloadInstance()
  return await payload.findGlobal({
    slug: 'siteSettings',
  })
}

export const getHome = async () => {
  const payload = await getPayloadInstance()
  const data = await payload.findGlobal({
    slug: 'home',
    depth: 2, // Populate media relationships
  })

  // Transform backgroundImage from relationship to string path
  return {
    ...data,
    backgroundImage: getMediaUrl(data.backgroundImage),
  } as typeof data & { backgroundImage: string | undefined }
}

export const getAbout = async () => {
  const payload = await getPayloadInstance()
  const data = await payload.findGlobal({
    slug: 'about',
    depth: 2, // Populate media relationships
  })

  // Transform image from relationship to string path
  return {
    ...data,
    image: getMediaUrl(data.image),
  } as typeof data & { image: string | undefined }
}

export const getGallerySettings = async () => {
  const payload = await getPayloadInstance()
  return await payload.findGlobal({
    slug: 'gallery',
  })
}

export const getScheduleSettings = async () => {
  const payload = await getPayloadInstance()
  return await payload.findGlobal({
    slug: 'schedule',
  })
}

export const getContact = async () => {
  const payload = await getPayloadInstance()
  return await payload.findGlobal({
    slug: 'contact',
  })
}

// COLLECTIONS
export const getPricing = async () => {
  const payload = await getPayloadInstance()
  const result = await payload.find({
    collection: 'pricing',
    limit: 100,
  })

  // Transform to match Keystatic format
  return result.docs.map(doc => ({
    slug: doc.id,
    entry: {
      name: doc.name,
      price: doc.price,
      period: doc.period,
      popular: doc.popular,
      features: doc.features?.map((f: { feature: string }) => f.feature) || [],
    },
  }))
}

export const getGalleryImages = async () => {
  const payload = await getPayloadInstance()
  const result = await payload.find({
    collection: 'galleryImages',
    limit: 100,
    sort: 'order',
    depth: 2, // Populate media relationships
  })

  // Transform to match Keystatic format
  return result.docs.map(doc => ({
    slug: doc.id,
    entry: {
      title: doc.title,
      order: doc.order,
      aspect: doc.aspect as 'tall' | 'wide' | 'square',
      image: getMediaUrl(doc.image),
      alt: doc.alt,
    },
  }))
}

export const getClasses = async () => {
  const payload = await getPayloadInstance()
  const result = await payload.find({
    collection: 'classes',
    limit: 100,
  })

  return result.docs.map(doc => ({
    slug: doc.id,
    entry: {
      name: doc.name,
      type: doc.type,
      day: doc.day,
      time: doc.time,
      spots: doc.spots,
      available: doc.available,
    },
  }))
}

export const getFeatures = async () => {
  const payload = await getPayloadInstance()
  const result = await payload.find({
    collection: 'features',
    limit: 100,
    sort: 'order',
  })

  return result.docs.map(doc => ({
    slug: doc.id,
    entry: {
      title: doc.title,
      description: doc.description,
      icon: doc.icon,
      order: doc.order,
    },
  }))
}

export const getTestimonials = async () => {
  const payload = await getPayloadInstance()
  const result = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'order',
    depth: 2, // Populate media relationships (avatar)
  })

  return result.docs.map(doc => ({
    slug: doc.id,
    entry: {
      name: doc.name,
      role: doc.role,
      quote: doc.quote,
      avatar: getMediaUrl(doc.avatar),
      order: doc.order,
    },
  }))
}

export const getNavigation = async () => {
  const payload = await getPayloadInstance()
  const result = await payload.find({
    collection: 'navigation',
    limit: 100,
    sort: 'order',
  })

  return result.docs.map(doc => ({
    slug: doc.id,
    entry: {
      name: doc.name,
      href: doc.href,
      order: doc.order,
      showInHeader: doc.showInHeader,
      showInFooter: doc.showInFooter,
    },
  }))
}
