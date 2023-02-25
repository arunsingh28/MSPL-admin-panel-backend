console.log('register')

let msg = document.getElementById('msg')

if (msg.innerText === '') {
    msg.style.display = 'none'
}

setTimeout(() => {
    msg.style.display = 'none'
}, 4000)

const handleRegsiter = (e) => {
    e.preventDefault()
    console.log('fire')
}