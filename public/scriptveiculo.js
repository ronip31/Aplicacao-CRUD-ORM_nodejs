document.addEventListener('DOMContentLoaded', () => {
    const veiculoForm = document.getElementById('veiculoForm');
    const veiculoInfo = document.getElementById('veiculoInfo');
    //const respostaServidor = document.getElementById('respostaservidor');

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

           // const data = await response.json();

            if (response.ok) {
                const data = await response.json();
        
                // Exibir mensagem de sucesso
                const respostaServidor = document.getElementById('respostaservidor');
                respostaServidor.textContent = data.message || '';
        
                // Exibir informações do veículo adicionado
                const veiculoInfo = document.getElementById('veiculoInfo');
                if (veiculoInfo) {
                    veiculoInfo.style.display = 'block'; // Mostrar a div de informações
                    // Atualizar as informações do veículo, se necessário
                    document.getElementById('infoPlaca').textContent = `Placa: ${data.data.placa_veiculo}`;
                    document.getElementById('infoModelo').textContent = `Modelo: ${data.data.modelo_veiculo}`;
                    document.getElementById('infoPreco').textContent = `Preço: ${data.data.preco_veiculo}`;
                    document.getElementById('infoTipo').textContent = `Tipo: ${data.data.tipoVeiculo.descricao}`;
                }
            } else {
                const data = await response.json();
        
                // Exibir mensagem de erro retornada pelo servidor
                const respostaServidor = document.getElementById('respostaservidor');
                respostaServidor.textContent = data.error || 'Erro desconhecido';
        
                // Mostrar a div de informações mesmo em caso de erro (se necessário)
                const veiculoInfo = document.getElementById('veiculoInfo');
                if (veiculoInfo) {
                    veiculoInfo.style.display = 'block';
                }
            }
        } catch (error) {
            // Exibir mensagem de erro real retornada pelo servidor
            const respostaServidor = document.getElementById('respostaservidor');
            respostaServidor.textContent = `Erro ao cadastrar veículo. Detalhes: ${error.message || 'Erro desconhecido'}`;
        
            // Mostrar a div de informações mesmo em caso de erro (se necessário)
            const veiculoInfo = document.getElementById('veiculoInfo');
            if (veiculoInfo) {
                veiculoInfo.style.display = 'block';
            }
        }
    });
});