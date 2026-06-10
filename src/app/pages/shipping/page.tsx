export const metadata = { title: 'Shipping & Returns — VoidPad' }

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-2">Policies</p>
        <h1 className="text-3xl font-black text-[#f0f0f5]">Shipping & Returns</h1>
      </div>

      <div className="space-y-10 text-sm text-[#c0c0d0] leading-relaxed">

        <Block title="Production Time">
          <p>Every VoidPad is printed on demand — your order goes into production as soon as payment is confirmed. Production typically takes <strong className="text-[#f0f0f5]">3–5 business days</strong>.</p>
        </Block>

        <Block title="Shipping Times">
          <p>Once dispatched, estimated delivery times:</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { region: 'Spain', time: '3–6 business days' },
              { region: 'EU (Central)', time: '5–8 business days' },
              { region: 'EU (Other)', time: '7–10 business days' },
              { region: 'Outside EU', time: 'Contact us' },
            ].map((r) => (
              <div key={r.region} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
                <span className="text-[#8888a0]">{r.region}</span>
                <span className="font-semibold text-[#f0f0f5]">{r.time}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[#8888a0]">These are estimates and may vary due to carrier delays or high demand periods.</p>
        </Block>

        <Block title="Shipping Costs">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
              <span className="text-[#8888a0]">Orders over €50</span>
              <span className="font-semibold text-cyan">Free</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
              <span className="text-[#8888a0]">Orders under €50</span>
              <span className="font-semibold text-[#f0f0f5]">Flat rate shown at checkout</span>
            </div>
          </div>
          <p className="mt-3 text-[#8888a0]">No EU customs fees — all applicable taxes are included in the displayed price.</p>
        </Block>

        <Block title="Order Tracking">
          <p>Once your order is shipped, you will receive an email with a tracking number. Use it on the carrier's website to follow your delivery in real time.</p>
        </Block>

        <Block title="Returns & Exchanges">
          <p>Because each product is printed on demand specifically for your order, we do <strong className="text-[#f0f0f5]">not accept returns or exchanges for change of mind</strong>.</p>
          <p className="mt-2">However, if your order arrives <strong className="text-[#f0f0f5]">damaged, defective, or with a print quality issue</strong>, we will make it right at no cost to you. Contact us within <strong className="text-[#f0f0f5]">14 days of delivery</strong> at{' '}
            <a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">acrformvg@gmail.com</a> with:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-[#8888a0]">
            <li>Your order number</li>
            <li>A photo of the issue</li>
            <li>A brief description</li>
          </ul>
          <p className="mt-2">We will send a replacement or issue a full refund — your choice.</p>
        </Block>

        <Block title="Wrong Address">
          <p>Please double-check your shipping address at checkout. We are unable to redirect orders once production has started. If you notice a mistake, contact us immediately at{' '}
            <a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">acrformvg@gmail.com</a> and we will do our best to help.</p>
        </Block>

      </div>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-[#f0f0f5] border-b border-[#1e1e2e] pb-2">{title}</h2>
      <div>{children}</div>
    </div>
  )
}
