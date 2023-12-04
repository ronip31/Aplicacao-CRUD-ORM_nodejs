
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ cpf, nome, fone }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao cadastrar um novo proprietário: ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById('respostaservidor').textContent = data.message;

        document.getElementById('proprietarioForm').reset();
        
    } catch (error) {
        console.error('Erro ao realizar a solicitação:', error);
    }
});


function logout(){

    localStorage.removeItem('token');
        token = null;
      fetch('/remove-token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Token enviado com sucesso para o servidor');
          window.location.href = '/login'; 
      })
      .catch(error => console.error('Erro ao enviar o token:', error));
        window.location.href = '/login'; 
}