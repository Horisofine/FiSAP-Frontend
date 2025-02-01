import formidable from "formidable";
//import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser to handle file uploads
  },
};

const handler = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "File upload failed" });
      return;
    }

    const file = files.file[0]; // The uploaded file
    const filePath = file.filepath;

    // You can process the CSV file here if needed (e.g., parse it)

    // Return the file path or success message to the frontend
    res.status(200).json({ message: "File uploaded successfully", filePath });
  });
};

export default handler;
