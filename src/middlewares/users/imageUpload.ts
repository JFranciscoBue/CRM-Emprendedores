import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(__dirname, "..", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, tempDir);
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
