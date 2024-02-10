//создаем класс с карточками
export default class Card {
    _open = false
    _success = false
    //Запускаем функцию конструктор
    constructor(container, number, action) {
        this.card = document.createElement('div')
        this.card.classList.add('card')
        this.card.textContent = number
        this.number = number
    //обрабатываем нажатие на карту
        this.card.addEventListener('click', () => {
            if (this.open == false && this.success == false) {
             this.open = true
             action(this)
            }
        })
        container.append(this.card)
    }
    //Создаем сеттеры и геттеры для управления состоянием карточки
    set open(value) {
        this._open = value
        value ? this.card.classList.add('open') : this.card.classList.remove('open')
    }

    get open() {
        return this._open
    }

    set success(value) {
        this._success = value
        value ? this.card.classList.add('success') : this.card.classList.remove('success')
    }

    get success() {
        return this._success
    }
}






