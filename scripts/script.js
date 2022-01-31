import { getPaises } from "../controllador/controllador.js";




// Vanessa
const banderas = document.getElementById('banderas')
const query = new URLSearchParams(window.location.search)
const params = query.get('name')
console.log(params)



const fetchData = () => {
    let banderas = getPaises()
    console.log(banderas)
    banderillas(banderas)
}

const banderillas = data => {
    
    data.forEach(item => {
        let {name,urlImg,poblation,capital} = item;
        console.log('name', name);
        elementos += `
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

// ultimo

const filtros = data => {

    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
    
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
          h = this.parentNode.previousSibling;
          
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                
                console.log(s.options[i].value)
                const query = s.options[i].value
                if (query === '') {
                  banderillas(data)
                } else {
                  const arrayFiltrado = data.filter(item => item.region === query)
                  banderillas(arrayFiltrado)
                }
                
                break;
              }
            }
            h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    
    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    
    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
      document.addEventListener("click", closeAllSelect);
    
    
    }



    document.addEventListener("DOMContentLoaded",fetchData)
