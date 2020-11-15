const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let contador = 0;

//função para virar carta
function flipCard() {
    //se lockBoard for verdadeiro ele impede que você vire outra carta
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
    
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        
        contador = contador + 1;
        if (contador === 6){ // quando o contador chegar a 6, todas os pares terão sido encontrados
            refreshScreen();
        }
        return;
    }

    unflipCards();
}


//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    //Esconde a felicitação pela vitória quando a página carrega
    // document.getElementById("win").style.display = "none";
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//Felicita o vencedor e
//atualiza a página depois que todas as combinações forem encontradas

function refreshScreen(){
    // traz à tona o elemento que estava escondido
    document.getElementById("win").style.display = "block";
    // Atualiza a página depois de 3 segundos
    setTimeout(() => {document.location.reload(true)}, 3000);
}

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});