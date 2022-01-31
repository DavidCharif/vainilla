import { getPaises } from "../controllador/controllador.js";




// Vanessa
const banderas = document.getElementById('banderas')
const query = new URLSearchParams(window.location.search)
const params = query.get('name')
console.log(params)



const fetchData = async () => {
    let banderas = await getPaises()
    console.log(banderas)
    banderillas(banderas)
}

const banderillas = data => {
    
    data.forEach(item => {
        let {name,urlImg,poblation,capital,region} = item;
        console.log('name', name);
        banderas.innerHTML += `
        <article class="card">
            <img src="${urlImg}" alt="" class="img-fluid">
            <div class="card-content">
                <h3>${name}</h3>
                <p>
                    <b>Population: </b>
                    ${poblation}
                </p>
                <p>
                    <b>Capital: </b>
                    ${capital}
                </p>
                <p>
                    <b>Región: </b>
                    ${region}
                </p>
            </div>
        </article>
        `
    });
    
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




    document.addEventListener("DOMContentLoaded",fetchData)
