document.addEventListener('DOMContentLoaded', async () => {
    const proprietarioSelect = document.getElementById('proprietario');


    const opcaoInicial = document.createElement('option');
    opcaoInicial.value = ''; 
    opcaoInicial.text = 'Selecione:';
    proprietarioSelect.appendChild(opcaoInicial);


    try {
        const proprietariosResponse = await fetch('/api/proprietarios');
        const proprietariosData = await proprietariosResponse.json();

        proprietariosData.forEach(proprietario => {
            const option = document.createElement('option');
            option.value = proprietario.cpf;
            option.text = `${proprietario.nome} (CPF: ${proprietario.cpf})`;
            proprietarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao obter a lista de proprietários:', error);
    }
});

async function carregarVeiculos() {
    const proprietarioSelect = document.getElementById('proprietario');
    const veiculoSelect = document.getElementById('veiculo');

    const cpfProprietario = proprietarioSelect.value;
    

    veiculoSelect.innerHTML = '<option value="">Selecione:</option>';

    try {
        const veiculosResponse = await fetch(`/api/associados/${cpfProprietario}`);
        const veiculosData = await veiculosResponse.json();

        veiculosData.forEach(veiculo => {
            const option = document.createElement('option');
            option.value = veiculo.placa_veiculo;
            option.text = `${veiculo.modelo_veiculo} (Placa: ${veiculo.placa_veiculo})`;
            veiculoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao obter a lista de veículos associados:', error);

    }
}

async function desassociarVeiculo() {
    const proprietarioSelect = document.getElementById('proprietario');
    const veiculoSelect = document.getElementById('veiculo');
    const veiculosTableBody = document.getElementById('veiculos');

    const cpfProprietario = proprietarioSelect.value;
    const placaVeiculo = veiculoSelect.value;

    // Verifique se um veículo está selecionado no combobox
    if (!placaVeiculo) {
        console.error('Nenhum veículo selecionado para desassociação');
        return;
    }

    try {
        // Envie uma solicitação para desassociar o veículo
        const response = await fetch(`/api/desassociar/${cpfProprietario}/${placaVeiculo}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Veículo desassociado com sucesso');
            
            carregarVeiculos();
            
            const respostaServidor = document.getElementById('respostaservidor');
            respostaServidor.innerHTML = 'Veículo desassociado com sucesso';

            veiculoSelect.innerHTML = '<option value="">Selecione:</option>';
        } else {
            console.error('Erro ao desassociar veículo:', response.statusText);
            
            const respostaServidor = document.getElementById('respostaservidor');
            respostaServidor.innerHTML = 'Erro ao desassociar veículo';
        }
    } catch (error) {
        console.error('Erro ao desassociar veículo:', error);
        
        const respostaServidor = document.getElementById('respostaservidor');
        respostaServidor.innerHTML = 'Erro ao desassociar veículo';
    }
}

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