import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Database adapter
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false, // Don't auto-create database (Neon already has it)
    migrationDir: './migrations',
    prodMigrations: [],
  }),

  // Admin UI configuration
  admin: {
    user: 'users',
    autoLogin: process.env.NODE_ENV === 'development' ? false : false,
    meta: {
      titleSuffix: '- Joana Sousa Centro de Treino',
    },
  },

  // Custom admin route
  routes: {
    admin: '/studio',
    api: '/api',
  },

  // Editor configuration
  editor: lexicalEditor({}),

  // Secret for JWT
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Sharp for image processing
  sharp,

  // Collections (equivalent to Keystatic collections)
  collections: [
    // Users collection for authentication
    {
      slug: 'users',
      auth: {
        tokenExpiration: 7200, // 2 hours
      },
      admin: {
        useAsTitle: 'email',
        group: 'Sistema',
      },
      access: {
        create: ({ req }) => req.user?.role === 'admin',
        read: () => true,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => req.user?.role === 'admin',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          required: true,
          defaultValue: 'editor',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
          ],
        },
      ],
    },

    // Media collection for uploads
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, 'public/images'),
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
          {
            name: 'tablet',
            width: 1024,
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      admin: {
        group: 'Conteúdo',
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },

    // Pricing collection
    {
      slug: 'pricing',
      admin: {
        useAsTitle: 'name',
        group: 'Conteúdo',
        defaultColumns: ['name', 'price', 'popular', 'updatedAt'],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome do Plano',
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'Preço (ex: 50€)',
        },
        {
          name: 'period',
          type: 'text',
          required: true,
          label: 'Período (ex: por sessão)',
        },
        {
          name: 'popular',
          type: 'checkbox',
          label: 'Plano Popular?',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Características',
          required: true,
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // Gallery Images collection
    {
      slug: 'galleryImages',
      admin: {
        useAsTitle: 'title',
        group: 'Conteúdo',
        defaultColumns: ['title', 'aspect', 'order', 'updatedAt'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título da Imagem',
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
          label: '📊 Ordem de Exibição (0 = primeiro)',
        },
        {
          name: 'aspect',
          type: 'select',
          required: true,
          defaultValue: 'square',
          label: '📐 Formato/Orientação',
          options: [
            { label: '📱 Alto (Retrato 3:4)', value: 'tall' },
            { label: '🖼️ Largo (Paisagem 4:3)', value: 'wide' },
            { label: '⬛ Quadrado (1:1)', value: 'square' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: '📸 Imagem',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          defaultValue: 'Imagem de treino',
          label: '🏷️ Texto Alternativo (Alt)',
        },
      ],
    },

    // Classes collection
    {
      slug: 'classes',
      admin: {
        useAsTitle: 'name',
        group: 'Conteúdo',
        defaultColumns: ['name', 'type', 'day', 'time', 'spots', 'available'],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome da Aula',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'Grupo',
          label: 'Tipo',
          options: [
            { label: 'Grupo', value: 'Grupo' },
            { label: 'Individual', value: 'Individual' },
          ],
        },
        {
          name: 'day',
          type: 'select',
          required: true,
          defaultValue: 'Segunda',
          label: 'Dia da Semana',
          options: [
            { label: 'Segunda', value: 'Segunda' },
            { label: 'Terça', value: 'Terça' },
            { label: 'Quarta', value: 'Quarta' },
            { label: 'Quinta', value: 'Quinta' },
            { label: 'Sexta', value: 'Sexta' },
            { label: 'Sábado', value: 'Sábado' },
          ],
        },
        {
          name: 'time',
          type: 'text',
          required: true,
          defaultValue: '07:00 - 08:00',
          label: 'Horário',
        },
        {
          name: 'spots',
          type: 'number',
          required: true,
          defaultValue: 10,
          label: 'Vagas Totais',
        },
        {
          name: 'available',
          type: 'number',
          required: true,
          defaultValue: 5,
          label: 'Vagas Disponíveis',
        },
      ],
    },

    // Features collection
    {
      slug: 'features',
      admin: {
        useAsTitle: 'title',
        group: 'Conteúdo',
        defaultColumns: ['title', 'icon', 'order', 'updatedAt'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Descrição',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'Award',
          label: 'Ícone',
          options: [
            { label: 'Award (Prémio)', value: 'Award' },
            { label: 'Target (Alvo)', value: 'Target' },
            { label: 'Heart (Coração)', value: 'Heart' },
            { label: 'TrendingUp (Crescimento)', value: 'TrendingUp' },
            { label: 'Dumbbell', value: 'Dumbbell' },
            { label: 'Activity', value: 'Activity' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
          label: 'Ordem de Exibição',
        },
      ],
    },

    // Testimonials collection
    {
      slug: 'testimonials',
      admin: {
        useAsTitle: 'name',
        group: 'Conteúdo',
        defaultColumns: ['name', 'role', 'order', 'updatedAt'],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome do Cliente',
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          defaultValue: 'Cliente',
          label: 'Tipo de Treino',
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Testemunho',
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
          label: 'Ordem de Exibição',
        },
      ],
    },

    // Navigation collection
    {
      slug: 'navigation',
      admin: {
        useAsTitle: 'name',
        group: 'Conteúdo',
        defaultColumns: ['name', 'href', 'order', 'showInHeader', 'showInFooter'],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome do Link',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Âncora (ex: #home, #about)',
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
          label: 'Ordem no Menu',
        },
        {
          name: 'showInHeader',
          type: 'checkbox',
          defaultValue: true,
          label: 'Mostrar no Header',
        },
        {
          name: 'showInFooter',
          type: 'checkbox',
          defaultValue: true,
          label: 'Mostrar no Footer',
        },
      ],
    },
  ],

  // Globals (equivalent to Keystatic singletons)
  globals: [
    // Site Settings global
    {
      slug: 'siteSettings',
      label: '⚙️ Configurações do Site',
      admin: {
        group: 'Configurações',
      },
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'Joana Sousa',
          label: 'Nome do Site',
        },
        {
          name: 'seoTitle',
          type: 'text',
          required: true,
          defaultValue: 'Joana Sousa - Treino Terapêutico | Lisboa',
          label: 'SEO - Título',
        },
        {
          name: 'seoDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'Especialista em Treino Terapêutico com mais de 10 anos de experiência.',
          label: 'SEO - Descrição',
        },
        {
          name: 'seoKeywords',
          type: 'text',
          required: true,
          defaultValue: 'treino terapêutico, personal training, fitness, Lisboa',
          label: 'SEO - Keywords (separadas por vírgula)',
        },
        {
          name: 'footerBrandText',
          type: 'textarea',
          required: true,
          defaultValue: 'Personal trainer dedicada a ajudar-te a alcançar os teus objetivos de fitness e bem-estar.',
          label: 'Footer - Texto da Marca',
        },
        {
          name: 'copyrightText',
          type: 'text',
          required: true,
          defaultValue: 'Joana Sousa',
          label: 'Footer - Texto de Copyright',
        },
        {
          name: 'copyrightNote',
          type: 'text',
          required: true,
          defaultValue: 'Paulo Sousa',
          label: 'Footer - Nota',
        },
      ],
    },

    // Home global
    {
      slug: 'home',
      label: 'Home',
      admin: {
        group: 'Páginas',
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          required: true,
          defaultValue: 'Treino que transforma',
          label: 'Título principal',
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          required: true,
          defaultValue: 'Marca a tua sessão',
          label: 'Subtítulo',
        },
        {
          name: 'cta',
          type: 'text',
          required: true,
          defaultValue: 'Contactar',
          label: 'Texto do botão',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagem de Background (opcional)',
        },
      ],
    },

    // About global
    {
      slug: 'about',
      label: 'Sobre Mim',
      admin: {
        group: 'Páginas',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Sobre Mim',
          label: 'Título',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'Conhece-me Melhor',
          label: 'Subtítulo',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Personal trainer certificada com mais de 10 anos de experiência.',
          label: 'Descrição Principal',
        },
        {
          name: 'bio1',
          type: 'textarea',
          required: true,
          label: 'Biografia - Parágrafo 1',
        },
        {
          name: 'bio2',
          type: 'textarea',
          required: true,
          label: 'Biografia - Parágrafo 2',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Foto Profissional',
        },
        {
          name: 'videoWebm',
          type: 'text',
          label: 'URL Vídeo WebM (opcional)',
        },
        {
          name: 'videoMp4',
          type: 'text',
          label: 'URL Vídeo MP4',
        },
        {
          name: 'videoPoster',
          type: 'text',
          label: 'URL Poster do Vídeo',
        },
        {
          name: 'yearsExperience',
          type: 'number',
          required: true,
          defaultValue: 10,
          label: 'Anos de Experiência',
        },
      ],
    },

    // Gallery global
    {
      slug: 'gallery',
      label: 'Resultados & Testemunhos',
      admin: {
        group: 'Páginas',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Resultados Reais',
          label: 'Título',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'Transformações que Inspiram',
          label: 'Subtítulo',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Cada cliente tem uma história única.',
          label: 'Descrição',
        },
      ],
    },

    // Schedule global
    {
      slug: 'schedule',
      label: 'Disponibilidade & Agendamento',
      admin: {
        group: 'Páginas',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Disponibilidade & Agendamento',
          label: 'Título',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'Encontra o Horário Perfeito Para Ti',
          label: 'Subtítulo',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Sessões flexíveis adaptadas à tua rotina.',
          label: 'Descrição',
        },
      ],
    },

    // Contact global
    {
      slug: 'contact',
      label: 'Contacto',
      admin: {
        group: 'Páginas',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Vamos Começar?',
          label: 'Título',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'Entra em contacto',
          label: 'Subtítulo',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Telefone',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email',
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Localização',
        },
        {
          name: 'mapLatitude',
          type: 'text',
          label: 'Latitude do Mapa',
        },
        {
          name: 'mapLongitude',
          type: 'text',
          label: 'Longitude do Mapa',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
      ],
    },
  ],
})
