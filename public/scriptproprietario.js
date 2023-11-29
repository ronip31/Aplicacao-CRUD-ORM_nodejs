document.getElementById('proprietarioForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const fone = document.getElementById('fone').value;

    try {
        const response = await fetch('/api/createproprietarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf, nome, fone }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao cadastrar um novo proprietário: ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById('respostaservidor').textContent = data.message;

    } catch (error) {
        console.error('Erro ao realizar a solicitação:', error);
        // Lide com o erro, como exibir uma mensagem para o usuário.
    }
});