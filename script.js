//variaveis de controle de interface
let seuVotoPara = document.querySelector('.texto-inicial span');
let cargo = document.querySelector('.cargo span');
let restInfo = document.querySelector('.rest-info');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.numero');

//controle de ambiente

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros;i++){
        if(i === 0) {
            numeroHtml += '<div class="num pisca"></div>';
        }else{
            numeroHtml += '<div class="num"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    restInfo.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato [0];
        seuVotoPara.style.display = 'block';
        restInfo.innerHTML = `Nome: ${candidato.nome}</br>
        Partido: ${candidato.partido}`;
        aviso.style.display = 'block';
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="cargo-image small"> <img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
            fotosHtml += `<div class="cargo-image"> <img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
        }
    }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        restInfo.innerHTML = '<div class="aviso pisca">VOTO NULO</div>';
    }
    
}

function clicou(n) {
    let elNumero = document.querySelector('.num.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca'); 
        } else {
        atualizaInterface();
        }
    }
}
/* função para votar em branco sem digitar numeros
function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        restInfo.innerHTML = '<div class="aviso pisca">VOTO BRANCO</div>';  
    } else {
        alert("Para votar em branco não pode ter numeros digitados")
    }
}
*/

//funçao para votar em branco com numeros 

function branco(){
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        restInfo.innerHTML = '<div class="aviso pisca">VOTO BRANCO</div>';  
        lateral.innerHTML = '';
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
       votos.push({
           etapa:etapas[etapaAtual].titulo,
           voto: 'branco'
       });
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="fim pisca">FIM!</div>';
            console.log(votos);
        }

    }


}

comecarEtapa();