import { loadEnvConfig } from '@next/env'
import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

// Load Next.js environment variables
const projectDir = process.cwd()
loadEnvConfig(projectDir)

console.log('🔍 DATABASE_URI loaded:', process.env.DATABASE_URI ? 'YES' : 'NO')
console.log('🔍 PAYLOAD_SECRET loaded:', process.env.PAYLOAD_SECRET ? 'YES' : 'NO')

async function migrateContent() {
  const payload = await getPayload({ config })

  console.log('🚀 Starting migration from Keystatic to Payload...')

  try {
    // Helper function to read JSON files
    const readJSON = (filePath: string) => {
      const fullPath = path.join(process.cwd(), filePath)
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        return JSON.parse(content)
      }
      console.warn(`⚠️  File not found: ${filePath}`)
      return null
    }

    // Helper function to read YAML files
    const readYAML = (filePath: string) => {
      const fullPath = path.join(process.cwd(), filePath)
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        return yaml.parse(content)
      }
      console.warn(`⚠️  File not found: ${filePath}`)
      return null
    }

    // Helper to upload media if path exists
    const uploadMedia = async (imagePath: string | null | undefined, altText: string = 'Image') => {
      if (!imagePath) return null

      // Remove leading slash if present
      const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
      const fullPath = path.join(process.cwd(), 'public', cleanPath)

      if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️  Image not found: ${fullPath}`)
        return null
      }

      const filename = path.basename(cleanPath)
      const fileBuffer = fs.readFileSync(fullPath)
      const ext = path.extname(filename).slice(1)

      // Map extensions to mime types
      const mimeTypes: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
      }

      try {
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: altText,
          },
          file: {
            data: fileBuffer,
            mimetype: mimeTypes[ext] || 'image/jpeg',
            name: filename,
            size: fileBuffer.length,
          },
        })

        console.log(`  ✓ Uploaded image: ${filename}`)
        return media.id
      } catch (error) {
        console.error(`  ✗ Failed to upload ${filename}:`, error)
        return null
      }
    }

    // 1. MIGRATE GLOBALS (Singletons)
    console.log('\n📁 Migrating Globals...')

    // Site Settings
    const siteSettings = readJSON('content/site-settings.json')
    if (siteSettings) {
      await payload.updateGlobal({
        slug: 'siteSettings',
        data: siteSettings,
      })
      console.log('  ✓ Migrated site settings')
    }

    // Home
    const home = readJSON('content/home.json')
    if (home) {
      const backgroundImageId = await uploadMedia(home.backgroundImage, 'Hero background')
      await payload.updateGlobal({
        slug: 'home',
        data: {
          heroTitle: home.heroTitle,
          heroSubtitle: home.heroSubtitle,
          cta: home.cta,
          backgroundImage: backgroundImageId,
        },
      })
      console.log('  ✓ Migrated home')
    }

    // About
    const about = readJSON('content/about.json')
    if (about) {
      const imageId = await uploadMedia(about.image, 'About photo')
      await payload.updateGlobal({
        slug: 'about',
        data: {
          title: about.title,
          subtitle: about.subtitle,
          description: about.description,
          bio1: about.bio1,
          bio2: about.bio2,
          image: imageId,
          videoWebm: about.videoWebm || '',
          videoMp4: about.videoMp4 || '',
          videoPoster: about.videoPoster || '',
          yearsExperience: about.yearsExperience || 10,
        },
      })
      console.log('  ✓ Migrated about')
    }

    // Gallery Settings
    const gallerySettings = readJSON('content/gallery-settings.json')
    if (gallerySettings) {
      await payload.updateGlobal({
        slug: 'gallery',
        data: gallerySettings,
      })
      console.log('  ✓ Migrated gallery settings')
    }

    // Schedule
    const schedule = readJSON('content/schedule.json')
    if (schedule) {
      await payload.updateGlobal({
        slug: 'schedule',
        data: schedule,
      })
      console.log('  ✓ Migrated schedule')
    }

    // Contact
    const contact = readJSON('content/contact.json')
    if (contact) {
      await payload.updateGlobal({
        slug: 'contact',
        data: contact,
      })
      console.log('  ✓ Migrated contact')
    }

    // 2. MIGRATE COLLECTIONS
    console.log('\n📦 Migrating Collections...')

    // Features
    const featuresDir = path.join(process.cwd(), 'content/features')
    if (fs.existsSync(featuresDir)) {
      const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith('.yaml') || f.endsWith('.json'))
      for (const file of featureFiles) {
        const ext = path.extname(file)
        const feature = ext === '.json'
          ? readJSON(`content/features/${file}`)
          : readYAML(`content/features/${file}`)

        if (feature) {
          await payload.create({
            collection: 'features',
            data: {
              title: feature.title || '',
              description: feature.description || '',
              icon: feature.icon || 'Award',
              order: feature.order || 0,
            },
          })
        }
      }
      console.log(`  ✓ Migrated ${featureFiles.length} features`)
    }

    // Gallery Images
    const galleryDir = path.join(process.cwd(), 'content/gallery')
    if (fs.existsSync(galleryDir)) {
      const galleryFiles = fs.readdirSync(galleryDir).filter(f => f.endsWith('.yaml'))
      for (const file of galleryFiles) {
        const gallery = readYAML(`content/gallery/${file}`)
        if (gallery) {
          const imageId = await uploadMedia(gallery.image, gallery.alt || gallery.title)
          await payload.create({
            collection: 'galleryImages',
            data: {
              title: gallery.title || 'Gallery Image',
              order: gallery.order || 0,
              aspect: gallery.aspect || 'square',
              image: imageId,
              alt: gallery.alt || gallery.title || 'Gallery image',
            },
          })
        }
      }
      console.log(`  ✓ Migrated ${galleryFiles.length} gallery images`)
    }

    // Testimonials
    const testimonialsDir = path.join(process.cwd(), 'content/testimonials')
    if (fs.existsSync(testimonialsDir)) {
      const testimonialFiles = fs.readdirSync(testimonialsDir).filter(f => f.endsWith('.yaml') || f.endsWith('.json'))
      for (const file of testimonialFiles) {
        const ext = path.extname(file)
        const testimonial = ext === '.json'
          ? readJSON(`content/testimonials/${file}`)
          : readYAML(`content/testimonials/${file}`)

        if (testimonial) {
          await payload.create({
            collection: 'testimonials',
            data: {
              name: testimonial.name || '',
              role: testimonial.role || 'Cliente',
              quote: testimonial.quote || '',
              order: testimonial.order || 0,
            },
          })
        }
      }
      console.log(`  ✓ Migrated ${testimonialFiles.length} testimonials`)
    }

    // Navigation
    const navDir = path.join(process.cwd(), 'content/navigation')
    if (fs.existsSync(navDir)) {
      const navFiles = fs.readdirSync(navDir).filter(f => f.endsWith('.yaml') || f.endsWith('.json'))
      for (const file of navFiles) {
        const ext = path.extname(file)
        const nav = ext === '.json'
          ? readJSON(`content/navigation/${file}`)
          : readYAML(`content/navigation/${file}`)

        if (nav) {
          await payload.create({
            collection: 'navigation',
            data: {
              name: nav.name || '',
              href: nav.href || '#',
              order: nav.order || 0,
              showInHeader: nav.showInHeader !== undefined ? nav.showInHeader : true,
              showInFooter: nav.showInFooter !== undefined ? nav.showInFooter : true,
            },
          })
        }
      }
      console.log(`  ✓ Migrated ${navFiles.length} navigation items`)
    }

    // Pricing (if exists)
    const pricingDir = path.join(process.cwd(), 'content/pricing')
    if (fs.existsSync(pricingDir)) {
      const pricingFiles = fs.readdirSync(pricingDir).filter(f => f.endsWith('.json'))
      for (const file of pricingFiles) {
        const pricing = readJSON(`content/pricing/${file}`)
        if (pricing) {
          await payload.create({
            collection: 'pricing',
            data: {
              name: pricing.name || '',
              price: pricing.price || '',
              period: pricing.period || '',
              popular: pricing.popular || false,
              features: pricing.features?.map((f: string) => ({ feature: f })) || [],
            },
          })
        }
      }
      console.log(`  ✓ Migrated ${pricingFiles.length} pricing plans`)
    }

    // Classes (if exists)
    const classesDir = path.join(process.cwd(), 'content/classes')
    if (fs.existsSync(classesDir)) {
      const classFiles = fs.readdirSync(classesDir).filter(f => f.endsWith('.json') || f.endsWith('.yaml'))
      for (const file of classFiles) {
        const ext = path.extname(file)
        const classData = ext === '.json'
          ? readJSON(`content/classes/${file}`)
          : readYAML(`content/classes/${file}`)

        if (classData) {
          await payload.create({
            collection: 'classes',
            data: classData,
          })
        }
      }
      console.log(`  ✓ Migrated ${classFiles.length} classes`)
    }

    console.log('\n✅ Migration completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to verify the data')
    console.log('2. Create your first admin user')
    console.log('3. Test all content is displaying correctly')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    throw error
  }

  process.exit(0)
}

migrateContent()
