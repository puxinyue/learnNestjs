import * as multer from "multer";
import * as fs from 'fs';


export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads')
    } catch (error) { }

    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const unq = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
    cb(null, unq)
  }
})

