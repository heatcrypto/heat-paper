// @ts-ignore
import html2pdf from 'html2pdf.js'
import { compile } from 'handlebars'
import { pdfPrintCss } from './pdfprint.css'
import { pdfTemplateHtml } from './pdfprint.html'
import QRCode from 'qrcode'

export type PdfPrintArgs = {
  keyData: string,
  keyIsValidBip39: boolean,
  notes: string,
}

async function prepareHtml(args: PdfPrintArgs) {
  const date = new Date().toLocaleDateString();  
  const qrDataUri = await QRCode.toDataURL(args.keyData, {type:'image/png'})
  const template = compile(pdfTemplateHtml)
  return template({ ...args, css: pdfPrintCss, qrDataUri: qrDataUri, date: date })
}

export const pdfToDataUri = async (args: PdfPrintArgs): Promise<string> => {  
  const html = await prepareHtml(args)
  const dataUri = await html2pdf().from(html).toPdf().output('datauristring')
  return dataUri
}

export const pdfsave = async (args: PdfPrintArgs, filename:string) => {  
  const html = await prepareHtml(args)
  html2pdf().from(html).save(filename)
}

// export const pdfsave = async (args: PdfPrintArgs, filename:string) => {  
//   html2pdf().from(prepareHtml(args)).save(filename)
// }