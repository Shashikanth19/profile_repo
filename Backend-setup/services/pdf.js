const PDFDocument = require('pdfkit');
const { pipeline } = require('stream');
const { promisify } = require('util');
const fs = require('fs');

const pipelineAsync = promisify(pipeline);

const generatePDF = async (data) => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 30, // Adjust margins as needed
    });

    // Create a buffer to store the PDF content
    const buffers = [];

    // Pipe the PDF document to buffers
    doc.on('data', buffers.push.bind(buffers));

    // Handle end of document
    doc.on('end', async () => {
      try {
        // Concatenate buffers into a single Buffer
        const pdfBuffer = Buffer.concat(buffers);

        // Check if the generated PDF buffer is valid
        if (pdfBuffer.length === 0) {
          console.error('Empty PDF buffer.');
          return reject(new Error('Empty PDF buffer.'));
        }

        // Write the PDF to a file for debugging (optional)
        await fs.promises.writeFile('./pdf/output.pdf', pdfBuffer);

        // Resolve with the generated PDF Buffer
        resolve(pdfBuffer);
      } catch (error) {
        console.error('Error generating PDF:', error);
        reject(error);
      }
    });

    // Check if data is an array
    if (!Array.isArray(data)) {
      console.error('Data is not an array.');
      reject(new Error('Data is not an array.'));
    }

    // Extract column names from the first row of data
    const columnNames = Object.keys(data[0]);

    // Define columns to exclude
    const excludedColumns = ['publicId','userId','price','offer','cgst','sgst','finalPrice','totalPrice','concurrencyStamp', 'createdBy','updatedBy',  'createdAt', 'updatedAt','customersId'];

    // Filter out the excluded columns
    const filteredColumnNames = columnNames.filter(name => !excludedColumns.includes(name));

    // Calculate the width of each column based on A4 size and margins
    const columnWidth = (doc.page.width - 2 * doc.page.margins.left) / filteredColumnNames.length;

    // Set initial y-coordinate for table
    let y = doc.page.margins.top;

    // Set font size for headers
    doc.font('Helvetica-Bold').fontSize(8); // Increase font size for headers

    // Draw headers with background color and bold text
    filteredColumnNames.forEach((name, index) => {
      const width = name === 'public_id' ? 50 : columnWidth;

      doc
        .fillColor('#3498db') // Blue color
        .rect(doc.page.margins.left + index * width, y, width, 15) // Rectangle behind the text
        .fill()
        .fillColor('#ffffff') // White color for text
        .text(name, doc.page.margins.left + index * width + 5, y + 2, { width, align: 'center', bold: true });
    });

    // Set font size for table data
    doc.font('Helvetica').fontSize(8); // Adjust as needed

    // Draw rows with alternating background color
    data.forEach((row, rowIndex) => {
      y += 30;

      filteredColumnNames.forEach((name, index) => {
        const width = name === 'public_id' ? 50 : (row.rowWidth || columnWidth);

        // Alternate background color for rows
        const fillColor = rowIndex % 2 === 0 ? '#ecf0f1' : '#ffffff';

        doc
          .fillColor(fillColor)
          .rect(doc.page.margins.left + index * width, y, width, 15)
          .fill()
          .fillColor('#000000') // Black color for text
          .text(String(row[name]), doc.page.margins.left + index * width + 5, y + 2, { width, align: 'center' });
      });
    });

    // End the document to trigger the 'end' event
    doc.end();
  });
};

module.exports = { generatePDF };

// const PDFDocument = require('pdfkit');
// const { pipeline } = require('stream');
// const { promisify } = require('util');
// const fs = require('fs');

// const pipelineAsync = promisify(pipeline);

// const generatePDF = async (data) => {
//   return new Promise(async (resolve, reject) => {
//     const doc = new PDFDocument();

//     // Create a buffer to store the PDF content
//     const buffers = [];

//     // Pipe the PDF document to buffers
//     doc.on('data', buffers.push.bind(buffers));

//     // Handle end of document
//     doc.on('end', async () => {
//       try {
//         // Concatenate buffers into a single Buffer
//         const pdfBuffer = Buffer.concat(buffers);

//         // Check if the generated PDF buffer is valid
//         if (pdfBuffer.length === 0) {
//           console.error('Empty PDF buffer.');
//           return reject(new Error('Empty PDF buffer.'));
//         }

//         // Write the PDF to a file for debugging (optional)
//         await fs.promises.writeFile('./pdf/output.pdf', pdfBuffer);

//         // Resolve with the generated PDF Buffer
//         resolve(pdfBuffer);
//       } catch (error) {
//         console.error('Error generating PDF:', error);
//         reject(error);
//       }
//     });

//     // Check if data is an array
//     if (!Array.isArray(data)) {
//       console.error('Data is not an array.');
//       reject(new Error('Data is not an array.'));
//     }

//     const columnNames = [
//         'id', 'public_id', 'user_id', 'customer_name', 'mobile_no', 'bill_number',
//         'number_of_items', 'price', 'offer', 'cgst', 'sgst', 'total_price',
//         'final_price', 'status', 'customers_id', 'discount', 'barcode',
//         'concurrency_stamp', 'created_by', 'updated_by', 'created_at', 'updated_at'
//       ];
      
//       // Iterate through each row in data
//       data.forEach((row) => {
//         // Iterate through each column name
//         columnNames.forEach((columnName) => {
//           // Add column name and corresponding value to the PDF
//           doc.text(`${columnName}: ${row[columnName]}`);
//         });
      
//         // Add a separator between rows
//         doc.text('------------------------------------------');
//       });
      
//       // End the document to trigger the 'end' event
//       doc.end();
      
//   });
// };

// module.exports = { generatePDF };
