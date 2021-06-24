const add = document.querySelector('#addButton');
var input = document.querySelector('#input');
const container = document.querySelector('.container');


if(window.localStorage.getItem('tasks') == undefined){
    var tasks = [];
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}else{
    var alltasks = window.localStorage.getItem('tasks');
    tasks = JSON.parse(alltasks);
}


class item{
    constructor(itemName){
        this.createDiv(itemName);
    }

    createDiv(itemName){
        let input = document.createElement('input');
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = "text";

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let editButton = document.createElement('button');
        editButton.innerHTML = "Editar";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "Eliminar";
        removeButton.classList.add('removeButton');

        container.appendChild(itemBox);
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);
        editButton.addEventListener('click', ()=> this.edit(input, editButton, itemName));
        removeButton.addEventListener('click', ()=> this.remove(itemBox, itemName));
    }

    edit(input, editButton, itemName){
        if(input.disabled == true){
            input.disabled = false;
            input.focus();
            editButton.innerHTML = "Guardar";
        }else{
            input.disabled = true;
            editButton.innerHTML = "Editar";
            let index = tasks.indexOf(itemName);
            tasks[index] = input.value;
            window.localStorage.setItem('tasks', JSON.stringify(tasks));
        }

    }

    remove(item, itemName){
        container.removeChild(item);
        let index = tasks.indexOf(itemName);
        tasks.splice(index, 1);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function check(){
    if(input.value != ""){
        new item(input.value);
        tasks.push(input.value);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = "";
    }else{
        alert('Introduce una tarea');
    }
}
add.addEventListener('click', check);

window.addEventListener('keydown', (e)=> {
    if(e.which == 13){
        check();
    }
});

for (var i= 0 ; i < tasks.length ; i++){
    new item(tasks[i]);
}