import multer from "multer"
import sharp from "sharp"
import { randomUUID } from "node:crypto"
import { existsSync } from "node:fs"
import { unlink } from "node:fs/promises"
import { supabase } from "../services/supabase.service.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, randomUUID() + "-" + file.originalname)
    }
})

export const upload = multer({ storage })

export async function resize(req, res, next) {
    if (!req?.file) next()
    const nombre = randomUUID()

    try {

        const buffer = await sharp(req.file.path)
            .resize(1200)
            .webp()
            .toBuffer()
            // .toFile("uploads/" + nombre + ".webp")

     
        if (req.file.path && existsSync(req.file.path)) {
            await unlink(req.file.path)
        }

        const {error} = await supabase.storage.from("uploads").upload(nombre + ".webp", buffer, {
            contentType: "image/webp",
            upsert: false
        })

        if(error) throw error
        const { data } = supabase.storage.from("uploads").getPublicUrl(nombre + ".webp")
        console.log(data)
        req.file.filename = data.publicUrl
        next()
    } catch (error) {
        res.status(400).json({ message: error })
    }

}
