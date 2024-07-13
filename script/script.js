import { mensajes } from "./mensajes-error.js"

const camposFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]')
const btnLimpar = document.querySelector('.add-producto__container-form__limpiar');

Array.from(camposFormulario).forEach(campo => {
    campo.addEventListener('blur', ()=> verificaCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

btnLimpar.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#nombre').value = ''
    document.querySelector('#precio').value = ''
    document.querySelector('#imagen').value = ''
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const titulo = document.querySelector('#nombre').value
    const preco = document.querySelector('#precio').value
    const urlImagem = document.querySelector('#imagem').value

    const novoProducto = {
        titulo,
        precio,
        urlImagem
    }
    console.log(novoProducto)
    post(novoProducto)
})

function post(producto){
    fetch("http://localhost:3000/Productos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto adicionado com sucesso:', data);
    })
    .catch(error => {
        console.error('Error al agregar producto:', error);
    });
};

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'tooShort',
    'customError'
]

function verificaCampo(campo){
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]){
            mensagem = mensajes[campo.id][erro]
        }
    })
    const elemMensagemErro = campo.parentNode.querySelector('.erro')
    const validadorDeInput = campo.checkValidity()

    if(!validadorDeInput) {
        elemMensagemErro.textContent = mensagem
    }else {
        elemMensagemErro.textContent = ''
    }
}
