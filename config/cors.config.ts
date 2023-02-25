import whiteList from "./allowedOrigin";

const corsOptions = {
    origin: (origin: any, callback: any) => {
        console.log("****ORIGIN****", origin)
        // if origin exit in whitelist 
        /*
        -1 : not found orgin in whitelist
        0 : found origin in whitelist

        for developemnt and testing origin 
        for production !origin
        */
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            const err = new Error('Not allowed by CORS')
            callback(err.message)
        }
    },
    optionSuccessStatus: 200
}

export default corsOptions;