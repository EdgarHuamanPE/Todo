//data de prueba
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

            //creando item LI
            const item  =  document.createElement("li");
            item.classList.add("lista__item");
            
            //creando texto todo
            const desc=document.createElement("span");
            desc.innerText=text;    
            item.appendChild(desc);

            //creando boton editar
            const btnEdit = document.createElement("button");
            btnEdit.innerHTML="editar";
            btnEdit.classList.add("item__btn", "item__btn--editar");
            btnEdit.addEventListener("click",(e)=>{
                const dsc =e.target.previousElementSibling.innerText;
                e.target.previousElementSibling.style.display="none";
                
                if(!e.target.previousElementSibling.previousElementSibling){
                    const inputEdit=document.createElement("input");
                    inputEdit.value=dsc;
                    item.prepend(inputEdit);
                }else{
                    e.target.previousElementSibling.previousElementSibling.style.display="inline";
                }
                
                btnSave.disabled=false;
                btnEdit.disabled=true;
            });    
                
            item.appendChild(btnEdit);

            //agregar boton guardar
            const btnSave = document.createElement("button");
            btnSave.innerHTML="guardar";
            btnSave.classList.add("item__btn","item__btn--guardar");
            btnSave.disabled=true;
            btnSave.addEventListener("click",(e)=>{

                //input todo hide
                const domInputItem=e.target.previousElementSibling.previousElementSibling.previousElementSibling;
                const value=domInputItem.value;

                //obteniendo index en base del texto todo
                const i= todosDiario.findIndex((item)=>{
                    return  item.text===domInputItem.nextElementSibling.innerText;
                });
                //actualizando array todo
                if (i!==-1){
                    todosDiario[i].text=value;
                }

                //ocultando input
                domInputItem.style.display="none";

                //renderizando el textotodo
                domInputItem.nextElementSibling.innerText=value;
                domInputItem.nextElementSibling.style.display="inline";
                btnSave.disabled=true;
                btnEdit.disabled=false;    
            });

            item.appendChild(btnSave);

            //agregando boton eliminar
            const btnDelete = document.createElement("button");
            btnDelete.innerHTML="eliminar";
            btnDelete.classList.add("item__btn","item__btn--eliminar");
            btnDelete.addEventListener('click',(e)=>{
                //buscando index de array todo apartir del texto todo
                const i=todosDiario.findIndex((todoItem)=>{
                        return todoItem.text===e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                });

                //elimina del array
                if (i!==-1){
                    todosDiario.splice(i,1);
                }

                //elimina en el renderizado
                e.target.parentNode.remove();
            });
            item.appendChild(btnDelete);
            lista.appendChild(item);
    });
}

//listar todos los nodos 
listarTodos();


//agregar nodos
const formulario = document.querySelector(".form");
const input = document.querySelector(".form__input"); 
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!input.value.trim()){
        return;
    }
    todosDiario.push({text:input.value.trim(),completed:false});
    input.value="";
    listarTodos();
});
