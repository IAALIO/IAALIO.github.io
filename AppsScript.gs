function doGet(e) {
  const action = e?.parameter?.action || ''
  const callback = e?.parameter?.callback || ''
  try {
    if (action === 'licencias') {
      return serveJSONP(callback, getLicencias())
    }
    return serveJSONP(callback, { ok: true })
  } catch (err) {
    return serveJSONP(callback, { ok: false, error: err.toString() })
  }
}

function serveJSONP(callback, data) {
  const json = JSON.stringify(data)
  const output = callback ? callback + '(' + json + ')' : json
  const mime = callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON
  return ContentService.createTextOutput(output).setMimeType(mime)
}

function getLicencias() {
  const sheet = SpreadsheetApp.openById('1FIknMQNr2bRt9yCc1R-pawcTxhqBkY0WkeyIuHlhnfo')
  const ws = sheet.getSheetByName('Licencias')
  if (!ws) return { ok: true, data: [] }
  const rows = ws.getDataRange().getValues()
  if (rows.length < 2) return { ok: true, data: [] }

  const cols = rows[0]
  const data = rows.slice(1).map(row => {
    const obj = {}
    cols.forEach((h, i) => {
      const key = String(h).trim()
        .toLowerCase().replace(/[\s]+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
      let val = i < row.length ? row[i] : ''
      if (val instanceof Date) {
        const d = val
        const dd = String(d.getDate()).padStart(2, '0')
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const yyyy = d.getFullYear()
        val = dd + '/' + mm + '/' + yyyy
      } else if (typeof val === 'number') {
        val = String(val)
      }
      obj[key] = val
    })
    return obj
  })
  return { ok: true, data }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = SpreadsheetApp.openById('1FIknMQNr2bRt9yCc1R-pawcTxhqBkY0WkeyIuHlhnfo')

    if (data.action === 'add-license') {
      const ws = sheet.getSheetByName('Licencias') || sheet.insertSheet('Licencias')

      if (ws.getLastRow() === 0) {
        ws.appendRow(['Documento', 'ID Tramite', 'Nombre', 'Vencimiento', 'Estado', 'Categoria',
          'Licencia', 'Fecha Nacimiento', 'Nacionalidad', 'Estatura', 'Tipo Sangre', 'Color Ojos',
          'Foto URL', 'Pais Valido', 'Firma', 'Cedula'])
      }

      ws.appendRow([
        data.documento || '', data.id_tramite || '', data.nombre || '',
        data.vencimiento || '', 'ACTIVA', data.categoria || '',
        data.licencia_url || '', data.fecha_nacimiento || '', data.nacionalidad || '',
        data.estatura || '', data.tipo_sangre || '', data.color_ojos || '',
        data.foto_url || '', data.pais_valido || '', data.firma_url || '',
        data.cedula_url || ''
      ])

      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    const folder = DriveApp.getFolderById('1sAgajm3yoK2g0Y5w9a1ZqbnJGcWqWcac')
    const ws = sheet.getSheetByName('Aplicantes') || sheet.insertSheet('Aplicantes')

    if (ws.getLastRow() === 0) {
      ws.appendRow(['Fecha', 'ID Trámite', 'Nombre', 'Email', 'Teléfono',
        'País Nacimiento', 'Fecha Nacimiento', 'País Residencia', 'Vigencia',
        'Estatura', 'Tipo Sangre', 'Color Ojos',
        'Link Foto Carnet', 'Link Foto Firma', 'Link Foto ID', 'Link Foto Licencia'])
    }

    const idTramite = 'LIC-' + Utilities.formatDate(new Date(), 'GMT-4', 'yyyyMMdd-HHmmss')

    const applicantFolder = folder.createFolder(idTramite)

    function saveBase64File(b64, nombreArchivo) {
      if (!b64) return ''
      try {
        const parts = b64.split(',')
        const mime = parts[0].match(/:(.*?);/)[1]
        const ext = mime.split('/')[1] === 'jpeg' ? 'jpg' : mime.split('/')[1]
        const blob = Utilities.newBlob(Utilities.base64Decode(parts[1]), mime, nombreArchivo + '.' + ext)
        const file = applicantFolder.createFile(blob)
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

    try {
      MailApp.sendEmail({
        to: 'license.international.official@gmail.com',
        subject: 'Nueva solicitud IAA - ' + data.nombreCompleto,
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
    } catch(er) {}

    return ContentService.createTextOutput(JSON.stringify({ ok: true, id: idTramite }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
