import { getPaises } from "../controllador/controllador.js";
const select = document.getElementById("selects");


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
        let { name, urlImg, poblation, capital, region, description } = item;
        console.log('name', name);
        banderas.innerHTML += `
        <article class="card" data-bs-toggle="modal" data-bs-target="#exampleModal">
        
            <img src="${urlImg}" alt="" class="img-fluid" >
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Datos curiosos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img src="${urlImg}" alt="" class="img-fluid" >
            ${description}
            </div>
            <div class="modal-footer">
            </div>
            </div>
             </div>
            </div>
            
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

const extraerRegiones = async () => {
    let regiones = []
    let array = await getPaises();
    array.forEach((pais) => {
        let { region } = pais;
        if (!regiones.includes(region)) {
            regiones.push(region);
            select.innerHTML += `
            <option id="${region}" value="${region}">${region}</option> `
        }
    })
}

const filtrarRegiones = async () => {
    let paises = await getPaises()
    let regionInput = ""
    select.addEventListener("click", e => {
        console.log(e.target.value);
        regionInput = e.target.value;
        //Dejamos en blanco el body
        banderas.innerHTML = ""
        // Itineramos por los paises
        paises.forEach((pais) => {
            // Extraemos los datos 
            let { name, urlImg, poblation, capital, region } = pais;
            // comparamos el select con los existentes
            if (regionInput == region) {
                //Si concuerda los imprimimos
                //console.log('pais.name', name);
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
            }
        })
    })



}
const buscarInput = async () => {

}




// formulario
/* 
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
} */

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




document.addEventListener("DOMContentLoaded", fetchData)
document.addEventListener("DOMContentLoaded", extraerRegiones)
document.addEventListener("DOMContentLoaded", filtrarRegiones)

