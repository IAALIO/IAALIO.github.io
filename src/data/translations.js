export const translations = {
  es: {
    nav: { inicio: 'Inicio', precios: 'Precios', requisitos: 'Requisitos', verificar: 'Verificar', tramite: 'Iniciar Trámite', comoFunciona: 'Cómo Funciona', faq: 'FAQ' },
    hero: {
      badge: 'Entidad Oficial de Trámites Internacionales',
      title: 'Tu Permiso Internacional',
      titleAccent: 'de Conducir',
      subtitle: 'Obtén tu licencia internacional válida en más de 150 países. Proceso 100% digital, aprobado por la Convención de Ginebra 1949.',
      cta: 'Iniciar Solicitud',
      verify: 'Verificar Licencia',
      stats: { paises: 'Países', respuesta: 'Respuesta', legal: 'Legal' }
    },
    how: {
      title: '¿Cómo Funciona?',
      subtitle: 'Obtén tu permiso internacional en 3 simples pasos.',
      step1: { title: 'Completa tu Solicitud', desc: 'Llena el formulario con tus datos personales y sube los documentos requeridos.' },
      step2: { title: 'Pago y Verificación', desc: 'Realiza el pago y nuestro equipo verificará tu documentación en un plazo de 24 horas.' },
      step3: { title: 'Recibe tu Permiso', desc: 'Recibe tu permiso internacional en formato digital y físico vía courier en tu domicilio.' }
    },
    pricing: {
      title: 'Planes y Vigencias',
      subtitle: 'Elige el plan que mejor se adapte a tus necesidades de viaje.',
      recommended: 'MÁS POPULAR',
      select: 'Seleccionar Plan',
      plans: [
        { title: '1 Año', price: '$70', desc: 'Perfecto para viajes cortos.', features: ['Documento Digital + Físico', 'Válido en 150+ países', 'Soporte 24/7', 'Envío courier incluido'] },
        { title: '2 Años', price: '$100', desc: 'La opción favorita de nuestros usuarios.', features: ['Todo lo del plan 1 año', 'Envío prioritario', 'Descuento en renovación', 'Asesoría legal básica'] },
        { title: '5 Años', price: '$150', desc: 'Tranquilidad a largo plazo.', features: ['Todo lo del plan 2 años', 'Reposición gratuita', 'Vigencia extendida', 'Soporte VIP prioritario'] }
      ]
    },
    requirements: {
      title: 'Requisitos para tu ',
      titleAccent: 'Trámite',
      subtitle: 'Para procesar tu licencia internacional necesitarás tener a la mano la siguiente información y documentos.',
      items: [
        { icon: 'User', title: 'Datos Personales', desc: 'Nombre completo, fecha de nacimiento, estatura, tipo de sangre y color de ojos.' },
        { icon: 'MapPin', title: 'Residencia', desc: 'País de nacimiento y país de residencia actual.' },
        { icon: 'FileText', title: 'Documentación', desc: 'Pasaporte o Cédula de identidad vigente.' },
        { icon: 'CreditCard', title: 'Licencia Local', desc: 'Foto de tu licencia de conducir vigente de tu país.' },
        { icon: 'Camera', title: 'Fotografías', desc: 'Foto tipo carnet y foto de tu firma en fondo blanco.' },
        { icon: 'Mail', title: 'Contacto', desc: 'Correo electrónico y número de teléfono con código de área.' }
      ],
      cta: 'Ir al Formulario',
      sidebar: { title: '¿Todo Listo?', desc: 'Si tienes estos documentos preparados, inicia tu solicitud ahora.', feature1: 'Validación Instantánea', feature2: 'Protección de Datos' }
    },
    form: {
      title: 'Solicitud de Licencia',
      subtitle: 'Completa el formulario para iniciar tu trámite internacional.',
      steps: ['Personal', 'Físicos', 'Fotos', 'Contacto'],
      step1: { title: 'Información Personal', nombre: 'Nombre Completo', nombrePlaceholder: 'Ej. Juan Pérez', paisNac: 'País de Nacimiento', paisNacPlaceholder: 'Ej. Colombia', fechaNac: 'Fecha de Nacimiento', paisRes: 'País de Residencia', paisResPlaceholder: 'Ej. España', vigencia: 'Vigencia Deseada' },
      step2: { title: 'Detalles Físicos', estatura: 'Estatura (cm)', estaturaPlaceholder: 'Ej. 175', sangre: 'Tipo de Sangre', ojos: 'Color de Ojos', ojosPlaceholder: 'Ej. Café' },
      step3: { title: 'Documentación (Fotos)', desc: 'Obligatorio: Suba las 4 fotos requeridas.', carnet: 'Foto Tipo Carnet', firma: 'Foto de la Firma', idDoc: 'Pasaporte / Cédula', licencia: 'Licencia de Conducir Local' },
      step4: { title: 'Contacto Final', email: 'Correo Electrónico', emailPlaceholder: 'correo@ejemplo.com', telefono: 'Número de Teléfono', telefonoPlaceholder: '+51 999 999 999', terms: 'Al enviar, acepta nuestros términos y condiciones y el procesamiento de sus datos para la emisión de la licencia internacional.' },
      next: 'Siguiente', prev: 'Anterior', submit: 'Enviar Solicitud', sending: 'Enviando...', alertStep: 'Complete todos los campos obligatorios.', alertEmail: 'Complete su Correo y Teléfono.'
    },
    search: {
      title: 'Verificar Licencia',
      subtitle: 'Consulta el estado y validez de tu licencia internacional.',
      placeholder: 'Ingrese su DNI o ID de trámite...',
      search: 'Buscar',
      found: 'Licencia Encontrada',
      valid: 'Documento Válido',
      notFound: 'Sin Resultados',
      notFoundDesc: 'No encontramos una licencia asociada al documento',
      holder: 'Titular', status: 'Estado', validUntil: 'Válido Hasta', category: 'Categoría',
      download: 'Descargar Certificado PDF',
      idTramite: 'ID Trámite', docNum: 'N° Documento',
      issuedBy: 'Emitido por LIO',
      height: 'Estatura', bloodType: 'Tipo Sangre', dob: 'F. Nacimiento', nationality: 'Nacionalidad',
      eyeColor: 'Color Ojos',
      linkLabel: 'Documento Relacionado',
      viewPhoto: 'Ver Foto Original',
      photoLabel: 'Foto del Titular',
      footer: 'Documento oficial verificado electrónicamente por LIO'
    },
    admin: {
      title: 'Acceso Administrativo',
      password: 'Contraseña',
      enter: 'Entrar',
      unauthorized: 'Acceso Restringido',
      wrongPwd: 'Contraseña incorrecta',
      dashboard: 'Panel de Control',
      dashboardSub: 'Gestión de licencias LIO',
      logout: 'Salir',
      pending: 'Pendientes',
      issued: 'Emitidas',
      uptime: 'Sistema',
      newLicense: 'Nueva Licencia',
      newLicenseDesc: 'Publica una licencia para que el usuario pueda consultarla.',
      docNumLabel: 'N° Documento', docNumPlaceholder: 'Ej. 12345678',
      nameLabel: 'Nombre', namePlaceholder: 'Ej. Juan Pérez',
      expiryLabel: 'Vencimiento', categoryLabel: 'Categoría',
      status: 'Estado', totalLicenses: 'Total Licencias',
      active: 'Activas', expired: 'Vencidas',
      fileLabel: 'Archivo PDF', publish: 'Publicar',
      success: 'Guardado exitoso', error: 'Error al guardar'
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Resuelve tus dudas sobre el permiso internacional de conducir.',
      q1: { q: '¿Es válido en todos los países?', r: 'Sí, es válido en más de 150 países firmantes de la Convención de Ginebra 1949 y la Convención de Viena 1968.' },
      q2: { q: '¿Necesito mi licencia nacional vigente?', r: 'Sí, el permiso internacional es un complemento a tu licencia nacional. Debes portar AMBAS siempre.' },
      q3: { q: '¿Cuánto tiempo tarda el trámite?', r: 'El proceso completo toma entre 24 y 48 horas hábiles después de recibir tu documentación.' },
      q4: { q: '¿Cómo recibo mi permiso?', r: 'Recibes una copia digital por email y el documento físico por courier a tu domicilio.' },
      q5: { q: '¿Puedo renovar mi permiso?', r: 'Sí, ofrecemos descuentos especiales para renovaciones antes del vencimiento.' }
    },
    footer: {
      desc: 'License International Official (LIO) — Permiso Internacional de Conducir con validez global bajo la Convención de Ginebra 1949.',
      quickLinks: 'Enlaces',
      support: 'Soporte',
      contact: 'Contacto',
      faq: 'Preguntas Frecuentes',
      terms: 'Términos y Condiciones',
      privacy: 'Privacidad',
      copyright: 'License International Official (LIO). Todos los derechos reservados.'
    }
  },
  en: {
    nav: { inicio: 'Home', precios: 'Pricing', requisitos: 'Requirements', verificar: 'Verify', tramite: 'Apply Now', comoFunciona: 'How It Works', faq: 'FAQ' },
    hero: {
      badge: 'Official International Driving Permit Entity',
      title: 'Your International',
      titleAccent: 'Driving Permit',
      subtitle: 'Get your international license valid in over 150 countries. 100% digital process, approved by the Geneva Convention 1949.',
      cta: 'Start Application',
      verify: 'Verify License',
      stats: { paises: 'Countries', respuesta: 'Response', legal: 'Legal' }
    },
    how: {
      title: 'How It Works',
      subtitle: 'Get your international permit in 3 simple steps.',
      step1: { title: 'Complete Your Application', desc: 'Fill out the form with your details and upload required documents.' },
      step2: { title: 'Payment & Verification', desc: 'Make the payment and our team will verify your documents within 24 hours.' },
      step3: { title: 'Receive Your Permit', desc: 'Get your international permit digitally and physically via courier.' }
    },
    pricing: {
      title: 'Plans & Pricing',
      subtitle: 'Choose the plan that fits your travel needs.',
      recommended: 'MOST POPULAR',
      select: 'Select Plan',
      plans: [
        { title: '1 Year', price: '$70', desc: 'Perfect for short trips.', features: ['Digital + Physical Document', 'Valid in 150+ countries', '24/7 Support', 'Courier delivery included'] },
        { title: '2 Years', price: '$100', desc: 'Our users\' favorite choice.', features: ['Everything in 1 year plan', 'Priority shipping', 'Renewal discount', 'Basic legal advice'] },
        { title: '5 Years', price: '$150', desc: 'Long-term peace of mind.', features: ['Everything in 2 year plan', 'Free replacement', 'Extended validity', 'VIP priority support'] }
      ]
    },
    requirements: {
      title: 'Requirements for your ',
      titleAccent: 'Application',
      subtitle: 'To process your international license, please have the following ready.',
      items: [
        { icon: 'User', title: 'Personal Info', desc: 'Full name, date of birth, height, blood type, eye color.' },
        { icon: 'MapPin', title: 'Residence', desc: 'Country of birth and current residence.' },
        { icon: 'FileText', title: 'Documents', desc: 'Valid passport or national ID.' },
        { icon: 'CreditCard', title: 'Local License', desc: 'Photo of your valid driver\'s license.' },
        { icon: 'Camera', title: 'Photos', desc: 'Passport photo and signature photo on white background.' },
        { icon: 'Mail', title: 'Contact', desc: 'Email and phone number with area code.' }
      ],
      cta: 'Go to Form',
      sidebar: { title: 'Ready?', desc: 'If you have these ready, start your application now.', feature1: 'Instant Validation', feature2: 'Data Protection' }
    },
    form: {
      title: 'License Application',
      subtitle: 'Complete the form to start your international process.',
      steps: ['Personal', 'Physical', 'Photos', 'Contact'],
      step1: { title: 'Personal Information', nombre: 'Full Name', nombrePlaceholder: 'e.g. John Doe', paisNac: 'Country of Birth', paisNacPlaceholder: 'e.g. USA', fechaNac: 'Date of Birth', paisRes: 'Country of Residence', paisResPlaceholder: 'e.g. Spain', vigencia: 'Desired Validity' },
      step2: { title: 'Physical Details', estatura: 'Height (cm)', estaturaPlaceholder: 'e.g. 175', sangre: 'Blood Type', ojos: 'Eye Color', ojosPlaceholder: 'e.g. Brown' },
      step3: { title: 'Photos', desc: 'Required: Upload all 4 photos.', carnet: 'Passport Photo', firma: 'Signature Photo', idDoc: 'Passport / ID', licencia: 'Local License' },
      step4: { title: 'Final Contact', email: 'Email', emailPlaceholder: 'email@example.com', telefono: 'Phone', telefonoPlaceholder: '+1 555 555 5555', terms: 'By submitting, you agree to our terms and data processing for license issuance.' },
      next: 'Next', prev: 'Previous', submit: 'Submit Application', sending: 'Sending...', alertStep: 'Fill in all required fields.', alertEmail: 'Complete Email and Phone.'
    },
    search: {
      title: 'Verify License',
      subtitle: 'Check the status and validity of your international license.',
      placeholder: 'Enter your ID or application number...',
      search: 'Search',
      found: 'License Found',
      valid: 'Valid Document',
      notFound: 'No Results',
      notFoundDesc: 'No license found for document',
      holder: 'Holder', status: 'Status', validUntil: 'Valid Until', category: 'Category',
      download: 'Download PDF Certificate',
      idTramite: 'App ID', docNum: 'Document N°',
      issuedBy: 'Issued by LIO',
      height: 'Height', bloodType: 'Blood Type', dob: 'D.O.B.', nationality: 'Nationality',
      eyeColor: 'Eye Color',
      linkLabel: 'Related Document',
      viewPhoto: 'View Original Photo',
      photoLabel: 'Holder Photo',
      footer: 'Electronically verified official document issued by LIO'
    },
    admin: {
      title: 'Admin Access',
      password: 'Password',
      enter: 'Enter',
      unauthorized: 'Restricted Access',
      wrongPwd: 'Wrong password',
      dashboard: 'Dashboard',
      dashboardSub: 'LIO license management',
      logout: 'Logout',
      pending: 'Pending',
      issued: 'Issued',
      uptime: 'System',
      newLicense: 'New License',
      newLicenseDesc: 'Publish a license for user consultation.',
      docNumLabel: 'Document N°', docNumPlaceholder: 'e.g. 12345678',
      nameLabel: 'Name', namePlaceholder: 'e.g. John Doe',
      expiryLabel: 'Expiry', categoryLabel: 'Category',
      status: 'Status', totalLicenses: 'Total Licenses',
      active: 'Active', expired: 'Expired',
      fileLabel: 'PDF File', publish: 'Publish',
      success: 'Saved successfully', error: 'Error saving'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions about the international driving permit.',
      q1: { q: 'Is it valid in all countries?', r: 'Yes, valid in over 150 countries signatory to the Geneva Convention 1949 and Vienna Convention 1968.' },
      q2: { q: 'Do I need my valid national license?', r: 'Yes, the international permit complements your national license. Carry BOTH at all times.' },
      q3: { q: 'How long does the process take?', r: 'The complete process takes 24-48 business hours after receiving your documentation.' },
      q4: { q: 'How do I receive my permit?', r: 'You get a digital copy via email and the physical document via courier to your address.' },
      q5: { q: 'Can I renew my permit?', r: 'Yes, we offer special discounts for renewals before expiry.' }
    },
    footer: {
      desc: 'License International Official (LIO) — Global International Driving Permit under the Geneva Convention 1949.',
      quickLinks: 'Quick Links',
      support: 'Support',
      contact: 'Contact',
      faq: 'FAQ',
      terms: 'Terms & Conditions',
      privacy: 'Privacy',
      copyright: 'License International Official (LIO). All rights reserved.'
    }
  }
}
