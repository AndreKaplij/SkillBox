(function() { 
    let listArray = [],
        listName = '';
    //создаем и возвращаем заголовок
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);
        //отключаем кнопку если поле пустое и включаем если заполнено
        input.addEventListener('input', function() {
            if (input.value !=='') {
                button.disabled = false
            }
            else {
                button.disabled = true
            };

        })

        return {
            form,
            input,
            button,
        };
    }

    //создаем и возвращаем список элементов 
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    //Создаем элемент списка дел и возвращаем все
    function createTodoItem(obj) {
        let item = document.createElement('li');
        // создаем элемент с кнопками
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //устанавливаем стили для кнопок и контейнера
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');

        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово';

        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        if(obj.done==true) item.classList.add('list-group-item-success');

        //создаем обработку кнопок
        doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success')

            //изменяем значение done в массиве при нажатии кнопки готово
            for (const listItem of listArray) {
                if (listItem.id == obj.id) listItem.done = !listItem.done
            }
            saveList(listArray, listName) //запускаем функцию сохранения
            console.log(listArray);
            });

        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
            item.remove();

            //удаляем элемент из массива при нажатии кнопки          
            for (let i = 0; i < listArray.length; i++) {
                if (listArray[i].id == obj.id) listArray.splice(i, 1)
            }
            console.log(listArray)
            saveList(listArray, listName) //запускаем функцию сохранения
            }

        });        

        //вкладываем кнопки в отдельный элемент
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        //возвращаем элементы
        return {
            item,
            doneButton,
            deleteButton,
        }
    }
    //функция генерации id
    function getNewID(arr) {
        let max = 0;
        for (const item of arr) {
            if (item.id > max) max = item.id
        }
        return max + 1;
    }
    //функция сохранения
    function saveList(arr) {
        localStorage.setItem(listName, JSON.stringify(arr));
    }

    //создаем функцию для создания списка
    function createTodoApp(container, title = 'Список дел', keyName, defArray = []) {
       
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        listName = keyName; //делаем keyName глобальной переменной
        listArray = defArray; //присваеваем список поумолчанию

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        
        let localData = localStorage.getItem(listName) //создаем переменную с массивом из localStorage

        if(localData !== null && localData !== '') listArray = JSON.parse(localData) //проверяем на пустоту и создаем из строчки массив
        console.log(listArray);
        //создаем из полученного массива элементы списка с помощью цикла
        for (const itemList of listArray) {
            let todoItem = createTodoItem(itemList);
            todoList.append(todoItem.item);
        }

        //создаем событие submit на форме
        todoItemForm.form.addEventListener('submit', function(e) {
            //игнорируем стандартные действия
            e.preventDefault();
            //проверяем заполнено ли поле
            if (!todoItemForm.input.value) {
                return
            }
            //создаем обьект для массива
            let newItem = {
                id: getNewID(listArray),
                name: todoItemForm.input.value,
                done: false
            };
            
            // //просто создаем и добавляем новое дело
            // todoList.append(createTodoItem(todoItemForm.input.value).item);
            
            // создаем и добавляем новое дело с обработкой событий
            let todoItem = createTodoItem(newItem);         

            listArray.push(newItem)

            console.log(listArray);
            saveList(listArray, listName); //запускаем функцию сохранения

            //создаем и добавляем в список новое дело
            todoList.append(todoItem.item);
            
            //обнуляем поле ввода и отключаеем кнопку
            todoItemForm.button.disabled = true
            todoItemForm.input.value = '';
        });
    }

    // //добавляем элементы в DOM дерево, на одной странице
    // document.addEventListener('DOMContentLoaded', function() {
    //    createTodoApp(document.getElementById('my-todos'), 'Мои дела');
    //    createTodoApp(document.getElementById('mom-todos'), 'Дела для мамы');
    //    createTodoApp(document.getElementById('dad-todos'), 'Дела для папы');
    // });

    window.createTodoApp = createTodoApp;

})();