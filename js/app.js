const shoppingCart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody');
const emptyCartBtn = document.querySelector('#vaciar-carrito');
const coursesList = document.querySelector('#lista-cursos');
let articleShoppingCart = [];

cargarEventListener();
function cargarEventListener() {
    coursesList.addEventListener('click', addCourse);

    shoppingCart.addEventListener('click', deleteCourse);

    emptyCartBtn.addEventListener('click', () => {
        console.log('Vaciando Carrito');
        articleShoppingCart = [];
        clearShoppingCartHTML();
    })

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

    const exist = articleShoppingCart.some(course => course.id === courseInfo.id);
    if (exist) {
        const courses = articleShoppingCart.map(course => {
            if (course.id === courseInfo.id) {
                course.cantidad++;
                return course;
            } else {
                return course;
            }
        });
        articleShoppingCart = [...courses];
    } else {
        articleShoppingCart = [...articleShoppingCart, courseInfo]
    }

    console.log(articleShoppingCart);

    addShoppingCartHTML();

}

function addShoppingCartHTML() {

    clearShoppingCartHTML();

    articleShoppingCart.forEach(course => {
        const { img, titulo, precio, cantidad, id } = course;
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
                </td>
                <td>
                <a href="#" class="borrar-curso" data-id=${id}> X </a>
                </td>`

        cartContainer.appendChild(row);
    })

}

function clearShoppingCartHTML() {

    cartContainer.innerHTML = '';
}

function deleteCourse(e) {

    if (e.target.classList.contains('borrar-curso')) {

        const courseID = e.target.getAttribute('data-id');

        articleShoppingCart = articleShoppingCart.filter(course => course.id !== courseID);
        addShoppingCartHTML();
    }

}