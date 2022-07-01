const shoppingCart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody');
const emptyCartBtn = document.querySelector('#vaciar-carrito');
const coursesList = document.querySelector('#lista-cursos');
let articleShoppingCart = [];

cargarEventListener();
function cargarEventListener() {
    coursesList.addEventListener('click', addCourse);

};

function addCourse(data) {
    data.preventDefault();

    if (data.target.classList.contains('agregar-carrito')) { // target.classList.contains('agregar-carrito') --> busca la coincidencia dentro de las clases existentes en el DIV
        const courseSelect = data.target.parentElement.parentElement// accede a elementos html superiores al seleccionado;
        leerDatosCursos(courseSelect);
    }
}

function leerDatosCursos(course) {

    const courseInfo = {
        img: course.querySelector('img').src,
        titulo: course.querySelector('h4').textContent,
        precio: course.querySelector('span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    articleShoppingCart = [...articleShoppingCart, courseInfo]


    console.log(articleShoppingCart);

    addShoppingCartHTML();

   
}

function addShoppingCartHTML() {

    clearShoppingCartHTML();

    articleShoppingCart.forEach(course => {
        const { img, titulo, precio, cantidad } = course;
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>
                    <img src="${img}" width="100">
                </td>
                <td>
                    ${titulo}
                </td>
                <td>
                     ${precio}
                </td>
                <td>
                    ${cantidad}
                </td>`;

        cartContainer.appendChild(row);
    })


}

function clearShoppingCartHTML() {

    cartContainer.innerHTML = '';
}
