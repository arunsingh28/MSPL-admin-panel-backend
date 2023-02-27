import jwt from 'jsonwebtoken'
import env from '../../config/env'

const accessToken = (id: string,role:any) => {
    return jwt.sign({ id ,role}, env._jwt_access_token_secret_key, {
        expiresIn: env._jwt_access_token_expire_time
    })
}

const refreshToken = (id: string,role:any) => {
    return jwt.sign({ id,role }, env._jwt_refresh_token_secret_key, {
        expiresIn: env._jwt_refresh_token_expire_time
    })
}

const loginToken = (id: string,role:any) => {
    return jwt.sign({ id,role }, env._jwt_login_token_secret_key, {
        expiresIn: env._jwt_login_token_expire_time
    })
}

export default { accessToken, refreshToken, loginToken }