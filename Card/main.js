import Card from './card.js'
//начальные значения игры
function newGame (container, cardsCount) {
     cardsCount = cardsCount
    let cardsNumberArray = [],
        cardsArray = [],
        firstCard = null,
        secondCard = null,
        textInput = document.querySelector('.textInput');
//поле для ввода количества карт
textInput.addEventListener('input', function () {
    cardsCount = textInput.value;        
    container.innerHTML = ''
    cardsNumberArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null,
    newGame(container, cardsCount)
    })
//создаем массив с парами
    for(let i = 1; i<= cardsCount /2; i++) {
        cardsNumberArray.push(i)
        cardsNumberArray.push(i)
    }
//перемешиваем массив
    cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5)
//создаем карточки для массива
    for (const cardNumber of cardsNumberArray) {
        cardsArray.push(new Card(container, cardNumber, flip))
    }
//Логика игры
    function flip(card) {
        if (firstCard !== null && secondCard !== null){
            if(firstCard.number != secondCard.number) {
                firstCard.open = false
                secondCard.open = false
                firstCard = null
                secondCard = null
            }
        }
        if (firstCard == null) {
            firstCard = card
        } else {
            if (secondCard == null) {
                secondCard = card
            }            
        }

        if (firstCard !== null && secondCard !== null){
            if(firstCard.number == secondCard.number) {
                firstCard.success = true
                secondCard.success = true
                firstCard = null
                secondCard = null
            }
        }
        //условие окончания игры и перезапуск
        if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
            setTimeout( () => {
            alert('Победа')
            container.innerHTML = ''
            cardsNumberArray = [],
            cardsArray = [],
            firstCard = null,
            secondCard = null
            
            newGame(container, cardsCount)
            }, 1000)   
        }
    }    
}
let cardsCount = 6;
newGame(document.getElementById('game'), cardsCount)
