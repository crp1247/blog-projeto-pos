document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const responseMessage = document.getElementById('responseMessage');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const professor = document.getElementById('professor').value;
        const categoria = document.getElementById('categoria').value;
        const stars = document.getElementById('stars').value.split(',').map(star => star.trim());
        const poster = document.getElementById('poster').value;

        try {
            const response = await fetch('http://localhost:3000/api/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, professor, categoria, stars, poster })
            });

            const result = await response.json();
            if (response.ok) {
                responseMessage.innerText = 'Postagem cadastrada com sucesso!';
                postForm.reset();
            } else {
                responseMessage.innerText = `Erro: ${result.message}`;
            }
        } catch (error) {
            responseMessage.innerText = `Erro: ${error.message}`;
        }
    });
});
