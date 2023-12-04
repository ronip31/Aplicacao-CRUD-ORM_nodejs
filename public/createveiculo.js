document.addEventListener('DOMContentLoaded', () => {
    const veiculoForm = document.getElementById('veiculoForm');
    const veiculoInfo = document.getElementById('veiculoInfo');

    veiculoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(veiculoForm);
        const placa = formData.get('placa');
        const modelo = formData.get('modelo');
        const preco = formData.get('preco');

        try {
            const response = await fetch('/api/createveiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ placa, modelo, preco }),
            });

            if (response.ok) {
                const data = await response.json();

                const respostaServidor = document.getElementById('respostaservidor');
                respostaServidor.textContent = data.message || '';
                document.getElementById('veiculoForm').reset();

                const veiculoInfo = document.getElementById('veiculoInfo');
                if (veiculoInfo) {
                    veiculoInfo.style.display = 'block';
                    
                    document.getElementById('infoPlaca').textContent = `Placa: ${data.data.placa_veiculo}`;
                    document.getElementById('infoModelo').textContent = `Modelo: ${data.data.modelo_veiculo}`;
                    document.getElementById('infoPreco').textContent = `Preço: ${data.data.preco_veiculo}`;
                    document.getElementById('infoTipo').textContent = `Tipo: ${data.data.tipoVeiculo.descricao}`;
                }
            } else {
                const data = await response.json();


                const respostaServidor = document.getElementById('respostaservidor');
                respostaServidor.textContent = data.error || 'Erro desconhecido';
        
                const veiculoInfo = document.getElementById('veiculoInfo');
                if (veiculoInfo) {
                    veiculoInfo.style.display = 'block';
                }
            }
        } catch (error) {

            const respostaServidor = document.getElementById('respostaservidor');
            respostaServidor.textContent = `Erro ao cadastrar veículo. Detalhes: ${error.message || 'Erro desconhecido'}`;

            const veiculoInfo = document.getElementById('veiculoInfo');
            if (veiculoInfo) {
                veiculoInfo.style.display = 'block';
            }
        }
    });
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