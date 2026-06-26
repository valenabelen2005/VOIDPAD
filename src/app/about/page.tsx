'use client'
import Link from 'next/link'
import { useLanguageStore } from '@/store/language'

const content = {
  en: {
    label: 'Our story',
    title: 'We started because generic setups',
    titleHighlight: 'stopped making sense.',
    intro: 'VoidPad started from a simple frustration: every desk pad on the market looked the same. Solid black. Generic logo. Made in bulk and dropped in a warehouse. We wanted surfaces that meant something — pads you actually choose, not settle for. So we built a small operation that prints every order individually, with artwork that goes from a file to your desk in under a week.',
    whatTitle: 'What we make',
    what1: "Desk pads and mouse pads. That's it. We don't do keycaps, cables, or keyboard kits. We do one thing and we try to do it right: a surface that holds up every day, prints that don't fade after three washes, and edges that don't fray.",
    what2: 'Our collections cover everything from gaming and anime to cinema, Japanese aesthetics, landscapes and community-voted designs. Each one is printed on demand — when a design retires, it\'s gone for good.',
    whoTitle: "Who it's for",
    profiles: [
      { label: 'The gamer', desc: "You want your desk to match the energy of what's on your screen. Gaming and Anime collections were made for your setup." },
      { label: 'The visual thinker', desc: 'Cinema, Japanese aesthetics, landscapes — you want art with meaning. Something that says something before you even open a window.' },
      { label: 'The community builder', desc: 'You vote, you suggest, you shape the next drop. The Community Collection exists because of people like you.' },
    ],
    howTitle: "How it's made",
    steps: [
      { n: '01', title: 'You order', body: 'No stock. No warehouse. Your order triggers production — nothing sits waiting.' },
      { n: '02', title: 'We print', body: 'Printed on professional equipment within 3–5 business days. Each pad is checked before it ships.' },
      { n: '03', title: 'It ships to you', body: 'Packed flat to minimize damage. Tracking sent as soon as it leaves. Free US shipping on orders over $50.' },
    ],
    ctaNote: "That's the whole operation. If it resonates — come find your surface.",
    cta: 'Shop All Products',
  },
  es: {
    label: 'Nuestra historia',
    title: 'Empezamos porque los setups genéricos',
    titleHighlight: 'dejaron de tener sentido.',
    intro: 'VoidPad nació de una frustración simple: todos los desk pads del mercado se veían igual. Negro sólido. Logo genérico. Fabricados en masa y apilados en un almacén. Queríamos superficies que significaran algo — pads que elijas de verdad, no con los que te conformas. Así que armamos una operación pequeña que imprime cada pedido de forma individual, con arte que va desde un archivo hasta tu escritorio en menos de una semana.',
    whatTitle: 'Qué hacemos',
    what1: 'Desk pads y mouse pads. Nada más. No hacemos keycaps, cables ni kits de teclado. Hacemos una sola cosa e intentamos hacerla bien: una superficie que aguante el día a día, con impresiones que no se desvanecen a los tres lavados y bordes que no se deshilachan.',
    what2: 'Nuestras colecciones van desde gaming y anime hasta cine, estética japonesa, paisajes y diseños votados por la comunidad. Cada uno se imprime al pedirlo — cuando un diseño se retira, desaparece para siempre.',
    whoTitle: 'Para quién es',
    profiles: [
      { label: 'El gamer', desc: 'Querés que tu escritorio esté a la altura de lo que tenés en pantalla. Las colecciones Gaming y Anime fueron hechas para tu setup.' },
      { label: 'El pensador visual', desc: 'Cine, estética japonesa, paisajes — querés arte con significado. Algo que diga algo antes de que abras una sola ventana.' },
      { label: 'El que construye comunidad', desc: 'Votás, sugerís, das forma al próximo drop. La Community Collection existe por personas como vos.' },
    ],
    howTitle: 'Cómo se hace',
    steps: [
      { n: '01', title: 'Pedís', body: 'Sin stock. Sin almacén. Tu pedido activa la producción — nada espera en un estante.' },
      { n: '02', title: 'Imprimimos', body: 'Impreso en equipos profesionales en 3–5 días hábiles. Cada pad se revisa antes de salir.' },
      { n: '03', title: 'Te llega', body: 'Embalado plano para minimizar daños. Seguimiento enviado en cuanto sale. Envío gratis en USA en pedidos superiores a $50.' },
    ],
    ctaNote: 'Esa es toda la operación. Si tiene sentido para vos — vení a encontrar tu superficie.',
    cta: 'Ver todos los productos',
  },
}

export default function AboutPage() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

      <div className="mb-16">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-4">{t.label}</p>
        <h1 className="text-4xl sm:text-5xl font-black text-[#f0f0f5] leading-tight mb-6">
          {t.title}{' '}
          <span className="text-[#8888a0]">{t.titleHighlight}</span>
        </h1>
        <p className="text-base text-[#c0c0d0] leading-relaxed">{t.intro}</p>
      </div>

      <div className="mb-16 pb-16 border-b border-[#1e1e2e]">
        <h2 className="text-xl font-bold text-[#f0f0f5] mb-4">{t.whatTitle}</h2>
        <p className="text-sm text-[#c0c0d0] leading-relaxed mb-4">{t.what1}</p>
        <p className="text-sm text-[#c0c0d0] leading-relaxed">{t.what2}</p>
      </div>

      <div className="mb-16 pb-16 border-b border-[#1e1e2e]">
        <h2 className="text-xl font-bold text-[#f0f0f5] mb-6">{t.whoTitle}</h2>
        <div className="grid gap-4">
          {t.profiles.map((p) => (
            <div key={p.label} className="flex gap-4 p-5 rounded-xl bg-[#0d0d14] border border-[#1e1e2e]">
              <div className="w-1.5 rounded-full bg-gradient-to-b from-cyan to-violet shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#f0f0f5] mb-1">{p.label}</p>
                <p className="text-sm text-[#8888a0] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 pb-16 border-b border-[#1e1e2e]">
        <h2 className="text-xl font-bold text-[#f0f0f5] mb-6">{t.howTitle}</h2>
        <div className="space-y-6">
          {t.steps.map((step) => (
            <div key={step.n} className="flex gap-5 items-start">
              <span className="text-2xl font-black text-[#1e1e2e] leading-none pt-0.5">{step.n}</span>
              <div>
                <p className="text-sm font-semibold text-[#f0f0f5] mb-1">{step.title}</p>
                <p className="text-sm text-[#8888a0] leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-[#8888a0] mb-4">{t.ctaNote}</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-cyan text-background text-sm font-bold px-6 py-3 rounded-xl hover:bg-cyan/90 transition-colors"
        >
          {t.cta}
        </Link>
      </div>

    </div>
  )
}
