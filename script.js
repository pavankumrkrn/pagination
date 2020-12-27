
var request = new XMLHttpRequest();
request.open('get', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
request.send();
request.onload = function () {
    let data = JSON.parse(this.response);
    initializeDocument(data)
}

let idd = 1;
let currentPage = 1;
let rows = 3;
let maxButtons;
let start = 6;
let arr = [];

let createElement = (element, className, id = '') => {
    let ele = document.createElement(element);
    ele.setAttribute('class', className);
    ele.id = id;
    return ele;
}

let createRow = (text) => {
    let nameRow = createElement('div', 'row');
    nameRow.innerHTML = `<p>${text}</p>`
    return nameRow;
}


let initializeDocument = (users) => {
    maxButtons = Math.ceil(users.length / 3);
    arr = [...users]
    let container = createElement('div', 'container');
    let row1 = createElement('div', 'row');
    let col1 = createElement('div', 'col-12 col-md-6');
    let paragraph = createElement('p', 'h1');
    let hr = createElement('hr');
    paragraph.innerHTML = `Users - <span class ='badge badge-dark'>${users.length}</span>`
    let row2 = createElement('div', 'row');
    let col2 = createElement('div', 'col-12 col-md-12', 'users')
    setRows(col2, users, rows, currentPage);
    row2.append(col2);
    col1.append(paragraph)
    row1.append(col1);
    container.append(row1, hr, row2);
    setPagination(container, start);
    document.body.append(container);
    document.getElementById(1).classList.add('active')
}


function setRows(col, users, rows, page) {
    page--;
    let start = page * rows;
    let end = start + rows;

    let urs = users.slice(start, end)
    urs.forEach(element => {
        let userRow = createElement('div', 'row')
        let hrTag = createElement('hr')
        let useridColumn = createElement('div', 'col-2 col-md-2')
        useridColumn.innerHTML = `<p>${element.id}</p>`

        let userDetailsColumn = createElement('div', 'col-2 col-md-2')
        userDetailsColumn.append(createRow(element.name), createRow(element.email));
        userRow.append(useridColumn, userDetailsColumn);
        col.append(userRow, hrTag);
    });
}

function setPagination(col, count) {
    let row3 = createElement('div', 'row');
    let col3  = createElement('div', 'col-12 col-sm-12', 'pagination');
    let navbar = createElement('nav');
    let ul = createElement('ul', 'pagination')
    ul.append(createLi('Previous'))
    for (let i = count - 6; i < count; i++) {
        ul.append(createLi(i + 1));
    }
    ul.append(createLi('Next'))
    navbar.append(ul);
    col3.append(navbar);
    row3.append(col3)
    col.append(row3)


}
function createLi(text) {
    let li = createElement('li', 'page-item');
    let aTag = createElement('a', 'page-link', text);
    aTag.setAttribute('href', '#');
    aTag.innerText = text;
    li.append(aTag);
    aTag.onclick = (e) => {
        if (!isNaN(+text))
            idd = +text

        e.preventDefault();
        renderNewPagination(text)
    };

    return li;
}

function renderNewPagination(text) {
    if (text === 'Previous') {
        if (start !== 6) {
            document.querySelector('#pagination').innerHTML = ''
            let pag = document.querySelector('#pagination');
            setPagination(pag, start - 1);
            start -= 1
            if (idd){
                try {
                    document.getElementById(idd).classList.add('active')
                } catch (e) {

                }
                renderNewPagination(idd-1);
                idd-=1;
            }
               
        }
    } else if (text === 'Next') {
        if (start != maxButtons) {
            document.querySelector('#pagination').innerHTML = ''
            let pag = document.querySelector('#pagination');
            setPagination(pag, start + 1);
            start += 1;
            if (idd) {
                try {
                    document.getElementById(idd).classList.add('active')
                } catch (e) {
                }
                renderNewPagination(idd+1);
                idd+=1;
            }
        }
    } else {
        currentPage = +text;
        document.querySelector('#users').innerHTML = '';
        let user = document.querySelector('#users');
        setRows(user, arr, 3, currentPage);
        if (document.querySelector('.active')) {
            document.querySelector('.active').classList.remove('active');
        }
        document.getElementById(text).classList.add('active')
    }

}













