import multer from 'multer';

export const fileType = {
  image: ['image/jpeg', 'image/svg+xml', 'image/gif'],
  file: ['application/pdf']
};

function fileUpload(customValidation = []) {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid format"), false);
    }
  }

  const upload = multer({ fileFilter, storage });
  return upload;
}

export default fileUpload;