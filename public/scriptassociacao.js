document.addEventListener('DOMContentLoaded', async () => {
    const proprietarioSelect = document.getElementById('proprietario');
    const veiculoSelect = document.getElementById('veiculo');
    
    try {
        // Preencher lista de proprietários
        const proprietariosResponse = await fetch('/api/proprietarios');
        const proprietariosData = await proprietariosResponse.json();

        if (proprietariosData.error) {
            throw new Error(proprietariosData.error);
        }

        proprietariosData.forEach(proprietario => {
            const option = document.createElement('option');
            option.value = proprietario.cpf;
            option.text = `${proprietario.nome} (CPF: ${proprietario.cpf})`;
            proprietarioSelect.appendChild(option);
        });

        // Preencher lista de veículos
        const veiculosResponse = await fetch('/api/veiculos');
        const veiculosData = await veiculosResponse.json();

   
        veiculosData.forEach(veiculo => {
            const option = document.createElement('option');
            option.value = veiculo.placa_veiculo;
            option.text = `${veiculo.modelo_veiculo} (Placa: ${veiculo.placa_veiculo})`;
            veiculoSelect.appendChild(option);
        });
        

    } catch (error) {
        console.error('Erro ao obter a lista de proprietários ou veículos:', error.message);
        // Lide com o erro, como exibir uma mensagem para o usuário.
    }
});

async function associarVeiculoProprietario() {
    const cpfProprietario = document.getElementById('proprietario').value;
    const placaVeiculo = document.getElementById('veiculo').value;

    try {
        const response = await fetch('/api/associacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpfProprietario, placaVeiculo }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
        
            // Exibir mensagem de sucesso ao usuário, redirecionar ou tomar outras ações necessárias.
            const mensagemSucesso = document.getElementById('respostaservidor');
            mensagemSucesso.innerHTML = '';
            mensagemSucesso.innerHTML = data.message;

        
        } else if (response.status === 400) {
            const errorData = await response.json();
            console.error(errorData.error);
        
            // Exibir mensagem de erro na página
            const mensagemErro = document.getElementById('respostaservidor');
            mensagemErro.textContent = '';
            mensagemErro.textContent = errorData.error;

        } else {
            throw new Error(`Erro ao associar veículo ao proprietário: ${response.statusText}`);
        }
        

    } catch (error) {
        console.error('Erro ao realizar a solicitação:', error);
        // Lide com o erro, como exibir uma mensagem para o usuário.
        const mensagemErro = document.getElementById('respostaservidor');
        mensagemErro.textContent = 'Erro ao realizar a solicitação. Por favor, tente novamente.';
    }
}



