const todosDiario = [
  { text: "Revisar correos", completed: false },
  { text: "Revisar pendientes", completed: false },
  { text: "Actualizar tablero de tareas", completed: false },
  { text: "Analizar requerimientos", completed: false },
  { text: "Diseñar solución técnica", completed: false },
  { text: "Desarrollar tareas asignadas", completed: false },
  { text: "Realizar pruebas", completed: false },
  { text: "Corregir errores", completed: false },
  { text: "Registrar avances", completed: false },
  { text: "Enviar reporte", completed: false },
  { text: "Reunión con equipo", completed: false },
  { text: "Capacitación técnica", completed: false },
  { text: "Preparar tareas del día siguiente", completed: false }
];

//listar nodos 
const lista = document.querySelector(".lista");
const listarTodos=()=>{
        lista.innerHTML="";
        todosDiario.forEach((todo)=>{
        const {text}= todo;
        const item  =  document.createElement("li");
        
        const desc=document.createElement("span");
        desc.innerText=text;    
        item.appendChild(desc);

        const btnEdit = document.createElement("button");
        btnEdit.innerHTML="editar";
        btnEdit.classList.add("editar");
        btnEdit.addEventListener("click",(e)=>{
            console.log('ja');
            const dsc =e.target.previousElementSibling.innerText;
            console.log(dsc);
            e.target.previousElementSibling.style.display="none";
            const inputEdit=document.createElement("input");
            inputEdit.value=dsc;
            item.prepend(inputEdit);
            btnSave.disabled=false;

        });    

        item.appendChild(btnEdit);

        const btnSave = document.createElement("button");
        btnSave.innerHTML="guardar";
        btnSave.classList.add("guardar");
        btnSave.disabled=true;
        btnSave.addEventListener("click",(e)=>{
            const domInputItem=e.target.previousElementSibling.previousElementSibling.previousElementSibling;
            const value=domInputItem.value;
            console.log(value);
            const i= todosDiario.findIndex((item)=>{
                console.log(domInputItem.nextElementSibling.innerText);
                return  item.text===domInputItem.nextElementSibling.innerText;
            });

            console.log(i);
            if (i!==-1){
                todosDiario[i].text=value;
            }

            domInputItem.style.display="none";
            domInputItem.nextElementSibling.innerText=value;
            domInputItem.nextElementSibling.style.display="inline";
            btnSave.disabled=true;

        });

        item.appendChild(btnSave);

        const btnDelete = document.createElement("button");
        btnDelete.innerHTML="eliminar";
        btnDelete.classList.add("eliminar");
        btnDelete.addEventListener('click',(e)=>{
            const i=todosDiario.findIndex((todoItem)=>{
                        console.log(e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
                        console.log(todosDiario);
                       return todoItem.text===e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
            });

            if (i!==-1){
                todosDiario.splice(i,1);
            }
            e.target.parentNode.remove();
        });
        item.appendChild(btnDelete);
        lista.appendChild(item);
    });
}

listarTodos();

//agregar nodos
const formulario = document.querySelector(".form");
const input = document.querySelector(".form_input"); 
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!input.value.trim()){
        return;
    }
    todosDiario.push({text:input.value.trim(),completed:false});
    input.value="";
    listarTodos();
         console.log(todosDiario);
});

//eliminar nodo
