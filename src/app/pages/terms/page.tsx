export const metadata = { title: 'Terms of Service — VoidPad' }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-black text-[#f0f0f5] mb-2">Términos del Servicio</h1>
      <p className="text-sm text-[#8888a0] mb-10">Terms of Service / Términos y Condiciones</p>

      <div className="space-y-5 text-[#c0c0d0] leading-relaxed text-sm">

        <p>Al acceder o realizar una compra en VoidPad, aceptas los presentes términos y condiciones.</p>

        <div className="space-y-4">
          <Item n="1" text="Los productos ofrecidos están sujetos a disponibilidad de stock." />
          <Item n="2" text="Los precios mostrados incluyen los impuestos aplicables salvo indicación expresa en contrario." />
          <Item n="3" text="VoidPad se reserva el derecho de modificar precios, promociones y productos sin previo aviso." />
          <Item n="4" text="El cliente es responsable de proporcionar información correcta y actualizada para la gestión de su pedido." />
          <Item n="5" text="VoidPad podrá cancelar pedidos cuando existan errores evidentes de precio, problemas de disponibilidad o indicios razonables de fraude." />
          <Item n="6" text="Los tiempos de entrega son estimados y pueden variar por causas ajenas a VoidPad." />
          <Item n="7" text="Las devoluciones y reembolsos se regirán por la Política de Reembolsos y Devoluciones publicada en la tienda." />
          <Item n="8" text="VoidPad no será responsable de daños indirectos, pérdidas de beneficios o perjuicios derivados del uso de los productos más allá de lo establecido por la legislación aplicable." />
          <Item n="9" text="Estos términos se regirán por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales competentes conforme a la normativa vigente." />
        </div>

        <div className="pt-6 border-t border-[#1e1e2e]">
          <p className="text-[#8888a0]">
            Para cualquier consulta relacionada con estos términos, puedes contactarnos en{' '}
            <a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">
              acrformvg@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}

function Item({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex gap-4">
      <span className="shrink-0 w-7 h-7 rounded-full bg-violet/20 border border-violet/30 text-violet text-xs font-bold flex items-center justify-center">
        {n}
      </span>
      <p className="pt-1">{text}</p>
    </div>
  )
}
