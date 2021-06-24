// Referencias a elementos HTML
const add = document.querySelector('#addTaskButton');
var input = document.querySelector('#inputTask');
const container = document.querySelector('.container');
const tooltip = document.querySelector('#tooltip');


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
        // input task y description
        let input = document.createElement('input');
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input', 'input_task');
        input.type = "text";
        input.maxLength = "30";
        let description = document.createElement('input');
        description.value = '';
        description.disabled = true;
        description.classList.add('item_input', 'input_description', 'hide');
        description.type = "text";
        description.maxLength = "60";

        // Elementos div del item
        let itemBox = document.createElement('div');
        itemBox.classList.add('item');
        let task = document.createElement('div');
        task.classList.add('task')
        let actions = document.createElement('div');
        actions.classList.add('actions')

        // boton editar
        let editButton = document.createElement('button');
        editButton.classList.add('editButton');
        // img boton editar
        let editImg = document.createElement('img');
        editImg.alt = 'Editar'
        editImg.src = './assets/icons/editar.png';
        editImg.classList = 'editImg';

        // boton eliminar
        let removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        // img boton eliminar
        let removeImg = document.createElement('img');
        removeImg.alt = 'Eliminar'
        removeImg.src = './assets/icons/eliminar.png';
        removeImg.classList = 'removeImg';

        container.appendChild(itemBox);
        itemBox.appendChild(task);
        itemBox.appendChild(actions);

        task.appendChild(input);
        task.appendChild(description);

        actions.appendChild(editButton);
        actions.appendChild(removeButton);

        editButton.appendChild(editImg);
        removeButton.appendChild(removeImg);

        editButton.addEventListener('click', ()=> this.edit(input, editImg, itemName));
        removeButton.addEventListener('click', ()=> this.remove(itemBox, itemName));
    }

    edit(input, editImg, itemName){
        if(input.disabled == true){
            input.disabled = false;
            input.focus();
            editImg.src = './assets/icons/guardar.png';
        }else{
            input.disabled = true;
            editImg.src = './assets/icons/editar.png';
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
        tooltip.className='hide';
        new item(input.value);
        tasks.push(input.value);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = "";
    }else{
        tooltip.className='show';
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