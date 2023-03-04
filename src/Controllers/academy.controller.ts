import { Request, Response } from "express";
import bcrypt from "bcrypt";
import academyModel from "../Models/academyModel";
import { Coache } from "../Models/coache.Model";

const registerAcademy = async (req: Request, res: Response) => {
    const { academyEmail, academyName, cricket, football, badminton, baskitball, tennis, otherSport, address, city, contactNumber, contactName, contactEmail, website, googleLink, playoLink } = req.body;
    if (!academyEmail || !academyName || !address || !city || !contactNumber || !contactName || !contactEmail) {
        return res.status(400).json({ message: "All fields are required", success: false })
    }
    try {
        // genrate random 6 char password
        const password = Math.random().toString(36).slice(-6);
        const encryptPassword = await bcrypt.hash(password, 10);

        // create uid for academy from academy name
        const split = academyName.split(' ')
        const f = split.map((e: string) => e.charAt(0))
        const uid = f.join().replaceAll(',', '') + Math.random().toString(36).slice(-3)


        let website, googleLink, playoLink;
        if (req.body.website === '') {
            website = null
        }
        if (req.body.googleLink === '') {
            googleLink = null
        }
        if (req.body.playoLink === '') {
            playoLink = null
        }
        const academy = await academyModel.create({
            academyName,
            academyEmail,
            uid,
            sports: {
                isCricket: cricket,
                isTennis: tennis,
                isFootball: football,
                isBadminton: badminton,
                isBasketball: baskitball,
                other: otherSport
            },
            contestPerson: {
                name: contactName,
                number: parseInt(contactNumber),
                email: contactEmail
            },
            address: {
                address,
                city
            },
            links: {
                website,
                google: googleLink,
                playO: playoLink,
            },
            referalCode: Math.random().toString(36).slice(-6),
            password: encryptPassword
        })
        return res.status(201).json({ message: "Academy Registered Successfully", academy, success: true })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}


const createCoach = async (req: Request, res: Response) => {
    const { name, email, phone, academy, sports } = req.body;
    if (!name || !email || !phone || !academy || !sports) {
        return res.status(400).json({ message: "All fields are required", success: false })
    }
    try {
        const coach = await Coache.create({
            name,
            email,
            phone,
            academy,
            sports
        })
        return res.status(201).json({ message: "Coach Created Successfully", coach, success: true })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

export default { registerAcademy, createCoach }