'use client'
import { useLanguageStore } from '@/store/language'

const sections = {
  en: [
    {
      title: 'Personal Information We Collect or Process',
      items: [
        'Contact details including your name, address, billing address, shipping address, phone number, and email address.',
        'Financial information including credit card, debit card, and financial account numbers, payment card information, transaction details, form of payment, and other payment details.',
        'Account information including your username, password, security questions, preferences and settings.',
        'Transaction information including the items you view, put in your cart, purchase, return, exchange or cancel and your past transactions.',
        'Communications with us including the information you include in communications with us, for example, when sending a customer support inquiry.',
        'Device information including information about your device, browser, or network connection, your IP address, and other unique identifiers.',
        'Usage information including information regarding your interaction with the Services.',
      ],
    },
    {
      title: 'Personal Information Sources',
      body: 'We may collect personal information from: directly from you when you create an account or use the Services; automatically through the Services via cookies and similar technologies; from our service providers; from our partners or other third parties.',
    },
    {
      title: 'How We Use Your Personal Information',
      body: 'We use personal information to: provide and improve the Services, process payments and fulfill orders, send account notifications, arrange shipping, facilitate returns and exchanges, send marketing communications, prevent fraud, provide customer support, and comply with applicable law.',
    },
    {
      title: 'How We Disclose Personal Information',
      body: 'We may disclose your personal information to Shopify and third-party vendors performing services on our behalf, marketing partners, and in connection with legal obligations or business transactions such as a merger.',
    },
    {
      title: 'Relationship with Shopify',
      body: 'The Services are hosted by Shopify, which collects and processes personal information about your access and use of the Services. To learn more, visit the Shopify Consumer Privacy Policy at shopify.com/legal/privacy/consumers.',
    },
    {
      title: 'Security and Retention',
      body: 'We take reasonable measures to protect your personal information. How long we retain it depends on whether we need it to maintain your account, provide Services, comply with legal obligations, or resolve disputes.',
    },
    {
      title: 'Your Rights and Choices',
      body: 'Depending on where you live, you may have rights to access, delete, correct, or port your personal information; opt out of sale or targeted advertising; and manage communication preferences. If you reside in the EEA or UK, you may also have rights to object to or restrict processing and to withdraw consent.',
    },
    {
      title: 'International Transfers',
      body: 'We may transfer, store and process your personal information outside the country you live in. Transfers out of the EEA or UK will rely on recognized mechanisms like the European Commission\'s Standard Contractual Clauses.',
    },
    {
      title: 'Changes to This Privacy Policy',
      body: 'We may update this Privacy Policy from time to time. We will post the revised policy on this website and update the "Last updated" date.',
    },
  ],
  es: [
    {
      title: 'Información Personal que Recopilamos o Procesamos',
      items: [
        'Datos de contacto, incluyendo nombre, dirección, dirección de facturación y envío, número de teléfono y correo electrónico.',
        'Información financiera, incluyendo números de tarjeta de crédito o débito, datos de pago, detalles de transacciones y confirmaciones de pago.',
        'Información de cuenta, incluyendo nombre de usuario, contraseña, preguntas de seguridad, preferencias y configuraciones.',
        'Información de transacciones, incluyendo los artículos que visualizas, añades al carrito, compras, devuelves, cambias o cancelas, y tu historial de compras.',
        'Comunicaciones con nosotros, incluyendo la información que incluyes en tus consultas de soporte u otros mensajes.',
        'Información del dispositivo, incluyendo datos sobre tu dispositivo, navegador, conexión de red, dirección IP e identificadores únicos.',
        'Información de uso, incluyendo cómo y cuándo interactúas con los Servicios.',
      ],
    },
    {
      title: 'Fuentes de Información Personal',
      body: 'Podemos recopilar información personal directamente de ti al crear una cuenta o usar los Servicios; de forma automática a través de cookies y tecnologías similares; de nuestros proveedores de servicios; y de socios u otros terceros.',
    },
    {
      title: 'Cómo Usamos tu Información Personal',
      body: 'Usamos la información personal para: proporcionar y mejorar los Servicios, procesar pagos y gestionar pedidos, enviar notificaciones de cuenta, coordinar envíos, facilitar devoluciones e intercambios, enviar comunicaciones de marketing, prevenir fraudes, ofrecer soporte al cliente y cumplir con la legislación aplicable.',
    },
    {
      title: 'Cómo Compartimos tu Información Personal',
      body: 'Podemos compartir tu información personal con Shopify y proveedores de servicios que actúan en nuestro nombre, socios de marketing, y en el contexto de obligaciones legales o transacciones comerciales como una fusión.',
    },
    {
      title: 'Relación con Shopify',
      body: 'Los Servicios están alojados por Shopify, que recopila y procesa información personal sobre tu acceso y uso de los Servicios. Para más información, visita la Política de Privacidad de Shopify en shopify.com/legal/privacy/consumers.',
    },
    {
      title: 'Seguridad y Retención',
      body: 'Adoptamos medidas razonables para proteger tu información personal. El tiempo de retención depende de si necesitamos la información para mantener tu cuenta, proporcionar los Servicios, cumplir con obligaciones legales o resolver disputas.',
    },
    {
      title: 'Tus Derechos y Opciones',
      body: 'Según dónde residas, puedes tener derechos de acceso, eliminación, corrección o portabilidad de tu información personal; derecho a oponerte a la venta o publicidad segmentada; y a gestionar tus preferencias de comunicación. Si resides en el EEE o el Reino Unido, también puedes oponerte al procesamiento, restringirlo y retirar tu consentimiento.',
    },
    {
      title: 'Transferencias Internacionales',
      body: 'Podemos transferir, almacenar y procesar tu información personal fuera del país donde resides. Las transferencias fuera del EEE o del Reino Unido se realizarán mediante mecanismos reconocidos, como las Cláusulas Contractuales Estándar de la Comisión Europea.',
    },
    {
      title: 'Cambios en esta Política de Privacidad',
      body: 'Podemos actualizar esta Política de Privacidad periódicamente. Publicaremos la versión revisada en este sitio web y actualizaremos la fecha de "Última actualización".',
    },
  ],
}

