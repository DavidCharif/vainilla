// Funcion que llega desde el controlador
import { getPaises } from "../controllador/controllador.js";
//ELementos dom
const select = document.getElementById("selects");
const banderas = document.getElementById('banderas')
const inputBusqueda = document.getElementById('inputFormulario');
const article = document.getElementById("article")

let paises;
let cardPaises = []
// Funciones

const fetchData = async() => {
    if (paises == null){
        paises = await getPaises()
    }   
        /* console.log(banderas) */
    banderillas(paises)
}

const banderillas = data => {

    data.forEach(item => {
        let { name, urlImg, poblation, capital, region } = item;
       
        /*  console.log('name', name); */

        banderas.innerHTML += `
        <div 
        <article class="card" data-value="${name}">
            <img src="${urlImg}" alt="" class="img-fluid" data-value="${name}">
            <div class="card-content" data-value="${name}">
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
    /* let card = document.querySelectorAll(".card")
    card.forEach(article => {
        article.addEventListener("click", e=> {
            detalle(e)
        })
    }) */
    

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
        console.log(regionInput);
        banderas.innerHTML = ""
        //Dejamos en blanco el body
        if(regionInput === "todos"){
            banderillas(paises)
        } else {
            let nuevaArray = paises.filter(pais => regionInput === pais.region);
            banderillas(nuevaArray);
        }
        
            // Itineramos por los paises
            
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
    await buscarInput()
})

/* const detalle = (e) => {
    console.log(e.target.getAttribute("data-value"));
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
