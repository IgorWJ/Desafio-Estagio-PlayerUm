const button = document.querySelector('.button-add')
const input = document.querySelector('.input-task')
const editForm = document.querySelector('.button-edit')
const listaCompleta = document.querySelector('.list-task')

let listaDeItens = []

function adicionarNovaTarefa(){
    listaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    mostrarTarefas()
    input.value = ''
}

function mostrarTarefas(){


    let novaLi = ''

    listaDeItens.forEach((item, index) => {

        novaLi += `

            <li class="task ${item.concluida ? "done" : ""}">

                <p contenteditable="${item.editando ? "true" : "false"}" class="task-text">${item.tarefa}</p>
                        
                <div class="icons" >
                    <img src="./img/checked.png" alt="ícone indicativo de tarefa concluída" class="button-done" onclick='concluirTarefa(${index})'>

                    <img src="./img/edit_1.png" alt="ícone indicativo de editar tarefa" class="button-edit" onclick="editarTarefa(${index})">

                    <img src="./img/cancel.png" alt="ícone indicativo de tarefa removida"  class="button-remove" onclick='deletarItem(${index})' >
                </div>
            </li>
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(listaDeItens))

}


function concluirTarefa(index){
    listaDeItens[index].concluida = !listaDeItens[index].concluida
    mostrarTarefas()
}

function deletarItem(index){
    listaDeItens.splice(index, 1)
    mostrarTarefas()
}

function editarTarefa(index) {
    const item = listaDeItens[index];

    
    if (!item.editando) {
        item.editando = true;
        mostrarTarefas();
        const tarefaEditavel = document.querySelectorAll('.task-text')[index];
        tarefaEditavel.focus();
        tarefaEditavel.addEventListener('blur', () => {
            item.tarefa = tarefaEditavel.textContent.trim();
            item.editando = false;
            mostrarTarefas();
        });
    }
}


function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')
    if(tarefasDoLocalStorage){
        listaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)