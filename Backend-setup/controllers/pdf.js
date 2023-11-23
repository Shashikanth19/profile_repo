const { Pdf: PdfService, Bills: BillsService } = require("../services");
const Validator = require("../utils/validator");

const generatePDFController = async (req, res) => {
  try {
    const {
      user: { role },
      query: { pageSize: pageSizeString, pageNumber: pageNumberString, ...query },
    } = req;

    /** Parse and set default values for pageSize and pageNumber */
    const pageNumber = parseInt(pageNumberString || 1);
    const pageSize = parseInt(pageSizeString || 10);

    /** Create data object with additional information for getting the list */
    const records = {
      ...query,
      role,
      pageNumber,
      pageSize,
    };

    // Get customer list from the service
    const data = await BillsService.getList(records);
    console.log("data.doc",data.doc);

    // Check if data is not an array or doc is not an array
    if (!Array.isArray(data.doc)) {
      console.error('Invalid data format. Expected an array.');
      return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
    }

    // Generate PDF using the service
    const pdfBuffer = await PdfService.generatePDF(data.doc);
    console.log("PDF Buffer:", pdfBuffer);


    // Respond with the PDF buffer
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=output.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error in generatePDFController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generatePDFController,
};
