// Funcion que llega desde el controlador
import { getPaises } from "../controllador/controllador.js";
//ELementos dom
const select = document.getElementById("selects");
const banderas = document.getElementById('banderas')
const inputBusqueda = document.getElementById('inputFormulario');
const article = document.querySelectorAll(".card")

// Funciones

const fetchData = async() => {
    let banderas = await getPaises()
        /* console.log(banderas) */
    banderillas(banderas)
}

const banderillas = data => {

    data.forEach(item => {

        let { name, urlImg, poblation, capital, region } = item;
       
        /*  console.log('name', name); */

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

const extraerRegiones = async() => {
    let regiones = []
    let array = await getPaises();
    array.forEach((pais) => {
        let { region } = pais;
        if (!regiones.includes(region)) {
            regiones.push(region);
            select.innerHTML += `<option id="${region}" value="${region}">${region}</option>`
        }
    })
}

const filtrarRegiones = async() => {
    let paises = await getPaises()
    let regionInput = ""
    select.addEventListener("click", e => {
        /* console.log(e.target.value); */
        regionInput = e.target.value;
        //Dejamos en blanco el body
        banderas.innerHTML = ""
            // Itineramos por los paises
            let nuevaArray = paises.filter(pais => regionInput === pais.region);
            banderillas(nuevaArray);
    })



}
const buscarInput = async() => {
    let paises = await getPaises();
    console.log(inputBusqueda.value)
    let inputMinuscula =  inputBusqueda.value.toLowerCase()

    let arrayFilter = paises.filter(pais => 
        pais.name.toLowerCase().includes(inputMinuscula))
    banderas.innerHTML = "";

    //html
    banderillas(arrayFilter)
    console.log(arrayFilter)
}

inputBusqueda.addEventListener("click", (e) => {
    e.preventDefault()
    buscarInput()
})
article.forEach(e => {
    console.log(e);
    e.addEventListener("click",(evento) =>{
        console.log("evento")
    })
})


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
    /* console.log('diste click') */
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