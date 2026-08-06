import { X } from 'lucide-react'
import { useLang } from '../App'

const TermsModal = ({ isOpen, onClose }) => {
  const { lang } = useLang()
  if (!isOpen) return null

  const es = lang === 'es'

  const content = es ? (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">Términos y Condiciones</h2>
      <p className="text-xs text-text-muted mb-4 italic">Producto: Tarjeta de traducción internacional de licencia de conducir. NO es un documento gubernamental ni una licencia oficial de conducir.</p>

      <div className="space-y-3 text-xs text-text-muted">
        <div><span className="font-bold text-primary">1. DEFINICIÓN DEL PRODUCTO.</span> IAA ofrece un servicio de traducción y diseño gráfico de la licencia nacional del solicitante a formato tarjeta plastificada. No emitimos licencias oficiales, no somos una entidad gubernamental. Es una tarjeta de traducción, no un permiso para conducir.</div>
        <div><span className="font-bold text-primary">2. NATURALEZA NO GUBERNAMENTAL.</span> IAA no está afiliada a ningún gobierno, entidad de tránsito, DMV, DGT ni autoridad similar. La tarjeta no reemplaza ni sustituye la licencia nacional oficial.</div>
        <div><span className="font-bold text-primary">3. ACEPTACIÓN DE TÉRMINOS.</span> Al usar el sitio, enviar una solicitud o realizar un pago, el usuario acepta estos términos íntegramente. Si no acepta, no debe usar el servicio.</div>
        <div><span className="font-bold text-primary">4. CAMBIOS EN LOS TÉRMINOS.</span> IAA puede modificar estos términos en cualquier momento. Los cambios son efectivos al publicarse en el sitio. El uso continuado constituye aceptación de la nueva versión.</div>
        <div><span className="font-bold text-primary">5. ELEGIBILIDAD.</span> El usuario declara: ser mayor de edad, tener licencia nacional válida y vigente, y que toda información proporcionada es verídica. IAA puede rechazar solicitudes sin necesidad de justificación.</div>
        <div><span className="font-bold text-primary">6. VERACIDAD DE LA INFORMACIÓN.</span> El usuario es el único responsable de la exactitud de los datos enviados. IAA no verifica la información contra registros oficiales.</div>
        <div><span className="font-bold text-primary">7. FOTOGRAFÍAS E IMÁGENES.</span> El usuario declara que las fotos enviadas son legítimas y le pertenecen. IAA las usará únicamente para producir la tarjeta.</div>
        <div><span className="font-bold text-primary">8. USO DE LOGOTIPOS.</span> Los logos IAA, ONU y FIA en la tarjeta son elementos decorativos que indican respaldo institucional del diseño. No implican que la tarjeta sea un documento oficial de dichas organizaciones.</div>
        <div><span className="font-bold text-primary">9. PROPIEDAD INTELECTUAL.</span> El diseño de la tarjeta, el sitio web, los logos y contenidos son propiedad de IAA o usados bajo licencia. El usuario no adquiere derechos sobre estos.</div>
        <div><span className="font-bold text-primary">10. LICENCIA DE USO LIMITADO.</span> IAA otorga al usuario una licencia limitada, no exclusiva e intransferible para usar la tarjeta únicamente como herramienta de traducción de su licencia nacional.</div>
        <div><span className="font-bold text-primary">11. OBLIGACIONES DEL USUARIO.</span> El usuario acepta: portar siempre la licencia nacional original junto a la tarjeta, no presentarla como documento oficial, no alterarla, y usarla solo para fines de traducción.</div>
        <div><span className="font-bold text-primary">12. USOS PROHIBIDOS.</span> El usuario no puede: usar la tarjeta para actividades ilegales, falsificarla, reproducirla sin autorización, usarla como identificación oficial, ni pretender que es una licencia de conducir.</div>
        <div><span className="font-bold text-primary">13. LIMITACIÓN DE RESPONSABILIDAD.</span> IAA no es responsable si: autoridades rechazan la tarjeta, el usuario recibe multas, la tarjeta se pierde en correo, hay daños por mal uso del usuario, o la tarjeta no es aceptada en algún país.</div>
        <div><span className="font-bold text-primary">14. SIN GARANTÍAS.</span> El servicio se presta "tal cual". IAA no garantiza que la tarjeta sea aceptada por autoridad alguna, ni que cumpla requisitos legales de país específico alguno.</div>
        <div><span className="font-bold text-primary">15. RECONOCIMIENTO DE RIESGO.</span> El usuario reconoce que usar la tarjeta implica riesgos y que IAA no garantiza resultados específicos. El usuario asume todos los riesgos asociados.</div>
        <div><span className="font-bold text-primary">16. INDEMNIZACIÓN.</span> El usuario indemniza a IAA por cualquier reclamo, pérdida o gasto derivado de: información falsa, uso indebido de la tarjeta, incumplimiento de estos términos, o violación de derechos de terceros.</div>
        <div><span className="font-bold text-primary">17. PRIVACIDAD Y DATOS PERSONALES.</span> IAA recopila: nombre, ID, fecha de nacimiento, nacionalidad, estatura, tipo de sangre, color de ojos, foto de rostro, foto de licencia, foto de firma, foto de cédula, email y teléfono. Almacenados en Google Workspace con acceso restringido.</div>
        <div><span className="font-bold text-primary">18. COMPARTIR DATOS CON TERCEROS.</span> IAA no vende ni comparte datos personales con terceros excepto: empresas de envío postal (dirección física) y cuando sea requerido por ley.</div>
        <div><span className="font-bold text-primary">19. RETENCIÓN DE DATOS.</span> Los datos se conservan mientras el usuario tenga una relación comercial con IAA, más el tiempo requerido por obligaciones fiscales y legales (mínimo 5 años).</div>
        <div><span className="font-bold text-primary">20. ELIMINACIÓN DE DATOS.</span> El usuario puede solicitar la eliminación de sus datos a través del formulario de solicitud del sitio web. IAA los eliminará en 30 días, salvo que la ley exija retención.</div>
        <div><span className="font-bold text-primary">21. POLÍTICA DE REEMBOLSOS.</span> No hay reembolso una vez que la tarjeta ha sido diseñada y puesta en producción, por ser producto personalizado. Excepción: si IAA no puede producirla, se reembolsa el total.</div>
        <div><span className="font-bold text-primary">22. REEMPLAZOS.</span> Si la tarjeta llega dañada por defecto de fábrica, IAA la reemplaza sin costo. Si se pierde o daña por uso del usuario, hay cargo por reposición.</div>
        <div><span className="font-bold text-primary">23. ENVÍO Y ENTREGA.</span> IAA no garantiza tiempos de entrega exactos. No es responsable por demoras postales, pérdidas en aduana, ni direcciones incorrectas proporcionadas por el usuario.</div>
        <div><span className="font-bold text-primary">24. ADUANAS E IMPUESTOS.</span> El usuario es responsable de cualquier impuesto, tasa o arancel de importación aplicable en su país.</div>
        <div><span className="font-bold text-primary">25. FUERZA MAYOR.</span> IAA no es responsable por retrasos causados por desastres naturales, pandemias, guerras, huelgas o cualquier evento fuera de su control.</div>
        <div><span className="font-bold text-primary">26. LEY APLICABLE.</span> Estos términos se rigen por las leyes de Panamá. Cualquier disputa se resolverá en dicha jurisdicción.</div>
        <div><span className="font-bold text-primary">27. RESOLUCIÓN DE DISPUTAS.</span> Antes de acción legal, ambas partes intentarán resolver la disputa mediante mediación. Si no es posible, se recurre a arbitraje vinculante.</div>
        <div><span className="font-bold text-primary">28. PLAZO PARA RECLAMOS.</span> Cualquier reclamo debe presentarse dentro de los 30 días posteriores a la recepción del producto. Reclamos fuera de este plazo serán rechazados.</div>
        <div><span className="font-bold text-primary">29. TERMINACIÓN DEL SERVICIO.</span> IAA puede cancelar o suspender el servicio si detecta fraude, información falsa, uso indebido o incumplimiento de estos términos, sin reembolso.</div>
        <div><span className="font-bold text-primary">30. SUSPENSIÓN POR SOSPECHA.</span> IAA puede suspender una solicitud si los datos parecen inconsistentes o potencialmente fraudulentos, mientras realiza una verificación.</div>
        <div><span className="font-bold text-primary">31. RESOLUCIÓN POR EL USUARIO.</span> El usuario puede cancelar su solicitud antes de la producción. Después de la producción, no es posible la cancelación ni reembolso.</div>
        <div><span className="font-bold text-primary">32. ACUERDO COMPLETO.</span> Estos términos constituyen el acuerdo completo entre IAA y el usuario, reemplazando cualquier entendimiento previo.</div>
        <div><span className="font-bold text-primary">33. RENUNCIA.</span> Si IAA no ejerce algún derecho, no implica renuncia al mismo. Los derechos solo se renuncian por escrito.</div>
        <div><span className="font-bold text-primary">34. SEVERABILIDAD.</span> Si una cláusula es inválida, las demás permanecen vigentes. La cláusula inválida se modificará al mínimo necesario para ser válida.</div>
        <div><span className="font-bold text-primary">35. CESIÓN.</span> El usuario no puede ceder sus derechos u obligaciones sin autorización escrita de IAA.</div>
        <div><span className="font-bold text-primary">36. NO ASOCIACIÓN.</span> Nada en estos términos crea una sociedad, empresa conjunta, agencia o relación laboral entre IAA y el usuario.</div>
        <div><span className="font-bold text-primary">37. IDIOMA PREDOMINANTE.</span> Si estos términos se traducen a múltiples idiomas, la versión en español prevalecerá en caso de discrepancia.</div>
        <div><span className="font-bold text-primary">38. COMUNICACIONES ELECTRÓNICAS.</span> El usuario acepta recibir comunicaciones electrónicas (email, WhatsApp) relacionadas con su solicitud.</div>
        <div><span className="font-bold text-primary">39. MAYORÍA DE EDAD.</span> El servicio es solo para personas mayores de edad. Si un menor proporciona datos, IAA los eliminará sin procesar la solicitud.</div>
        <div><span className="font-bold text-primary">40. JURISDICCIONES PROHIBIDAS.</span> IAA se reserva el derecho de no prestar servicio en ciertos países u operar donde sea ilegal o riesgoso.</div>
        <div><span className="font-bold text-primary">41. FRAUDE Y PREVENCIÓN.</span> IAA puede reportar actividades sospechosas a las autoridades competentes, incluyendo datos del usuario y detalles de la transacción.</div>
        <div><span className="font-bold text-primary">42. COSTOS LEGALES.</span> Si IAA debe emprender acciones legales para hacer cumplir estos términos, el usuario es responsable de los costos legales y honorarios de abogados.</div>
        <div><span className="font-bold text-primary">43. FIRMAS DIGITALES.</span> El envío del formulario constituye una firma electrónica vinculante. Los registros electrónicos son válidos como evidencia.</div>
        <div><span className="font-bold text-primary">44. LIMITACIÓN DE DAÑOS.</span> En ningún caso la responsabilidad de IAA excederá el monto pagado por el servicio. IAA no es responsable por daños consecuentes ni lucro cesante.</div>
        <div><span className="font-bold text-primary">45. EXENCIÓN POR MAL USO.</span> IAA no es responsable por daños causados por: mal uso de la tarjeta, uso en países prohibidos, alteración del contenido, o uso por persona distinta al titular.</div>
        <div><span className="font-bold text-primary">46. NO ENDOSO GUBERNAMENTAL.</span> El diseño de la tarjeta no implica endoso de ningún gobierno, consulado ni entidad oficial.</div>
        <div><span className="font-bold text-primary">47. USO MILITAR.</span> La tarjeta no está diseñada para uso militar, gubernamental oficial ni fuerzas armadas.</div>
        <div><span className="font-bold text-primary">48. TRADUCCIÓN INFORMATIVA.</span> Las traducciones en la tarjeta son de carácter informativo. El texto original en español prevalece.</div>
        <div><span className="font-bold text-primary">49. CONTACTO.</span> Toda comunicación se realizará a través del formulario de solicitud del sitio web. Notificaciones se consideran recibidas 24 horas después del envío.</div>
        <div><span className="font-bold text-primary">50. VIGENCIA.</span> Estos términos entran en vigencia al aceptarlos y permanecen hasta ser reemplazados.</div>
      </div>
    </>
  ) : (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">Terms & Conditions</h2>
      <p className="text-xs text-text-muted mb-4 italic">Product: International driver's license translation card. NOT a government document or official driver's license.</p>

      <div className="space-y-3 text-xs text-text-muted">
        <div><span className="font-bold text-primary">1. PRODUCT DEFINITION.</span> IAA provides a translation and graphic design service of the applicant's national license into a plastic card format. We do not issue official licenses and are not a government entity.</div>
        <div><span className="font-bold text-primary">2. NON-GOVERNMENTAL NATURE.</span> IAA is not affiliated with any government, DMV, DGT or similar authority. The card does not replace the official national license.</div>
        <div><span className="font-bold text-primary">3. ACCEPTANCE OF TERMS.</span> By using the site, submitting an application or making a payment, the user fully accepts these terms.</div>
        <div><span className="font-bold text-primary">4. CHANGES TO TERMS.</span> IAA may modify these terms at any time. Changes are effective upon publication. Continued use constitutes acceptance.</div>
        <div><span className="font-bold text-primary">5. ELIGIBILITY.</span> The user declares being of legal age, holding a valid national license, and all information provided is truthful.</div>
        <div><span className="font-bold text-primary">6. ACCURACY OF INFORMATION.</span> The user is solely responsible for the accuracy of submitted data.</div>
        <div><span className="font-bold text-primary">7. PHOTOGRAPHS.</span> The user declares that submitted photos are legitimate and belong to them. IAA will use them solely to produce the card.</div>
        <div><span className="font-bold text-primary">8. LOGO USAGE.</span> IAA, UN and FIA logos on the card are decorative. They do not imply the card is an official document of those organizations.</div>
        <div><span className="font-bold text-primary">9. INTELLECTUAL PROPERTY.</span> The card design, website, logos and content are the property of IAA or used under license.</div>
        <div><span className="font-bold text-primary">10. LIMITED LICENSE.</span> IAA grants a limited, non-exclusive, non-transferable license to use the card solely as a translation tool.</div>
        <div><span className="font-bold text-primary">11. USER OBLIGATIONS.</span> The user agrees to always carry the original national license with the card, not present it as an official document, and not alter it.</div>
        <div><span className="font-bold text-primary">12. PROHIBITED USES.</span> The user may not use the card for illegal activities, falsify it, or claim it is a driver's license.</div>
        <div><span className="font-bold text-primary">13. LIMITATION OF LIABILITY.</span> IAA is not liable if authorities reject the card, the user receives fines, the card is lost in mail, or the card is not accepted in any country.</div>
        <div><span className="font-bold text-primary">14. NO WARRANTIES.</span> The service is provided "as is." IAA does not guarantee acceptance by any authority.</div>
        <div><span className="font-bold text-primary">15. RISK ACKNOWLEDGMENT.</span> The user acknowledges that using the card involves risks and assumes all associated risks.</div>
        <div><span className="font-bold text-primary">16. INDEMNIFICATION.</span> The user indemnifies IAA for any claim or loss arising from false information, misuse of the card, or breach of these terms.</div>
        <div><span className="font-bold text-primary">17. PRIVACY AND DATA.</span> IAA collects: name, ID, date of birth, nationality, height, blood type, eye color, face photo, license photo, signature photo, ID photo, email and phone. Stored in Google Workspace with restricted access.</div>
        <div><span className="font-bold text-primary">18. DATA SHARING.</span> IAA does not sell or share personal data except with shipping companies and as required by law.</div>
        <div><span className="font-bold text-primary">19. DATA RETENTION.</span> Data is kept during the business relationship plus the time required by law (minimum 5 years).</div>
        <div><span className="font-bold text-primary">20. DATA DELETION.</span> Users may request deletion via the website application form. IAA will delete within 30 days unless required by law.</div>
        <div><span className="font-bold text-primary">21. REFUND POLICY.</span> No refund once the card is in production. Exception: if IAA cannot produce it, a full refund is issued.</div>
        <div><span className="font-bold text-primary">22. REPLACEMENTS.</span> If the card arrives damaged from manufacturing, IAA replaces it free of charge. Lost or user-damaged cards incur a replacement fee.</div>
        <div><span className="font-bold text-primary">23. SHIPPING.</span> IAA does not guarantee exact delivery times and is not responsible for postal delays or customs issues.</div>
        <div><span className="font-bold text-primary">24. CUSTOMS.</span> The user is responsible for any import duties or taxes in their country.</div>
        <div><span className="font-bold text-primary">25. FORCE MAJEURE.</span> IAA is not liable for delays from natural disasters, pandemics, wars, strikes or events beyond its control.</div>
        <div><span className="font-bold text-primary">26. GOVERNING LAW.</span> These terms are governed by the laws of Panama. Any dispute shall be resolved in that jurisdiction.</div>
        <div><span className="font-bold text-primary">27. DISPUTE RESOLUTION.</span> Before legal action, parties will attempt mediation. If unsuccessful, binding arbitration follows.</div>
        <div><span className="font-bold text-primary">28. CLAIM PERIOD.</span> Claims must be filed within 30 days of receiving the product.</div>
        <div><span className="font-bold text-primary">29. TERMINATION.</span> IAA may cancel service upon detecting fraud, false information, or breach of terms.</div>
        <div><span className="font-bold text-primary">30. SUSPENSION.</span> IAA may suspend an application if data appears inconsistent or potentially fraudulent pending verification.</div>
        <div><span className="font-bold text-primary">31. CANCELLATION BY USER.</span> The user may cancel before production. After production, no cancellation or refund is possible.</div>
        <div><span className="font-bold text-primary">32. ENTIRE AGREEMENT.</span> These terms constitute the complete agreement between IAA and the user.</div>
        <div><span className="font-bold text-primary">33. WAIVER.</span> IAA's failure to enforce a right does not waive it. Rights are waived only in writing.</div>
        <div><span className="font-bold text-primary">34. SEVERABILITY.</span> If a clause is invalid, the rest remain in effect.</div>
        <div><span className="font-bold text-primary">35. ASSIGNMENT.</span> The user may not assign their rights without IAA's written consent.</div>
        <div><span className="font-bold text-primary">36. NO PARTNERSHIP.</span> Nothing creates a partnership or agency relationship between IAA and the user.</div>
        <div><span className="font-bold text-primary">37. PREVAILING LANGUAGE.</span> The Spanish version prevails in case of discrepancy.</div>
        <div><span className="font-bold text-primary">38. ELECTRONIC COMMUNICATIONS.</span> The user agrees to receive electronic communications related to their application.</div>
        <div><span className="font-bold text-primary">39. AGE RESTRICTION.</span> Service is for adults only. Data from minors will be deleted without processing.</div>
        <div><span className="font-bold text-primary">40. PROHIBITED JURISDICTIONS.</span> IAA reserves the right to refuse service in countries where operating is illegal or risky.</div>
        <div><span className="font-bold text-primary">41. FRAUD PREVENTION.</span> IAA may report suspicious activity to authorities.</div>
        <div><span className="font-bold text-primary">42. LEGAL COSTS.</span> If IAA takes legal action to enforce these terms, the user pays legal fees and costs.</div>
        <div><span className="font-bold text-primary">43. DIGITAL SIGNATURES.</span> Form submission constitutes a binding electronic signature.</div>
        <div><span className="font-bold text-primary">44. DAMAGES LIMITATION.</span> IAA's liability shall not exceed the amount paid for the service. IAA is not liable for consequential damages.</div>
        <div><span className="font-bold text-primary">45. MISUSE EXEMPTION.</span> IAA is not liable for damages from misuse, use in prohibited countries, or use by persons other than the holder.</div>
        <div><span className="font-bold text-primary">46. NO GOVERNMENT ENDORSEMENT.</span> The card design does not imply endorsement by any government entity.</div>
        <div><span className="font-bold text-primary">47. MILITARY USE.</span> The card is not designed for military or official government use.</div>
        <div><span className="font-bold text-primary">48. INFORMATIONAL TRANSLATION.</span> Translations on the card are for informational purposes. The original Spanish text prevails.</div>
        <div><span className="font-bold text-primary">49. CONTACT.</span> All communications will be handled via the website application form.</div>
        <div><span className="font-bold text-primary">50. EFFECTIVENESS.</span> These terms take effect upon acceptance and remain until replaced.</div>
      </div>
    </>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-primary-light shrink-0">
          <div className="w-6" />
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors text-text-muted hover:text-primary">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto p-4 sm:p-6">
          {content}
        </div>
      </div>
    </div>
  )
}

export default TermsModal
