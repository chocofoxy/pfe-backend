import { createWriteStream } from "fs";
import { File } from './file.schema'

export const save = async ( file ): Promise<any> => {
    const { createReadStream , filename } = await file
    const dest = 'uploads'
    const name = `${Date.now()}-${filename}`
    const newFile: File = { 
        originalName: filename ,
        filename: name ,
        path: `./${dest}/${name}`,
        url: `/${name}` 
     }
    return new Promise(async (resolve, reject) =>
        createReadStream()
            .pipe(createWriteStream(newFile.path).on('error', () => reject(false)))
            .on('finish', () => resolve(newFile))
            .on('error', () => reject(false))
    );
}