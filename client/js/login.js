console.log('working')
const msg = document.getElementById('msg')

if (msg.innerText === '') {
    msg.style.display = 'none'
}

const handleLogin = async (e) => {
    e.preventDefault()
    console.log('fire')
    let phone = document.getElementById('phone').value
    // const pwd = document.getElementById('pwd').value
    const msg = document.getElementById('msg')

    if (!phone) {
        alert('fill the form')
    }
    else {
        const res = await fetch('http://localhost:4000/v1/api/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                phone: phone
            })
        })
        const data = await res.json()
        msg.style.display = 'block'
        localStorage.setItem('otp', data.otp)
        msg.innerText = data.message
        if (data.otp) {
            window.location.href = '/otp'
        }
    }
}

