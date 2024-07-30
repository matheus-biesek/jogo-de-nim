function computadorJoga(pecas, maxTirar) {
    document.getElementById('inicio_ou_fim').textContent = "Vez do computador!";
    let botaoJogada = document.querySelector('button.btn-success');
    botaoJogada.disabled = true;

    setTimeout(() => {
        try {
            let jogada = calculoJogada(pecas, maxTirar);
            let pecasTotal = pecas - jogada;
            historicoComputador(jogada, pecasTotal);

            document.getElementById('inicio_ou_fim').textContent = "Sua vez!";
            document.getElementById('jogada_computador').textContent = `O computador tirou ${jogada} peça(s)`;
            
            if (pecasTotal == 0) {
                alert(`O computador tirou ${jogada} peça(s), o total de peças é ${pecasTotal}. O computador ganhou!`);
                document.getElementById('quem_ganhou').textContent = "Computador Ganhou!";
                let paragrafo = document.createElement('p');
                paragrafo.textContent = "O computador ganhou!";
                document.getElementById('historico').appendChild(paragrafo);
                return;
            }

            alert(`O computador tirou ${jogada} peça(s)\nO total de peças é ${pecasTotal}.\nAgora é a sua vez de jogar!`);
        } finally {
            botaoJogada.disabled = false;
        }
    }, 2000);
}

function calculoJogada(pecas, maxTirar) {
    return (pecas % (maxTirar + 1) !== 0) ? pecas % (maxTirar + 1) : 1;
}

function historicoComputador(jogada, pecasTotal) {
    let historico = document.getElementById('historico');
    let paragrafo = document.createElement('p');
    paragrafo.innerHTML = `O computador tirou ${jogada} peça(s).<br>O total de peça(s) é ${pecasTotal}.`;
    historico.appendChild(paragrafo);

    document.getElementById('placa_qtd_pecas').textContent = pecasTotal;
}

function vezUsuario() {
    let pecasTotal = parseInt(document.getElementById('placa_qtd_pecas').textContent);
    let jogaUsuario = parseInt(document.getElementById('resposta_usuario').value);
    let maxTirar = parseInt(document.getElementById('limite_retirar').textContent);

    if (pecasTotal == 0) {
        return;
    }

    if (isNaN(jogaUsuario) || jogaUsuario <= 0 || jogaUsuario > maxTirar || jogaUsuario > pecasTotal) {
        alert("Valor inválido! Digite um número entre 1 e o limite máximo de peças que podem ser retiradas e não maior do que o total disponível.");
        document.getElementById('resposta_usuario').value = "";
        return;
    }

    pecasTotal -= jogaUsuario;
    document.getElementById('placa_qtd_pecas').textContent = pecasTotal;

    let historico = document.getElementById('historico');
    let paragrafo = document.createElement('p');
    paragrafo.innerHTML = `Você tirou ${jogaUsuario} peça(s).<br>O total de peças é ${pecasTotal}.`;
    historico.appendChild(paragrafo);

    userGanhoOuPcJoga(pecasTotal, maxTirar);

    alert("O computador está prestes a jogar!");
}

function userGanhoOuPcJoga(pecasTotal, maxTirar) {
    if (pecasTotal === 0) {
        document.getElementById('quem_ganhou').textContent = "Você Ganhou!";
        document.getElementById('inicio_ou_fim').textContent = "Fim";

        let paragrafo = document.createElement('p');
        paragrafo.textContent = "Você ganhou!";
        document.getElementById('historico').appendChild(paragrafo);
        
        alert("Parabéns, você ganhou o jogo!");
    } else {
        computadorJoga(pecasTotal, maxTirar);
    }
}

function jogar() {
    let numPecasMax = parseInt(document.getElementById('num_pecas_max').value);
    let qtdMaxTirar = parseInt(document.getElementById('qtd_max_tirar').value);

    if (isNaN(numPecasMax) || numPecasMax <= 0) {
        alert("Digite um número válido para o total de peças!");
        return;
    }
    
    if (isNaN(qtdMaxTirar) || qtdMaxTirar <= 0) {
        alert("Digite um número válido para o limite máximo de peças que podem ser retiradas!");
        return;
    }

    document.getElementById('quem_ganhou').textContent = "";
    document.getElementById('jogada_computador').textContent = "";
    document.getElementById('historico').innerHTML = "";

    historicoInicioJogo(numPecasMax, qtdMaxTirar);
    quemComeca(numPecasMax, qtdMaxTirar);
}

function quemComeca(pecas, maxTirar) {
    if (pecas % (maxTirar + 1) !== 0) {
        alert("O computador começa!");
        document.getElementById('inicio_ou_fim').textContent = "O computador começa!";
        setTimeout(() => {
            computadorJoga(pecas, maxTirar);
        }, 1000);
    } else {
        document.getElementById('inicio_ou_fim').textContent = "Pode começar!";
    }
}

function historicoInicioJogo(pecas, maxTirar) {
    let historico = document.getElementById('historico');
    let paragrafo = document.createElement('p');
    paragrafo.innerHTML = `INICIANDO<br>O total de peças é ${pecas}.`;
    historico.appendChild(paragrafo);

    document.getElementById('limite_retirar').textContent = maxTirar;
    document.getElementById('placa_qtd_pecas').textContent = pecas;
}
