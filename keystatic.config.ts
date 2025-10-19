import { config, fields, collection, singleton } from "@keystatic/core";

const isProd = process.env.NODE_ENV === "production";

export default config({
  storage: isProd
    ? {
        kind: "github",
        repo: { owner: "PauloSousa-Dev", name: "joanasousa_web_app" },
      }
    : {
        kind: "local",
      },
  ui: { brand: { name: "Joana Sousa Centro de Treino" } },
  singletons: {
    home: singleton({
      path: "content/home",
      label: "Home",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({
          label: "Título principal",
          defaultValue: "Treino que transforma"
        }),
        heroSubtitle: fields.text({
          label: "Subtítulo",
          defaultValue: "Marca a tua sessão"
        }),
        cta: fields.text({
          label: "Texto do botão",
          defaultValue: "Contactar"
        }),
      },
    }),
    about: singleton({
      path: "content/about",
      label: "Sobre Mim",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Título",
          defaultValue: "Sobre Mim"
        }),
        subtitle: fields.text({
          label: "Subtítulo",
          defaultValue: "Conhece-me Melhor"
        }),
        description: fields.text({
          label: "Descrição Principal",
          multiline: true,
          defaultValue: "Personal trainer certificada com mais de 10 anos de experiência em transformar vidas através do fitness."
        }),
        bio1: fields.text({
          label: "Biografia - Parágrafo 1",
          multiline: true,
          defaultValue: "A minha missão é ajudar-te a alcançar o teu melhor eu, através de treinos personalizados, nutrição equilibrada e um acompanhamento que vai além do ginásio."
        }),
        bio2: fields.text({
          label: "Biografia - Parágrafo 2",
          multiline: true,
          defaultValue: "Acredito que cada pessoa é única e merece um plano adaptado às suas necessidades, objetivos e estilo de vida. Juntos, vamos criar uma versão mais forte, saudável e confiante de ti."
        }),
        image: fields.image({
          label: "Foto Profissional",
          directory: "public/images",
          validation: { isRequired: false }
        }),
        videoWebm: fields.text({
          label: "URL Vídeo WebM (opcional - melhor performance)",
          validation: { isRequired: false }
        }),
        videoMp4: fields.text({
          label: "URL Vídeo MP4 (obrigatório se usar vídeo)",
          validation: { isRequired: false }
        }),
        videoPoster: fields.text({
          label: "URL Poster do Vídeo (imagem de preview)",
          validation: { isRequired: false }
        }),
        yearsExperience: fields.number({
          label: "Anos de Experiência",
          defaultValue: 10
        }),
      },
    }),
    gallery: singleton({
      path: "content/gallery-settings",
      label: "Resultados & Testemunhos",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Título",
          defaultValue: "Resultados Reais"
        }),
        subtitle: fields.text({
          label: "Subtítulo",
          defaultValue: "Transformações que Inspiram"
        }),
        description: fields.text({
          label: "Descrição",
          multiline: true,
          defaultValue: "Cada cliente tem uma história única. Vê como o treino personalizado pode transformar a tua vida."
        }),
      },
    }),
    schedule: singleton({
      path: "content/schedule",
      label: "Disponibilidade & Agendamento",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Título",
          defaultValue: "Disponibilidade & Agendamento"
        }),
        subtitle: fields.text({
          label: "Subtítulo",
          defaultValue: "Encontra o Horário Perfeito Para Ti"
        }),
        description: fields.text({
          label: "Descrição",
          multiline: true,
          defaultValue: "Sessões flexíveis adaptadas à tua rotina. Marca a tua primeira sessão experimental gratuita."
        }),
      },
    }),
    programs: singleton({
      path: "content/programs-settings",
      label: "Programas - Configurações",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Título",
          defaultValue: "Programas de Treino"
        }),
        subtitle: fields.text({
          label: "Subtítulo",
          multiline: true,
          defaultValue: "Escolha o programa que melhor se adapta aos seus objetivos e estilo de vida. Todos incluem acompanhamento profissional dedicado."
        }),
        ctaTitle: fields.text({
          label: "CTA - Título",
          defaultValue: "Pronto para Começar?"
        }),
        ctaDescription: fields.text({
          label: "CTA - Descrição",
          multiline: true,
          defaultValue: "Entre em contacto e agende a sua primeira sessão. Juntos vamos criar o plano perfeito para alcançar os seus objetivos."
        }),
        ctaPrimaryText: fields.text({
          label: "CTA - Botão Principal",
          defaultValue: "Agendar Sessão"
        }),
        ctaSecondaryText: fields.text({
          label: "CTA - Botão Secundário",
          defaultValue: "Saber Mais"
        }),
      },
    }),
    contact: singleton({
      path: "content/contact",
      label: "Contacto",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Título",
          defaultValue: "Vamos Começar?"
        }),
        subtitle: fields.text({
          label: "Subtítulo",
          defaultValue: "Entra em contacto e dá o primeiro passo para a tua transformação"
        }),
        phone: fields.text({
          label: "Telefone",
          defaultValue: "+351 912 345 678"
        }),
        email: fields.text({
          label: "Email",
          defaultValue: "joana@personaltraining.pt"
        }),
        location: fields.text({
          label: "Localização",
          defaultValue: "Lisboa, Portugal"
        }),
        mapLatitude: fields.text({
          label: "Latitude do Mapa",
          defaultValue: "38.7223",
          validation: { isRequired: false }
        }),
        mapLongitude: fields.text({
          label: "Longitude do Mapa",
          defaultValue: "-9.1393",
          validation: { isRequired: false }
        }),
        instagram: fields.text({
          label: "Instagram URL",
          defaultValue: "https://instagram.com/joanasousa",
          validation: { isRequired: false }
        }),
        facebook: fields.text({
          label: "Facebook URL",
          defaultValue: "https://facebook.com/joanasousa",
          validation: { isRequired: false }
        }),
      },
    }),
  },
  collections: {
    pricing: collection({
      label: "Planos de Preços",
      path: "content/pricing/*",
      slugField: "name",
      schema: {
        name: fields.text({ label: "Nome do Plano" }),
        price: fields.text({ label: "Preço (ex: 50€)" }),
        period: fields.text({ label: "Período (ex: por sessão)" }),
        popular: fields.checkbox({
          label: "Plano Popular?",
          defaultValue: false
        }),
        features: fields.array(
          fields.text({ label: "Característica" }),
          {
            label: "Características",
            itemLabel: (props) => props.value || "Nova característica",
          }
        ),
      },
    }),
    programItems: collection({
      label: "Programas de Treino",
      path: "content/programs/*",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Título do Programa",
          validation: { isRequired: true }
        }),
        description: fields.text({
          label: "Descrição",
          multiline: true,
          validation: { isRequired: true }
        }),
        icon: fields.select({
          label: "Ícone",
          options: [
            { label: "Dumbbell (Haltere)", value: "Dumbbell" },
            { label: "HeartPulse (Coração)", value: "HeartPulse" },
            { label: "User (Pessoa)", value: "User" },
            { label: "Users (Grupo)", value: "Users" },
            { label: "Activity (Atividade)", value: "Activity" },
            { label: "Sparkles (Estrelas)", value: "Sparkles" },
          ],
          defaultValue: "Dumbbell",
        }),
        benefits: fields.array(
          fields.text({ label: "Benefício" }),
          {
            label: "Benefícios",
            itemLabel: (props) => props.value || "Novo benefício",
            validation: { length: { min: 3, max: 3 } }
          }
        ),
        order: fields.number({
          label: "Ordem de Exibição",
          defaultValue: 0,
          validation: { isRequired: true }
        }),
      },
    }),
    galleryImages: collection({
      label: "Galeria - Imagens",
      path: "content/gallery/*",
      slugField: "title",
      schema: {
        title: fields.text({ label: "Título da Imagem" }),
        category: fields.select({
          label: "Categoria",
          options: [
            { label: "Treinos", value: "workout" },
            { label: "Força", value: "strength" },
            { label: "Cardio", value: "cardio" },
            { label: "Flexibilidade", value: "flexibility" },
            { label: "Grupo", value: "group" },
            { label: "Personal", value: "personal" },
            { label: "Nutrição", value: "nutrition" },
            { label: "Resultados", value: "results" },
          ],
          defaultValue: "workout",
        }),
        image: fields.image({
          label: "Imagem",
          directory: "public/images/gallery"
        }),
        alt: fields.text({
          label: "Texto Alternativo (Alt)",
          defaultValue: "Imagem de treino"
        }),
      },
    }),
    classes: collection({
      label: "Aulas",
      path: "content/classes/*",
      slugField: "name",
      schema: {
        name: fields.text({ label: "Nome da Aula" }),
        type: fields.select({
          label: "Tipo",
          options: [
            { label: "Grupo", value: "Grupo" },
            { label: "Individual", value: "Individual" },
          ],
          defaultValue: "Grupo",
        }),
        day: fields.select({
          label: "Dia da Semana",
          options: [
            { label: "Segunda", value: "Segunda" },
            { label: "Terça", value: "Terça" },
            { label: "Quarta", value: "Quarta" },
            { label: "Quinta", value: "Quinta" },
            { label: "Sexta", value: "Sexta" },
            { label: "Sábado", value: "Sábado" },
          ],
          defaultValue: "Segunda",
        }),
        time: fields.text({
          label: "Horário (ex: 07:00 - 08:00)",
          defaultValue: "07:00 - 08:00"
        }),
        spots: fields.number({
          label: "Vagas Totais",
          defaultValue: 10
        }),
        available: fields.number({
          label: "Vagas Disponíveis",
          defaultValue: 5
        }),
      },
    }),
    features: collection({
      label: "Características (About)",
      path: "content/features/*",
      slugField: "title",
      schema: {
        title: fields.text({ label: "Título" }),
        description: fields.text({
          label: "Descrição",
          multiline: true
        }),
        icon: fields.select({
          label: "Ícone",
          options: [
            { label: "Award (Prémio)", value: "Award" },
            { label: "Target (Alvo)", value: "Target" },
            { label: "Heart (Coração)", value: "Heart" },
            { label: "TrendingUp (Crescimento)", value: "TrendingUp" },
            { label: "Dumbbell", value: "Dumbbell" },
            { label: "Activity", value: "Activity" },
          ],
          defaultValue: "Award",
        }),
      },
    }),
  },
});
