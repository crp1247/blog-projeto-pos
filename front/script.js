document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api/movie'; // URL da sua API
    const itemsContainer = document.getElementById('items-container');
    const navLinks = document.querySelectorAll('nav a');

    async function fetchAndDisplayItems(category = '') {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Erro ao buscar os itens');

            const items = await response.json();
            itemsContainer.innerHTML = ''; // Limpa os itens anteriores

            items
                .filter(item => category === '' || category === 'tudo' || item.categoria === category)
                .forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = ` <div class="div-contem"><img src=${item.poster}></img><div class="text-container">
                    <h3 class="funciona">${item.title}</h3>
                    <p>${item.description}</p>
                   </div> </div>`;
                    itemsContainer.appendChild(listItem);
                });
        } catch (error) {
            console.error('Erro:', error);
            itemsContainer.innerHTML = `<li>Erro ao carregar os itens: ${error.message}</li>`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            fetchAndDisplayItems(category);
        });
    });

    fetchAndDisplayItems();
});
