document.addEventListener('DOMContentLoaded', () => {
    const deleteForm = document.getElementById('deleteForm');
    const responseMessage = document.getElementById('responseMessage');

    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const postId = document.getElementById('postId').value;

        try {
            const response = await fetch(`http://localhost:3000/api/movie/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (response.ok) {
                responseMessage.innerText = 'Postagem deletada com sucesso!';
                deleteForm.reset();
            } else {
                responseMessage.innerText = `Erro: ${result.message}`;
            }
        } catch (error) {
            responseMessage.innerText = `Erro: ${error.message}`;
        }
    });
});
