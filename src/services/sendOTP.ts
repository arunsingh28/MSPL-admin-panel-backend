import needle from 'needle'

export default function sendOTP(otp: number, phone: number) {
    needle.get(`https://smsjust.com/sms/user/urlsms.php?username=missionsports&pass=user@123&senderid=MSAAPP&message=Dear customer, Your OTP number is ${otp} Don't share it with anyone - Mission Sports &dest_mobileno=${phone}&msgtype=TXT&response=Y&dltentityid=1201159168063308595&dlttempid=1607100000000186990&tmid=1602100000000004471`, async (error,response) => {
     return response.body
    })
}