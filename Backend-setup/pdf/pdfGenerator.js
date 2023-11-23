const PDFDocument = require('pdfkit');
const { pipeline } = require('stream');
const { promisify } = require('util');
const fs = require('fs');

/** Promisify the pipeline function for easier asynchronous handling */
const pipelineAsync = promisify(pipeline);

const generatePDF = async (data, excludedColumns) => {
  return new Promise(async (resolve, reject) => {
    /** Create a new PDF document using pdfkit */
    const doc = new PDFDocument({
      size: 'A4',
      margin: 30,
    });

    /** Array to store PDF buffer chunks */
    const buffers = [];

    /** Event listener for collecting PDF data chunks */
    doc.on('data', buffers.push.bind(buffers));

    /** Event listener for PDF document completion */
    doc.on('end', async () => {
      try {
        /** Concatenate the collected buffers into a single PDF buffer */
        const pdfBuffer = Buffer.concat(buffers);

        /** Check for an empty PDF buffer */
        if (pdfBuffer.length === 0) {
          console.error('Empty PDF buffer.');
          return reject(new Error('Empty PDF buffer.'));
        }

        /** Write the PDF buffer to a file (for debugging or further use) */
        await fs.promises.writeFile('./pdf/output.pdf', pdfBuffer);

        /** Resolve with the generated PDF buffer */
        resolve(pdfBuffer);
      } catch (error) {
        /** Handle errors during PDF generation */
        console.error('Error generating PDF:', error);
        reject(error);
      }
    });

    /** Check if the provided data is an array */
    if (!Array.isArray(data)) {
      console.error('Data is not an array.');
      reject(new Error('Data is not an array.'));
    }

    /** Extract column names from the first object in the data array */
    const columnNames = Object.keys(data[0]);

    /** Filter out excluded columns */
    const filteredColumnNames = columnNames.filter(name => !excludedColumns.includes(name));

    /** Calculate the column width based on the document dimensions */
    const columnWidth = (doc.page.width - 2 * doc.page.margins.left) / filteredColumnNames.length;

    /** Initialize the vertical position for rendering content */
    let y = doc.page.margins.top;

    /** Set font and font size for column headers */
    doc.font('Helvetica-Bold').fontSize(8);

    /** Render column headers with background color and text */
    filteredColumnNames.forEach((name, index) => {
      const width = name === 'public_id' ? 50 : columnWidth;

      doc
        .fillColor('#3498db')
        .rect(doc.page.margins.left + index * width, y, width, 15)
        .fill()
        .fillColor('#ffffff')
        .text(name, doc.page.margins.left + index * width + 5, y + 2, { width, align: 'center', bold: true });
    });

    /** Set font and font size for data rows */
    doc.font('Helvetica').fontSize(8);

    /** Render data rows with alternating background colors */
    data.forEach((row, rowIndex) => {
      y += 30;

      filteredColumnNames.forEach((name, index) => {
        const width = name === 'public_id' ? 50 : (row.rowWidth || columnWidth);
        const fillColor = rowIndex % 2 === 0 ? '#ecf0f1' : '#ffffff';

        doc
          .fillColor(fillColor)
          .rect(doc.page.margins.left + index * width, y, width, 15)
          .fill()
          .fillColor('#000000')
          .text(String(row[name]), doc.page.margins.left + index * width + 5, y + 2, { width, align: 'center' });
      });
    });

    /** End the PDF document generation */
    doc.end();
  });
};

/** Export the generatePDF function for use in other modules */
module.exports = { generatePDF };
