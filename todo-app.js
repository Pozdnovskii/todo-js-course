(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createToDoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Enter name of new task';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Add new task';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form, input, button,
        }
    }

    function createToDoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');

        return list;
    }

    function createToDoItem(object) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = object.name;

        if (object.done == true) {
            item.classList.add('list-group-item-success')
        }

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Done';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item, doneButton, deleteButton,
        }
    }

    function createToDoApp(container, title = 'ToDoList', storageKey) {
        let toDoAppTitle = createAppTitle(title);
        let toDoItemForm = createToDoItemForm();
        let toDoList = createToDoList();

        container.append(toDoAppTitle);
        container.append(toDoItemForm.form);
        container.append(toDoList);

        let toDoItemsArray = JSON.parse(localStorage.getItem(storageKey)) || [];

        function createItem(object) {
            let toDoItem = createToDoItem(object);

            toDoList.append(toDoItem.item);

            toDoItem.doneButton.addEventListener('click', function () {
                toDoItem.item.classList.toggle('list-group-item-success');
                if (object.done === true) {
                    object.done = false;
                } else {
                    object.done = true;
                }
                localStorage.setItem(storageKey, JSON.stringify(toDoItemsArray));
            })

            toDoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Are you sure?')) {
                    toDoItem.item.remove();
                    toDoItemsArray.splice(toDoItemsArray.indexOf(object), 1);
                    localStorage.setItem(storageKey, JSON.stringify(toDoItemsArray));
                    console.log(toDoItemsArray);
                }
            })

            localStorage.setItem(storageKey, JSON.stringify(toDoItemsArray));
        }

        toDoItemForm.form.addEventListener('input', function () {
            if (toDoItemForm.input.value === '') {
                toDoItemForm.button.disabled = true;
            } else {
                toDoItemForm.button.disabled = false;
            }
        })

        toDoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();
            let newItem = { name: toDoItemForm.input.value, done: false };
            toDoItemsArray.push(newItem);

            createItem(newItem);

            toDoItemForm.button.disabled = true;
            toDoItemForm.input.value = '';
        })

        for (items of toDoItemsArray) {
            createItem(items);
        }
    }

    window.createToDoApp = createToDoApp;
})();