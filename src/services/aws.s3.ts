import { S3 } from '@aws-sdk/client-s3';
import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs'
import { v4 } from 'uuid'
import sharp from 'sharp';


const s3Credentials = {
    forcePathStyle: false,
    endpoint: 'https://sgp1.digitaloceanspaces.com',
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'DO00ATPRN4T6WMGCZW4T',
        secretAccessKey: 'lcwO4/OTZSprI4Aw+JttI/wdglSEL5/CCAKOUfIHRQI',
    }
}

const s3 = new S3(s3Credentials);


const renameFile = (file: any) => {
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = `${Date.now()}.${v4()}.${fileExtension}`;
    return newFileName;
}



export const uploadFile = async (file: any, type: 'pdf' | 'RecipeImage' | 'profileImage' | 'mobileBanner' | 'sportsThumbnails' | 'courseThumbnail') => {
    let fileName;

    console.log('FILE from upload function:::', file)

    if (type === 'RecipeImage') {
        // const sharpImage = sharp(file.path).rotate().resize(500, 500).toFormat('webp').jpeg({ quality: 80 });
        // const buffer = await sharpImage.toBuffer();
        // file.buffer = buffer;
        const renameFileName = renameFile(file);
        fileName = 'RecipeImage/' + renameFileName;
    }
    if (type === 'profileImage') {
        // const sharpImage = sharp(file.path).rotate().resize(500, 500).toFormat('webp').jpeg({ quality: 80 });
        // const buffer = await sharpImage.toBuffer();
        // file.buffer = buffer;
        const renameFileName = renameFile(file);
        fileName = 'profileImage/' + renameFileName;
    }
    if (type === 'courseThumbnail') {
        const renameFileName = renameFile(file);
        fileName = 'courseThumbnail/' + renameFileName;
    }
    if (type === 'mobileBanner') {
        const renameFileName = renameFile(file);
        fileName = 'mobileBanner/' + renameFileName;
    }
    if (type === 'sportsThumbnails') {
        const renameFileName = renameFile(file);
        fileName = 'sportsThumbnails/' + renameFileName;
    }
    if (type === 'pdf') {
        const renameFileName = renameFile(file);
        fileName = 'pdf/' + renameFileName;
    }

    // create buffer from file
    const params = {
        Bucket: 'sg3storage',
        Key: fileName,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype
    }


    try {
        const data = await s3.send(new PutObjectCommand(params));
        if (data) {
            return {
                location: `https://sg3storage.sgp1.digitaloceanspaces.com/${fileName}`,
                key: fileName
            }
        }
        return false;
    } catch (error) {
        console.log({ error })
        return error;
    }
}

export const deleteFile = async (key: string) => {
    const params = {
        Bucket: 'sg3storage',
        Key: key
    };
    try {
        const data = await s3.send(new DeleteObjectCommand(params));
        if (data) return true;
        return false;
    } catch (error) {
        return error;
    }
}



