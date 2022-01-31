const banderas = document.getElementById('banderas')
const query = new URLSearchParams(window.location.search)
const params = query.get('name')
console.log(params)

document.addEventListener("DOMContentLoaded", e => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        
        const filtroData = data.filter(item => item.name === params)

        banderillas(filtroData)
    } catch (error) {
        console.log(error)
    }
}

const banderillas = data => {
    let elementos = ''
    data.forEach(item => {
        elementos += `
        <article class="card">
            <img src="${item.flag}" alt="" class="img-fluid">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>
                    <b>Population: </b>
                    ${item.population}
                </p>
                <p>
                    <b>Capital: </b>
                    ${item.capital}
                </p>
                <p>
                    <b>Región: </b>
                    ${item.region}
                </p>
            </div>
        </article>
        `
    });
    banderas.innerHTML = elementos
}




// formulario

const formulario = document.getElementById('formulario');
const inputFormulario = document.getElementById('inputFormulario');

const formularioCliente = data => {
    formulario.addEventListener('keyup', e => {
        e.preventDefault()
        const letraCliente = inputFormulario.value.toLowerCase()
        // console.log(letraCliente)
        const arrayFiltrado = data.filter(item => {
            const letraApi = item.name.toLowerCase()
            if (letraApi.indexOf(letraCliente) !== -1) {
                return item
            }
        })
        banderillas(arrayFiltrado)
    })
}

// modo oscuro

const btnDark = document.querySelector('.btn-dark-mode');

btnDark.addEventListener('click', () => {
    console.log('diste click')
    document.body.classList.toggle('dark-mode');

    if (document.body.className === 'dark-mode') {
        btnDark.innerHTML = `
        <i class="far fa-sun"></i>
        Light Mode
        `
    } else {
        btnDark.innerHTML = `
        <i class="far fa-moon"></i>
        Dark Mode
        `
    }
})


