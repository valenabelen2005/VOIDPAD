'use client'
import { useLanguageStore } from '@/store/language'

const content = {
  en: {
    title: 'Terms of Service',
    subtitle: 'Terms of Service / Términos y Condiciones',
    intro: 'By accessing or making a purchase at VoidPad, you accept these terms and conditions.',
    items: [
      'Products offered are subject to stock availability.',
      'Prices shown include applicable taxes unless expressly stated otherwise.',
      'VoidPad reserves the right to modify prices, promotions, and products without prior notice.',
      'The customer is responsible for providing correct and up-to-date information for order processing.',
      'VoidPad may cancel orders where there are obvious pricing errors, availability issues, or reasonable indications of fraud.',
      'Delivery times are estimates and may vary due to reasons beyond VoidPad\'s control.',
      'Returns and refunds will be governed by the Refund and Returns Policy published in the store.',
      'VoidPad shall not be liable for indirect damages, loss of profits, or harm arising from the use of the products beyond what is established by applicable law.',
      'These terms shall be governed by Spanish law. Any dispute shall be submitted to the competent courts in accordance with current regulations.',
    ],
    contact: 'For any questions related to these terms, you can contact us at',
  },
  es: {
    title: 'Términos del Servicio',
    subtitle: 'Términos y Condiciones',
    intro: 'Al acceder o realizar una compra en VoidPad, aceptas los presentes términos y condiciones.',
    items: [
      'Los productos ofrecidos están sujetos a disponibilidad de stock.',
      'Los precios mostrados incluyen los impuestos aplicables salvo indicación expresa en contrario.',
      'VoidPad se reserva el derecho de modificar precios, promociones y productos sin previo aviso.',
      'El cliente es responsable de proporcionar información correcta y actualizada para la gestión de su pedido.',
      'VoidPad podrá cancelar pedidos cuando existan errores evidentes de precio, problemas de disponibilidad o indicios razonables de fraude.',
      'Los tiempos de entrega son estimados y pueden variar por causas ajenas a VoidPad.',
      'Las devoluciones y reembolsos se regirán por la Política de Reembolsos y Devoluciones publicada en la tienda.',
      'VoidPad no será responsable de daños indirectos, pérdidas de beneficios o perjuicios derivados del uso de los productos más allá de lo establecido por la legislación aplicable.',
      'Estos términos se regirán por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales competentes conforme a la normativa vigente.',
    ],
    contact: 'Para cualquier consulta relacionada con estos términos, puedes contactarnos en',
  },
}

export default function TermsPage() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-black text-[#f0f0f5] mb-2">{t.title}</h1>
      <p className="text-sm text-[#8888a0] mb-10">{t.subtitle}</p>

      <div className="space-y-5 text-[#c0c0d0] leading-relaxed text-sm">
        <p>{t.intro}</p>

        <div className="space-y-4">
          {t.items.map((text, i) => (
            <div key={i} className="flex gap-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-violet/20 border border-violet/30 text-violet text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="pt-1">{text}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-[#1e1e2e]">
          <p className="text-[#8888a0]">
            {t.contact}{' '}
            <a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">
              acrformvg@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
