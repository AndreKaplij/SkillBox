let listStudents =[{
    name: 'Илья',
    lastname: 'Иванов',
    surname: 'Олегович',
    birthday: new Date(1994, 5, 12),
    faculty: 'Экономика',
    start: '2010',
},
{
    name: 'Ольга',
    lastname: 'Студентова',
    surname: 'Александровна',
    birthday: new Date(1995, 10, 10),
    faculty: 'Экономика',
    start: '2011',
},
{
    name: 'Татьяна',
    lastname: 'Иванова',
    surname: 'Олеговна',
    birthday: new Date(1997, 4, 1),
    faculty: 'Информатика',
    start: '2014',
}]
//функция приведения даты в норм вид
function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return yy + '.' + mm + '.' + dd;
}

//функция фильтрации
function filter(arr, prop, value) {
    return arr.filter(function(oneUser) {
        if(oneUser[prop].includes(value.trim())) return true
    });
}

let sortColumnFlag = 'fio'
    sortDirFlag = true

const $nameInp = document.getElementById('name-inp'),
    $lastnameInp = document.getElementById('lastname-inp'),
    $surnameInp = document.getElementById('surname-inp'),
    $birthdayInp = document.getElementById('birthday-inp'),
    $facultyInp = document.getElementById('faculty-inp'),
    $startInp = document.getElementById('start-inp'),

    $erNameInp = document.getElementById('error-name-input'),
    $erLastnameInp = document.getElementById('error-lastname-input'),
    $erSurnameInp = document.getElementById('error-surname-input'),
    $erBirthdayInp = document.getElementById('error-birthday-input'),
    $erFacultyInp = document.getElementById('error-faculty-input'),
    $erStartInp = document.getElementById('error-start-input'),

    $sortFIO = document.getElementById('sort-FIO'),
    $sortBirthday = document.getElementById('sort-birthday'),
    $sortFaculty = document.getElementById('sort-faculty'),
    $sortStart = document.getElementById('sort-start'),

    $filterForm = document.getElementById('filter-form'),
    $fioFilterInp = document.getElementById('filter-form__fio-inp'),
    $facultyFilterInp = document.getElementById('filter-form__faculty-inp'),
    $startFilterInp = document.getElementById('filter-form__start-inp')    

//создание элементов
function $getNewStudentTR(studObj) {
    const $tr = document.createElement('tr')
    const $tdFIO = document.createElement('td')
    const $tdBirthday = document.createElement('td')
    const $tdBfaculty = document.createElement('td')
    const $tdStart = document.createElement('td')

    $tdFIO.textContent = studObj.fio
    $tdBirthday.textContent = formatDate(studObj.birthday)
    $tdBfaculty.textContent = studObj.faculty
    $tdStart.textContent = studObj.start
    $tr.append($tdFIO, $tdBirthday, $tdBfaculty, $tdStart)
    return $tr
}
//функция отрисовки массива
function render(arr) {
    let copyArr = [...arr]

    const $studTable = document.getElementById('stud-table')

    $studTable.innerHTML = ''
    //Подготовка массива
    for (const oneUser of copyArr) {
        oneUser.fio = oneUser.lastname + ' ' + oneUser.name + ' ' + oneUser.surname
    }

    //Фильтрация    
    if($fioFilterInp.value.trim() !=='') {
        console.log($fioFilterInp.value)
        copyArr = filter(copyArr, 'fio', $fioFilterInp.value)
    }

    if($facultyFilterInp.value.trim() !=='') {
        copyArr = filter(copyArr, 'faculty', $facultyFilterInp.value)
    }

    if($startFilterInp.value.trim() !=='') {
        copyArr = filter(copyArr, 'start', $startFilterInp.value)
    }



    for (const studObj of copyArr) {
    const $newTr = $getNewStudentTR(studObj)
    $studTable.append($newTr)
    }

    //Сортировка
    console.log(sortColumnFlag)
    copyArr = copyArr.sort(function(a, b) {
        let sort = a[sortColumnFlag] < b[sortColumnFlag]
        if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
        if (sort) return -1        
    })
    console.log(copyArr)

    
}
//функция очистки полей
function clearInput () {
    $nameInp.value = '',
    $surnameInp.value = '',
    $lastnameInp.value = '',
    $facultyInp.value = '',
    $startInp.value = '',
    $birthdayInp.value = '';

    $erNameInp.textContent = ''
    $erLastnameInp.textContent = ''
    $erSurnameInp.textContent = ''
    $erBirthdayInp.textContent = ''
    $erFacultyInp.textContent = ''
    $erStartInp.textContent = ''
}

render(listStudents)

document.getElementById('add-form').addEventListener('submit', function(event) {
    event.preventDefault()
    // Валидация
    if ($nameInp.value.trim() == '') {
        $erNameInp.textContent = 'Введите имя'
    return
    }

    if ($lastnameInp.value.trim() == '') {
        $erLastnameInp.textContent = 'Введите фамилию'
    return
    }

    if ($surnameInp.value.trim() == '') {
        $erSurnameInp.textContent = 'Введите отчество'
    return
    }

    if ($birthdayInp.value.trim() == '') {
        $erBirthdayInp.textContent = 'Введите дату вашего рождения'
    return
    }

    if ($facultyInp.value.trim() == '') {
        $erFacultyInp.textContent = 'Введите факультет'
    return
    }

    if ($startInp.value.trim() == '') {
        $erStartInp.textContent = 'Введите год поступления'
    return
    }

    let newStudentObj = {
        name: $nameInp.value,
        lastname: $lastnameInp.value,
        surname: $surnameInp.value,
        birthday: new Date($birthdayInp.value),
        faculty: $facultyInp.value,
        start: $startInp.value
    }

    listStudents.push(newStudentObj)
    render(listStudents)
    clearInput ()    
})

//сортировка
$sortFIO.addEventListener('click', function() {
    sortColumnFlag = 'fio'
    sortDirFlag = !sortDirFlag
    render(listStudents)
})

$sortBirthday.addEventListener('click', function() {
    sortColumnFlag = 'birthday'
    sortDirFlag = !sortDirFlag
    render(listStudents)
})

$sortFaculty.addEventListener('click', function() {
    sortColumnFlag = 'faculty'
    sortDirFlag = !sortDirFlag
    render(listStudents)
})

$sortStart.addEventListener('click', function() {
    sortColumnFlag = 'start'
    sortDirFlag = !sortDirFlag
    render(listStudents)
})

//фильтрация
$filterForm.addEventListener('submit', function(event) {
    event.preventDefault();
});
$fioFilterInp.addEventListener('input', function() {
    render(listStudents);
});
$facultyFilterInp.addEventListener('input', function() {
    render(listStudents);
});
$startFilterInp.addEventListener('input', function() {
     render(listStudents);
});