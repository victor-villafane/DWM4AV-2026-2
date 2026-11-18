import multer from "multer"
import { randomUUID } from "node:crypto"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, randomUUID() + "-" + file.originalname)
    }
})

export const upload = multer({ storage })
// app.post( "/upload", upload.single("portada"), (req, res) => {
//     console.log(req.file)
// } )