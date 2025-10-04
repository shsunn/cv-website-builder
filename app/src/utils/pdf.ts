import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function downloadPdfFromElement(element: HTMLElement, filename: string) {
  const a4WidthPx = 794; // ~210mm @ 96dpi
  const a4HeightPx = 1123; // ~297mm @ 96dpi
  const scale = 2; // improve sharpness

  const canvas = await html2canvas(element, { scale, useCORS: true, backgroundColor: '#ffffff' });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const ratio = Math.min(pageWidth / (a4WidthPx * (scale / window.devicePixelRatio)), pageHeight / (a4HeightPx * (scale / window.devicePixelRatio)));
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // 只生成單頁 A4，不自動分頁
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
  pdf.save(filename);
}

