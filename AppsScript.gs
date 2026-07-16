function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const folder = DriveApp.getFolderById('ID_DE_LA_CARPETA_DRIVE')
    const sheet = SpreadsheetApp.openById('ID_DEL_SHEET')
    const ws = sheet.getSheetByName('Aplicantes') || sheet.insertSheet('Aplicantes')

    if (ws.getLastRow() === 0) {
      ws.appendRow(['Fecha', 'ID Trámite', 'Nombre', 'Email', 'Teléfono',
        'País Nacimiento', 'Fecha Nacimiento', 'País Residencia', 'Vigencia',
        'Estatura', 'Tipo Sangre', 'Color Ojos',
        'Link Foto Carnet', 'Link Foto Firma', 'Link Foto ID', 'Link Foto Licencia'])
    }

    const idTramite = 'LIC-' + Utilities.formatDate(new Date(), 'GMT-4', 'yyyyMMdd-HHmmss')

    function saveBase64File(b64, nombreArchivo) {
      if (!b64) return ''
      try {
        const parts = b64.split(',')
        const mime = parts[0].match(/:(.*?);/)[1]
        const ext = mime.split('/')[1] === 'jpeg' ? 'jpg' : mime.split('/')[1]
        const blob = Utilities.newBlob(Utilities.base64Decode(parts[1]), mime, nombreArchivo + '.' + ext)
        const file = folder.createFile(blob)
        return file.getUrl()
      } catch (er) { return '' }
    }

    const linkCarnet = saveBase64File(data.fotoCarnet, 'carnet_' + idTramite)
    const linkFirma = saveBase64File(data.fotoFirma, 'firma_' + idTramite)
    const linkID = saveBase64File(data.fotoID, 'id_' + idTramite)
    const linkLicencia = saveBase64File(data.fotoLicencia, 'licencia_' + idTramite)

    ws.appendRow([new Date(), idTramite, data.nombreCompleto, data.email, data.telefono,
      data.paisNacimiento, data.fechaNacimiento, data.paisResidencia, data.vigencia,
      data.estatura, data.tipoSangre, data.colorOjos,
      linkCarnet, linkFirma, linkID, linkLicencia])

    MailApp.sendEmail({
      to: Session.getActiveUser().getEmail(),
      subject: 'Nueva solicitud LIO - ' + data.nombreCompleto,
      body: [
        'Nueva solicitud de permiso internacional:',
        '',
        'ID Trámite: ' + idTramite,
        'Nombre: ' + data.nombreCompleto,
        'Email: ' + data.email,
        'Teléfono: ' + data.telefono,
        'País Nacimiento: ' + data.paisNacimiento,
        'Fecha Nacimiento: ' + data.fechaNacimiento,
        'País Residencia: ' + data.paisResidencia,
        'Vigencia: ' + data.vigencia,
        'Estatura: ' + data.estatura,
        'Tipo Sangre: ' + data.tipoSangre,
        'Color Ojos: ' + data.colorOjos,
        '',
        'Fotos:',
        '- Carnet: ' + (linkCarnet || 'No subida'),
        '- Firma: ' + (linkFirma || 'No subida'),
        '- ID: ' + (linkID || 'No subida'),
        '- Licencia: ' + (linkLicencia || 'No subida'),
        '',
        'Sheet: ' + ws.getParent().getUrl(),
      ].join('\n'),
    })

    return ContentService.createTextOutput(JSON.stringify({ ok: true, id: idTramite }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON)
}