const ui = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: June 10, 2026',
    intro: 'VoidPad operates this store and website to provide you with a curated shopping experience (the "Services"). This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase using the Services. By using and accessing any of the Services, you acknowledge that you have read and understand this Privacy Policy.',
    contactTitle: 'Contact',
    contactBody: 'For questions about our privacy practices or to exercise your rights, please contact us:',
    emailLabel: 'Email',
    addressLabel: 'Address',
  },
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: 10 de junio de 2026',
    intro: 'VoidPad opera esta tienda y sitio web para ofrecerte una experiencia de compra personalizada (los "Servicios"). Esta Política de Privacidad describe cómo recopilamos, usamos y divulgamos tu información personal cuando visitas, utilizas o realizas una compra a través de los Servicios. Al usar y acceder a cualquiera de los Servicios, reconoces haber leído y comprendido esta Política de Privacidad.',
    contactTitle: 'Contacto',
    contactBody: 'Para preguntas sobre nuestras prácticas de privacidad o para ejercer tus derechos, contáctanos:',
    emailLabel: 'Correo electrónico',
    addressLabel: 'Dirección',
  },
}

export default function PrivacyPage() {
  const locale = useLanguageStore((s) => s.locale)
  const t = ui[locale]
  const secs = sections[locale]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-black text-[#f0f0f5] mb-2">{t.title}</h1>
      <p className="text-sm text-[#8888a0] mb-10">{t.updated}</p>

      <div className="space-y-8 text-sm text-[#c0c0d0] leading-relaxed">
        <p>{t.intro}</p>

        {secs.map((sec) => (
          <div key={sec.title} className="space-y-3">
            <h2 className="text-base font-bold text-[#f0f0f5] border-b border-[#1e1e2e] pb-2">{sec.title}</h2>
            {'items' in sec && sec.items ? (
              <ul className="list-disc pl-5 space-y-1.5">
                {sec.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p>{'body' in sec ? sec.body : ''}</p>
            )}
          </div>
        ))}

        <div className="space-y-3">
          <h2 className="text-base font-bold text-[#f0f0f5] border-b border-[#1e1e2e] pb-2">{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <p><strong className="text-[#f0f0f5]">{t.emailLabel}:</strong>{' '}
            <a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">acrformvg@gmail.com</a>
          </p>
          <p><strong className="text-[#f0f0f5]">{t.addressLabel}:</strong> Calle Faro 17, MA, 29008, Spain</p>
        </div>
      </div>
    </div>
  )
}
