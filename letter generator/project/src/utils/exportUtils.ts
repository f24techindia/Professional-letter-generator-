import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { LetterData } from '../types/LetterTypes';

export const exportToPDF = async (letterData: LetterData) => {
  const element = document.getElementById('letter-preview');
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `${letterData.letterTitle.replace(/\s+/g, '_')}_${letterData.recipientName.replace(/\s+/g, '_') || 'Letter'}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

export const exportToDocx = async (letterData: LetterData) => {
  try {
    // Format body with responsibilities
    const formatBody = (body: string, responsibilities: string[]) => {
      let formattedBody = body;
      
      // Replace placeholders with actual values
      formattedBody = formattedBody.replace(/\[Job Role\]/g, letterData.jobRole || '[Job Role]');
      formattedBody = formattedBody.replace(/\[Department\]/g, letterData.department || '[Department]');
      formattedBody = formattedBody.replace(/\[Start Date\]/g, letterData.startDate || '[Start Date]');
      formattedBody = formattedBody.replace(/\[Salary\]/g, letterData.salary || '[Salary]');
      formattedBody = formattedBody.replace(/\[Reporting Manager\]/g, letterData.reportingManager || '[Reporting Manager]');
      
      // Replace responsibilities placeholder
      if (responsibilities.length > 0) {
        const responsibilityList = responsibilities
          .filter(r => r.trim())
          .map(r => `• ${r}`)
          .join('\n');
        formattedBody = formattedBody.replace(/\[Responsibilities will be listed here\]/g, responsibilityList);
      }
      
      return formattedBody;
    };

    const processedBody = formatBody(letterData.body, letterData.responsibilities);
    
    // Split body into paragraphs and process each
    const bodyParagraphs = processedBody.split('\n').filter(para => para.trim());
    const docParagraphs: Paragraph[] = [];

    bodyParagraphs.forEach(paragraph => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        // Bold paragraph
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: paragraph.slice(2, -2),
                bold: true,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          })
        );
      } else if (paragraph.startsWith('• ')) {
        // Bullet point
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: paragraph.slice(2),
                size: 20,
              }),
            ],
            bullet: {
              level: 0,
            },
            spacing: { after: 100 },
          })
        );
      } else if (/^\d+\.\s/.test(paragraph)) {
        // Numbered list
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: paragraph.replace(/^\d+\.\s/, ''),
                size: 20,
              }),
            ],
            numbering: {
              reference: "default-numbering",
              level: 0,
            },
            spacing: { after: 100 },
          })
        );
      } else {
        // Regular paragraph
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: paragraph,
                size: 20,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 200 },
          })
        );
      }
    });

    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "default-numbering",
            levels: [
              {
                level: 0,
                format: "decimal",
                text: "%1.",
                alignment: AlignmentType.START,
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: [
            // Company Header
            new Paragraph({
              children: [
                new TextRun({
                  text: letterData.companyName,
                  bold: true,
                  size: 32,
                  color: '1e40af',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 200 },
            }),
            
            // Company Address
            new Paragraph({
              children: [
                new TextRun({
                  text: letterData.companyAddress,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            
            // Contact Information
            new Paragraph({
              children: [
                new TextRun({
                  text: `Phone: ${letterData.phone} | Email: ${letterData.email}`,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            
            // Website and MSME
            new Paragraph({
              children: [
                new TextRun({
                  text: `Website: ${letterData.website}`,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `MSME Reg. No.: ${letterData.msmeNo}`,
                  size: 20,
                  bold: true,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 400 },
            }),

            // Letter Number and Date
            ...(letterData.letterNo ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Letter No.: ${letterData.letterNo}`,
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { after: 100 },
              })
            ] : []),
            
            // Date
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${letterData.date}`,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 300 },
            }),
            
            // Letter Title
            new Paragraph({
              children: [
                new TextRun({
                  text: letterData.letterTitle,
                  bold: true,
                  size: 28,
                  underline: {},
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            
            // Recipient Information
            ...(letterData.recipientName ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: letterData.recipientName,
                    bold: true,
                    size: 22,
                  }),
                ],
                alignment: AlignmentType.LEFT,
                spacing: { after: 100 },
              }),
              ...(letterData.recipientAddress ? letterData.recipientAddress.split('\n').map(line => 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                      size: 20,
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: { after: 100 },
                })
              ) : []),
            ] : []),
            
            // Subject
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Subject: ',
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: letterData.subject,
                  size: 22,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 300 },
            }),
            
            // Salutation
            new Paragraph({
              children: [
                new TextRun({
                  text: `${letterData.salutation} ${letterData.recipientName || '[Recipient Name]'},`,
                  size: 22,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 200 },
            }),
            
            // Letter Body (processed paragraphs)
            ...docParagraphs,
            
            // Closing
            new Paragraph({
              children: [
                new TextRun({
                  text: letterData.closing,
                  size: 22,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 600 },
            }),
            
            // Signature
            new Paragraph({
              children: [
                new TextRun({
                  text: letterData.signatoryName,
                  bold: true,
                  size: 22,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: letterData.signatoryTitle,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: letterData.companyName,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 400 },
            }),
            
            // Footer
            new Paragraph({
              children: [
                new TextRun({
                  text: 'This is a computer-generated letter and does not require a physical signature.',
                  size: 16,
                  italics: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `${letterData.companyName} | ${letterData.email} | ${letterData.phone}`,
                  size: 16,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `${letterData.letterTitle.replace(/\s+/g, '_')}_${letterData.recipientName.replace(/\s+/g, '_') || 'Letter'}.docx`;
    saveAs(new Blob([buffer]), fileName);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    alert('Error generating DOCX. Please try again.');
  }
};