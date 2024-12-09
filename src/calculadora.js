// Função para formatar valor monetário em Real
function formatarReal(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função de máscara de moeda
function mascararMoeda(input) {
    // Remove todos os caracteres não numéricos
    let valor = input.value.replace(/\D/g, '');
    
    // Garante que tenha pelo menos 3 dígitos
    while (valor.length < 3) {
        valor = '0' + valor;
    }
    
    // Separa os centavos
    valor = valor.replace(/(\d{2})$/, ',$1');
    
    // Adiciona ponto para milhares
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    
    // Adiciona R$
    input.value = 'R$ ' + valor;
}

// Função para converter valor monetário para número
function converterParaNumero(valorMonetario) {
    // Remove R$, espaços, pontos e substitui vírgula por ponto
    return parseFloat(
        valorMonetario
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim()
    );
}

// Função para calcular Média 1
function calcularMedia1(valorMes1, valorMes2) {
    return ((valorMes2 / valorMes1 - 1) * 100).toFixed(2);
}

// Função para calcular Valor do Mês Futuro
function calcularValorMesFuturo(media1, valorMes2) {
    return (valorMes2 * (1 + (media1 / 100) + 0.1)).toFixed(2);
}

// Função para calcular Média 2
function calcularMedia2(valorMes2, valorMesFuturo) {
    return ((valorMesFuturo / valorMes2 - 1) * 100).toFixed(2);
}

// Função para calcular Média de Upgrade
function calcularMediaUpgrade(media1, media2) {
    return ((parseFloat(media1) + parseFloat(media2)) / 2).toFixed(2);
}

// Evento de cálculo
document.addEventListener('DOMContentLoaded', () => {
    const valorMes1Input = document.getElementById('valorMes1');
    const valorMes2Input = document.getElementById('valorMes2');
    const calcularBtn = document.getElementById('calcularBtn');
    
    const tabelaResultados = document.getElementById('tabelaResultados');

    // Adiciona evento de formatação em tempo real
    valorMes1Input.addEventListener('input', () => mascararMoeda(valorMes1Input));
    valorMes2Input.addEventListener('input', () => mascararMoeda(valorMes2Input));

    calcularBtn.addEventListener('click', () => {
        // Converte valores monetários para números
        const valorMes1 = converterParaNumero(valorMes1Input.value);
        const valorMes2 = converterParaNumero(valorMes2Input.value);

        console.log('Valores de entrada:', { valorMes1, valorMes2 });

        if (isNaN(valorMes1) || isNaN(valorMes2)) {
            alert('Por favor, insira valores válidos para Mês 1 e Mês 2');
            return;
        }

        const media1 = calcularMedia1(valorMes1, valorMes2);
        const valorMesFuturo = calcularValorMesFuturo(media1, valorMes2);
        const media2 = calcularMedia2(valorMes2, valorMesFuturo);
        const mediaUpgrade = calcularMediaUpgrade(media1, media2);

        // Atualizar tabela de resultados
        const linhas = tabelaResultados.getElementsByTagName('tr');
        linhas[0].cells[2].textContent = media1 + '%';
        linhas[1].cells[2].textContent = formatarReal(parseFloat(valorMesFuturo));
        linhas[2].cells[2].textContent = media2 + '%';
        linhas[3].cells[2].textContent = mediaUpgrade + '%';

        // Adicionar formatação brasileira na segunda coluna
        linhas[0].cells[1].textContent = 'Variação do Mês 1 para o Mês 2';
        linhas[1].cells[1].textContent = `Valor do Mês 2 (${formatarReal(valorMes2)}) com aumento de 10%`;
        linhas[2].cells[1].textContent = 'Variação do Mês 2 para o Mês Futuro';
        linhas[3].cells[1].textContent = 'Média das variações do Mês 1 para o Mês 2 e do Mês 2 para o Mês Futuro';
    });
});

// Estilos CSS responsivos
const style = document.createElement('style');
style.textContent = `
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 15px;
    }

    .calculadora-container {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 100%;
        max-width: 500px;
    }

    .input-grupo {
        margin-bottom: 15px;
    }

    .input-grupo label {
        display: block;
        margin-bottom: 5px;
        color: #333;
    }

    .input-grupo input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
    }

    #calcularBtn {
        width: 100%;
        padding: 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
    }

    #calcularBtn:hover {
        background-color: #0056b3;
    }

    .resultados {
        margin-top: 20px;
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
    }

    .resultado-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }

    th {
        background-color: #f0f0f0;
    }

    @media screen and (max-width: 600px) {
        .calculadora-container {
            width: 100%;
            max-width: 100%;
            margin: 0 10px;
        }

        .resultado-item {
            flex-direction: column;
            text-align: center;
        }
    }
`;
document.head.appendChild(style);

// Adicionar HTML responsivo dinamicamente
const container = document.createElement('div');
container.innerHTML = `
    <div class="calculadora-container">
        <div class="input-grupo">
            <label for="valorMes1">Valor do Mês 1</label>
            <input type="text" id="valorMes1" placeholder="Digite o valor do Mês 1" required>
        </div>
        <div class="input-grupo">
            <label for="valorMes2">Valor do Mês 2</label>
            <input type="text" id="valorMes2" placeholder="Digite o valor do Mês 2" required>
        </div>
        <button id="calcularBtn">Calcular Upgrade</button>
        <div class="resultados">
            <table id="tabelaResultados">
                <tr>
                    <th>Média 1</th>
                    <th>Descrição</th>
                    <th>Resultado</th>
                </tr>
                <tr>
                    <td>Média 1</td>
                    <td>Variação do Mês 1 para o Mês 2</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Valor do Mês Futuro</td>
                    <td>Valor do Mês 2 com aumento de 10%</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Média 2</td>
                    <td>Variação do Mês 2 para o Mês Futuro</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Média de Upgrade</td>
                    <td>Média das variações do Mês 1 para o Mês 2 e do Mês 2 para o Mês Futuro</td>
                    <td>-</td>
                </tr>
            </table>
        </div>
    </div>
`;
document.body.appendChild(container);
