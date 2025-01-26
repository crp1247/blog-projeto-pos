document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('editForm');
    const responseMessage = document.getElementById('responseMessage');
    
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    async function loadPost() {
        try {
            const response = await fetch(`http://localhost:3000/api/movie/${postId}`);
            const post = await response.json();
            if (response.ok) {
                document.getElementById('title').value = post.title;
                document.getElementById('description').value = post.description;
                document.getElementById('professor').value = post.professor;
                document.getElementById('categoria').value = post.categoria;
                document.getElementById('stars').value = post.stars.join(', ');
                document.getElementById('poster').value = post.poster;
            } else {
                responseMessage.innerText = `Erro: ${post.message}`;
            }
        } catch (error) {
            responseMessage.innerText = `Erro: ${error.message}`;
        }
    }

    loadPost();

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const professor = document.getElementById('professor').value;
        const categoria = document.getElementById('categoria').value;
        const stars = document.getElementById('stars').value.split(',').map(star => star.trim());
        const poster = document.getElementById('poster').value;

        try {
            const response = await fetch(`http://localhost:3000/api/movie/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, professor, categoria, stars, poster })
            });

            const result = await response.json();
            if (response.ok) {
                responseMessage.innerText = 'Postagem atualizada com sucesso!';
            } else {
                responseMessage.innerText = `Erro: ${result.message}`;
            }
        } catch (error) {
            responseMessage.innerText = `Erro: ${error.message}`;
        }
    });
});
