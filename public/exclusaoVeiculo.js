document.addEventListener('DOMContentLoaded', async () => {
    const veiculoSelect = document.getElementById('veiculo');


    const opcaoInicial = document.createElement('option');
    opcaoInicial.value = '';
    opcaoInicial.text = 'Selecione:';
    veiculoSelect.appendChild(opcaoInicial);

    try {

        const veiculosResponse = await fetch('/api/veiculos');
        const veiculosData = await veiculosResponse.json();

        veiculosData.forEach(veiculo => {
            const option = document.createElement('option');
            option.value = veiculo.placa_veiculo;
            option.text = `${veiculo.modelo_veiculo} (Placa: ${veiculo.placa_veiculo})`;
            veiculoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao obter a lista de veículos:', error.message);

    }
});

async function excluirVeiculo() {
    const veiculoSelect = document.getElementById('veiculo');
    const placaVeiculo = veiculoSelect.value;

    try {
        const response = await fetch(`/api/deleteveiculos/${placaVeiculo}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('mensagem').textContent = data.message;

            veiculoSelect.remove(veiculoSelect.selectedIndex);
        } else {
            document.getElementById('mensagem').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro ao excluir veículo:', error);
    }
}