document.addEventListener('DOMContentLoaded', async () => {
    const proprietarioSelect = document.getElementById('proprietario');
    //const veiculosList = document.getElementById('veiculos');

    // Obter a lista de proprietários
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
        // Lide com o erro, como exibir uma mensagem para o usuário.
    }
});

async function carregarVeiculos() {
    const proprietarioSelect = document.getElementById('proprietario');
    const veiculosTableBody = document.getElementById('veiculos');

    const cpfProprietario = proprietarioSelect.value;

    // Limpar a tabela de veículos
    veiculosTableBody.innerHTML = '';

    // Obter a lista de veículos associados ao proprietário selecionado
    try {
        const veiculosResponse = await fetch(`/api/associados/${cpfProprietario}`);
        const veiculosData = await veiculosResponse.json();

        veiculosData.forEach(veiculo => {
            const novaLinha = veiculosTableBody.insertRow();

            const placaCelula = novaLinha.insertCell(0);
            const modeloCelula = novaLinha.insertCell(1);
            const precoCelula = novaLinha.insertCell(2);
            const tipoCelula = novaLinha.insertCell(3);

            placaCelula.textContent = veiculo.placa_veiculo;
            modeloCelula.textContent = veiculo.modelo_veiculo;
            precoCelula.textContent = veiculo.preco_veiculo;
            tipoCelula.textContent = veiculo.descricao_tipo || 'Não especificado';
        });
    } catch (error) {
        console.error('Erro ao obter a lista de veículos associados:', error);
        // Lide com o erro, como exibir uma mensagem para o usuário.
    }
}
