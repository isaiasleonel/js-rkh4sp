// Import stylesheets
import './style.css';

('use strict');

// Tomo el DOM a los form y btn
let cupon = document.querySelector('#form_cupon');
let total = document.querySelector('#precio_total');
let form = document.querySelector('#form_ceveza');
document.querySelector('#btn_vaciar').addEventListener('click', vaciar);

// funciones de formData
cupon.addEventListener('submit', aplicarCupon);
form.addEventListener('submit', agregar);

// 📝 Variables global
let pedidos = [];
let sumadorPedidos = 0;
let totalPrecio = 0;

// Agregar PEdidos
function agregar(e) {
  e.preventDefault();
  // 📝 Datos
  let formData = new FormData(form);
  let cerveza = formData.get('cerveza');
  let cantidad = Number(formData.get('cantidad'));
  console.log(cerveza);
  console.log(cantidad);

  // condicion  de cervezas
  if (cantidad >= 1 && cantidad < 10 && sumadorPedidos + cantidad <= 20) {
    contarPedido(cantidad);
    console.log(sumadorPedidos);

    // 📝 Nuevo Objeto
    let pedido = {
      cerveza: cerveza,
      cantidad: cantidad,
    };

    // 📝 Array Push
    pedidos.push(pedido);
    console.log(pedidos);
  } else {
    console.log('no puede mas');
  }
  mostrar();
  imprimirtotal();
}

// cuento pedidos
function contarPedido(cantidadbeer) {
  sumadorPedidos += cantidadbeer;
}

// vaciar tabla
function vaciar() {
  let tbody = document.querySelector('#tabla_beer');
  tbody.innerHTML = '';
  total.innerHTML = 0;
  pedidos = [];
}

// aplicar descuento de cupon si ingresa tudai2022
function aplicarCupon(e) {
  e.preventDefault();

  // let aplicarDescuento = false;
  let formData = new FormData(cupon);
  if (formData.get('cupon') == 'tudai2022') {
    actualizar();
  }
}

// actualizo datos de descuento si es true == tudai2022
function actualizar() {
  totalPrecio = totalPrecio - sumadorPedidos * 200;

  // totalPrecio -= 200;
  total.textContent = totalPrecio;
  console.log(total);
}

// imprimir
function mostrar() {
  let tabla = document.querySelector('#tabla_beer');
  tabla.innerHTML = ' ';
  for (const i of pedidos) {
    tabla.innerHTML += `  <tr>
    <td>${i.cantidad}</td>
    <td>${i.cerveza}</td>
  </tr> 
    `;
  }
}

mostrar();
function imprimirtotal() {
  totalPrecio = sumadorPedidos * 400;
  total.textContent = totalPrecio;
}
