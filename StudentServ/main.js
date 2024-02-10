const SERVER_URL = 'http://localhost:3000'

async function serverAddStudent(obj) {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    })
    let data = await response.json()

    return data
}

async function serverGetStudent(obj) {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},        
    })
    let data = await response.json()

    return data
}

async function serverDeleteStudent(id) {
    let response = await fetch(SERVER_URL + '/api/students/'+id, {
        method: 'DELETE',
                
    })
    let data = await response.json()

    return data
}

let serverData = await serverGetStudent()

let listStudents = []

if (serverData !== null) {
    listStudents = serverData
}

// let listStudents =[{
//     name: 'Илья',
//     lastname: 'Иванов',
//     surname: 'Олегович',
//     birthday: new Date(1994, 5, 12),
//     faculty: 'Экономика',
//     studyStart: '2010',
// },
// {
//     name: 'Ольга',
//     lastname: 'Студентова',
//     surname: 'Александровна',
//     birthday: new Date(1995, 10, 10),
//     faculty: 'Экономика',
//     studyStart: '2011',
// },
// {
//     name: 'Татьяна',
//     lastname: 'Иванова',
//     surname: 'Олеговна',
//     birthday: new Date(1997, 4, 1),
//     faculty: 'Информатика',
//     studyStart: '2014',
// }]
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

let sortColumnFlag = 'fio',
    sortDirFlag = true

const $nameInp = document.getElementById('name-inp'),
    $lastnameInp = document.getElementById('lastname-inp'),
    $surnameInp = document.getElementById('surname-inp'),
    $birthdayInp = document.getElementById('birthday-inp'),
    $facultyInp = document.getElementById('faculty-inp'),
    $studyStartInp = document.getElementById('studyStart-inp'),

    $erNameInp = document.getElementById('error-name-input'),
    $erLastnameInp = document.getElementById('error-lastname-input'),
    $erSurnameInp = document.getElementById('error-surname-input'),
    $erBirthdayInp = document.getElementById('error-birthday-input'),
    $erFacultyInp = document.getElementById('error-faculty-input'),
    $erstudyStartInp = document.getElementById('error-studyStart-input'),

    $sortFIO = document.getElementById('sort-FIO'),
    $sortBirthday = document.getElementById('sort-birthday'),
    $sortFaculty = document.getElementById('sort-faculty'),
    $sortstudyStart = document.getElementById('sort-studyStart'),

    $filterForm = document.getElementById('filter-form'),
    $fioFilterInp = document.getElementById('filter-form__fio-inp'),
    $facultyFilterInp = document.getElementById('filter-form__faculty-inp'),
    $studyStartFilterInp = document.getElementById('filter-form__studyStart-inp')    

//создание элементов
function $getNewStudentTR(studObj) {
    const $tr = document.createElement('tr')
    const $tdFIO = document.createElement('td')
    const $tdBirthday = document.createElement('td')
    const $tdBfaculty = document.createElement('td')
    const $tdstudyStart = document.createElement('td')
    const $tdDelete = document.createElement('td')
    const $btnDelete = document.createElement('button')

    $btnDelete.classList.add('btn', 'btn-danger')
    $btnDelete.textContent = 'удалить'

    $tdFIO.textContent = studObj.fio
    $tdBirthday.textContent = formatDate(new Date(studObj.birthday))
    $tdBfaculty.textContent = studObj.faculty
    $tdstudyStart.textContent = studObj.studyStart


    $tdDelete.append($btnDelete)
    $tr.append($tdFIO, $tdBirthday, $tdBfaculty, $tdstudyStart, $tdDelete)

    $btnDelete.addEventListener('click', async function() {
        await serverDeleteStudent(studObj.id)
        $tr.remove()
    })

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

    if($studyStartFilterInp.value.trim() !=='') {
        copyArr = filter(copyArr, 'studyStart', $studyStartFilterInp.value)
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
    // console.log(copyArr)

    
}
//функция очистки полей
function clearInput () {
    $nameInp.value = '',
    $surnameInp.value = '',
    $lastnameInp.value = '',
    $facultyInp.value = '',
    $studyStartInp.value = '',
    $birthdayInp.value = '';

    $erNameInp.textContent = ''
    $erLastnameInp.textContent = ''
    $erSurnameInp.textContent = ''
    $erBirthdayInp.textContent = ''
    $erFacultyInp.textContent = ''
    $erstudyStartInp.textContent = ''
}

render(listStudents)

document.getElementById('add-form').addEventListener('submit', async function(event) {
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

    if ($studyStartInp.value.trim() == '') {
        $erstudyStartInp.textContent = 'Введите год поступления'
    return
    }

    let newStudentObj = {
        name: $nameInp.value,
        lastname: $lastnameInp.value,
        surname: $surnameInp.value,
        birthday: new Date($birthdayInp.value),
        faculty: $facultyInp.value,
        studyStart: $studyStartInp.value
    }

    let serverDataObj = await serverAddStudent(newStudentObj)

    serverDataObj.birthday = new Date(serverDataObj.birthday)

    listStudents.push(serverDataObj)

    console.log(listStudents)

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

$sortstudyStart.addEventListener('click', function() {
    sortColumnFlag = 'studyStart'
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
$studyStartFilterInp.addEventListener('input', function() {
     render(listStudents);
});