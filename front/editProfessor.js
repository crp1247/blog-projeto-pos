document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api/movie'; // URL da sua API
    const postsContainer = document.getElementById('posts-container');

    async function fetchAndDisplayPosts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Erro ao buscar os posts');

            const posts = await response.json();
            postsContainer.innerHTML = ''; // Limpa os posts anteriores

            posts.forEach(post => {
                const listItem = document.createElement('li' );
                listItem.className = 'post-item';
                listItem.innerHTML = ` 
                    <img src="${post.poster}" alt="${post.title}" style="width: 150px;">
                <div class="text-container">
                    <h2><span>ID:</span> ${post._id}</h2>
                    <h3><span>Titulo:</span>  ${post.title}</h3>
                    <p><span>Descricao:</span>  ${post.description}</p>
                    <p><span>Categoria:</span>  ${post.categoria}</p>
                    <p><span>Professor:</span>  ${post.professor}</p>
                    <div class="buttons">
                    <button onclick="editPost('${post._id}')">Editar</button>
                    <button onclick="deletePost('${post._id}')">Deletar</button>
                    </div>
                </div>
                </li>`;
                postsContainer.appendChild(listItem);
            });
        } catch (error) {
            console.error('Erro:', error);
            postsContainer.innerHTML = `<li>Erro ao carregar os posts: ${error.message}</li>`;
        }
    }

    fetchAndDisplayPosts();

    window.editPost = (postId) => {
        window.location.href = `editar.html?postId=${postId}`;
    };

    window.deletePost = async (postId) => {
        const confirmDelete = confirm('Tem certeza de que deseja deletar esta postagem?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/movie/${postId}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            if (response.ok) {
                alert('Postagem deletada com sucesso!');
                fetchAndDisplayPosts(); // Atualiza a lista de posts
            } else {
                alert(`Erro ao deletar postagem: ${result.message}`);
            }
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    };
});
