
let otp = document.getElementById('OTP').value


let msg = document.getElementById('msg')

if (msg.innerText === '') {
    msg.style.display = 'none'
}

setTimeout(() => {
    msg.style.display = 'none'
}, 4000)

const handleOTP = async (e) => {
    e.preventDefault()
    const otp = document.getElementById('OTP').value
    let res = await fetch('http://localhost:4000/v1/api/login', {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ otp })
    })
    const data = await res.json()
    msg.style.display = 'block'
    if (!data.data?.firstName) {
        msg.innerText = data.message
    }
    else {
        msg.innerText = 'Hi ' + data.data?.firstName + ' ' + data.message + ' Succesfully'
    }
    if (data.code === 1) {
        window.location.href = '/login'
    }
    console.log('Response:', data)
}
