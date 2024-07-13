const containerProductos = document.querySelector(".container-productos");

fetch("http://localhost:3000/Productos")
    .then(response => response.json())
    .then(data => {
        data.forEach(elemento => {
            constroiCard(elemento.urlImagem, elemento.titulo, elemento.precio, elemento.id); 
        });
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

function constroiCard(urlImagem, titulo, precio, id) {
    const cardProducto = document.createElement('div');
    cardProducto.classList.add('card-producto', 'mt-5');

    cardProducto.innerHTML = `
        <img src="${urlImagem}" alt="" class="card-producto__img-producto">
        <div class="card-producto__legenda">
            <p class="card-producto__nombre-producto">${titulo}</p>
            <span class="card-producto__detalles">
                <span class="card-producto__precio">
                    <span>$</span>
                    <p class="card-producto__precio-producto">${precio}</p>
                </span>
                <img src="img/icon _trash.png" alt="icono de papelera" class="card-producto__icono-papelera" data-id="${id}">
            </span>
        </div>
    `;

    const imagemProducto = cardProducto.querySelector('.card-producto__img-producto');
    imagemProducto.style.width = '50%';

    containerProductos.appendChild(cardProducto);
}

containerProductos.addEventListener('click', event => {
    if (event.target.classList.contains('card-producto__icono-papelera')) {
        const id = event.target.getAttribute('data-id');
        excluirProducto(id);
    }
});

function excluirProducto(id) {
    fetch(`http://localhost:3000/Productos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao excluir producto: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto excluído com sucesso:', data);
        carregarProductos(); 
    })
    .catch(error => {
        console.error('Erro ao excluir o producto:', error);
    });
}

function carregarProductos() {
    // Limpa a lista de productos e carrega novamente
    containerProductos.innerHTML = '';
    fetch("http://localhost:3000/Productos")
        .then(response => response.json())
        .then(data => {
            data.forEach(elemento => {
                constroiCard(elemento.urlImagem, elemento.titulo, elemento.precio, elemento.id);
            });
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}
