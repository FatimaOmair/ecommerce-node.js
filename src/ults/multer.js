import multer from 'multer';

export const fileType = {
  image: ['image/jpeg', 'image/svg+xml', 'image/gif'],
  pdf: ['application/pdf'],
  excel:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
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