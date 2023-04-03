import { S3 } from '@aws-sdk/client-s3';
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs'
import { v4 } from 'uuid'
import sharp from 'sharp';


// endpoint: 'https://sg3storage.sgp1.digitaloceanspaces.com',

const s3Credentials = {
    forcePathStyle: false,
    endpoint: 'https://sgp1.digitaloceanspaces.com',
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'DO009QJDG6QM43C8J49N',
        secretAccessKey: 'IKDEDdmtPfGDEf+B72RaCT1P338dqCDJHM32xRpQZIE',
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
        Bucket: 'arunsingh28',
        Key: fileName,
        Body: buffer,
        ACL: 'public-read'
    };
    try {
        const data = await s3.send(new PutObjectCommand(params));
        if (data) {
            return {
                location: `https://arunsingh28.sgp1.digitaloceanspaces.com/${fileName}`,
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
        Bucket: 'arunsingh28',
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


