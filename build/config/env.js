"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = {
    // env
    _NAMESPACE: 'server',
    _port: process.env.PORT || 4000,
    // _databse_url: 'mongodb://mongo:27017/sportylife',
    _databse_url: 'mongodb://localhost:27017/emp-server',
    // aws s3
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    AWS_BUCKET_NAME: '',
    // jwt secret keys
    _jwt_access_token_secret_key: '72b634ae222c8dec0fdf695862ee2e4a79a8df1f289b356f62531ed196387be02099500e2fken',
    _jwt_refresh_token_secret_key: '243c39eb114686b66e807d9c763aeb544f339a903f80a3a729e1fe01f63eb613c3fe81959f',
    _jwt_login_token_secret_key: '7b459667c56b631f147d1650e8f734ecffc533a713f5d1f7aae4d235cffb09811bc9fa0b18',
    _jwt_mobile_token_secret_key: '14681f63eb6b66e0459662099500e2fke80cffb09816e8b634ae2227d9c763ae',
    // jwt expire time
    _jwt_access_token_expire_time: '1h',
    _jwt_refresh_token_expire_time: '30d',
    _jwt_login_token_expire_time: '5m',
    _jwt_mobile_token_expire_time: '1h',
    _jwt_mobile_otp_token_expire_time: '5m',
    // maxage for cookie
    _register_rf_Cookie: 24 * 60 * 60 * 1000,
    _login_token_cookie: 5 * 60 * 1000,
    _rf_cookies_max_age: 24 * 60 * 60 * 70000,
    prod_url: 'www.xyz.com',
    // mail config
    MAIL_DOMAIN_ID: '',
    MAIL_DOMAIN_PASS: '',
    MAIL_RESET_PASSWORD: 'reset-password',
    MAIL_WELCOME: 'welcome',
    MAIL_OTP: 'otp',
    MAIL_OTP_EXPIRE_TIME: 5 * 60 * 1000,
};
exports.default = env;
