import { S3 } from '@aws-sdk/client-s3';
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
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


const renameFile = () => {
    const newFileName = `${Date.now()}.${v4()}.${'webp'}`;
    return newFileName;
}


export const uploadFile = async (file: any) => {
    const sharpImage = sharp(file.path).rotate().resize(500, 500).toFormat('webp').jpeg({ quality: 80 });
    const buffer = await sharpImage.toBuffer();
    const fileName = renameFile();
    // create buffer from file
    const params = {
        Bucket: 'sg3storage',
        Key: fileName,
        Body: buffer,
        ACL: 'public-read'
    };
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


