

window.addEventListener('load', () => {


    const form = document.querySelector("#todoform")
    const input = document.querySelector("#input")
    const tasks = document.querySelector("#tasks")







    form.addEventListener('submit', (e) => {

        e.preventDefault()


        const inputc = input.value
        localStorage.setItem('todo', JSON.stringify([inputc]))

        if (!inputc) {
            alert("Please Enter a Task")
        }
        else {



            const tasknew = document.createElement('div')
            tasknew.classList.add('task')

            const taskcontent = document.createElement('div')
            taskcontent.classList.add('content')

            //    taskcontent.innerText=inputc

            tasknew.appendChild(taskcontent)

            const taskinput = document.createElement('input')
            taskinput.classList.add('text')
            taskinput.type = 'text'
            taskinput.value = inputc
            taskinput.setAttribute('readonly', 'readonly')

            taskcontent.appendChild(taskinput)

            tasks.appendChild(tasknew)

            const actions = document.createElement("div")
            actions.classList.add("actions")


            const editbtn = document.createElement("button")
            editbtn.classList.add("edit")
            editbtn.innerText = "Edit"

            const deletebtn = document.createElement("button")
            deletebtn.classList.add("delete")
            deletebtn.innerText = "Delete"

            actions.appendChild(editbtn)
            actions.appendChild(deletebtn)
            tasknew.appendChild(actions)
            input.value = '';

            editbtn.addEventListener('click', (e) => {
                if (editbtn.innerText == "Edit") {
                    taskinput.removeAttribute("readonly")
                    editbtn.innerText = "Save"
                    taskinput.focus()
                }
                else {
                    taskinput.setAttribute("readonly", "readonly")
                    editbtn.innerText = "Edit"
                }
            })

            deletebtn.addEventListener('click', (e) => {
                tasks.removeChild(tasknew)
            })


        }
    })

})
