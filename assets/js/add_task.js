let contactList = [];
let selectedUsers = [];
let tasks = [
    {
        'id': 1,
        'label': 'User Story',
        'title': 'Kochwelt Recomender',
        'description': 'Build start is next week',
        'category': 'todos',
        'priority': 'height'
    },
];


function initAddTask() {
    loadContactList();
    renderSubtask();
}


async function loadContactList() {
    try {
        contactList = JSON.parse(await getItem('contactList'));
        console.log(contactList);
        renderContactListForTask()
    } catch(e){
        console.error('Loading error:', e);
    }
}


function renderContactListForTask() {
    for (let i = 0; i < contactList.length; i++) {
        let contact = contactList[i].name;

        const name = contact.split(" ");
        const firstName = name[0][0];
        const secondName = name[1] ? name[1][0] : '';
        let initials = firstName + secondName;


        document.getElementById('add-task-contact').innerHTML += /*html*/`
        <div id="task-contakt${i}" class="add-task-single" onclick="selectContact(${i})">
            <div class="name-div">
                <span class="initials letter-${secondName.toLowerCase()}">${initials}</span>
                <span>${contact}</span>
            </div>
            <div>
                <svg id="add-task-assignet-checkbox${i}" class="add-task-assignet-checkbox">
                    <use href="assets/img/icons.svg#checkbox-unchecked-icon"></use>
                </svg>
            </div>
        </div>
    `;
    }
}


function  dropdownMenuToggle(divID, arrow) {
    let dNone = document.getElementById(`${divID}`).classList.contains('d-none');
    document.getElementById(`${arrow}`);

    if (dNone) {
        openDropdownMenu(divID, arrow)
    } else {
        closeDropdownMenu(divID, arrow)
    }
}


function openDropdownMenu(divID, arrow) {
    document.getElementById(`${divID}`).classList.remove('d-none');
    document.getElementById(`${arrow}`).style="transform: rotate(180deg);"
}


function closeDropdownMenu(divID, arrow) {
    document.getElementById(`${divID}`).classList.add('d-none');
    document.getElementById(`${arrow}`).style="transform: rotate(0);"
}


function selectContact(i) {
    let get = document.getElementById(`add-task-assignet-checkbox${i}`);
    let unchecked = `<use href="assets/img/icons.svg#checkbox-unchecked-icon"></use>`;
    let checked = `<use href="assets/img/icons.svg#checkbox-checked-icon"></use>`;
    let user = contactList[i].name;
    if (get.innerHTML == checked) {
        get.innerHTML = unchecked;
        document.getElementById(`task-contakt${i}`).classList.remove('dark-background');
        selectedUsers = selectedUsers.filter(selectedUser => selectedUser !== user);
    } else {
        get.innerHTML = checked;
        document.getElementById(`task-contakt${i}`).classList.add('dark-background');
        if (!selectedUsers.includes(user)) {
            selectedUsers.push(user);
        }
    }
    updateSelectedUsers(i);
}


function updateSelectedUsers(i) {
    let contactsDiv = document.getElementById('contacts-div');
    contactsDiv.innerHTML = '';

    selectedUsers.forEach((selectedUser, index) => {
        let nameParts = selectedUser.split(" ");
        let initials = nameParts.map(part => part[0]).join('');
        let secondName = nameParts[1] ? nameParts[1][0].toLowerCase() : '';
        
        contactsDiv.innerHTML += /*html*/`
            <div class="name-div selected-initials">
                <span class="initials letter-${secondName}">${initials}</span>
            </div>
        `;
    });
}


function changePriority(prio) {
    let urgent = document.getElementById('prio-button-urgent');
    let medium = document.getElementById('prio-button-medium');
    let low = document.getElementById('prio-button-low');

    if (prio == 'urgent') {
        if (urgent.classList.contains('urgent')) {

        } else {
            urgent.classList.add('urgent');
            medium.classList.remove('medium');
            low.classList.remove('low');
        }
    } else if (prio == 'medium') {
        if (medium.classList.contains('medium')) {

        } else {
            medium.classList.add('medium');
            urgent.classList.remove('urgent');
            low.classList.remove('low');
        }
    } else if (prio == 'low') {
        if (low.classList.contains('low')) {

        } else {
            low.classList.add('low');
            urgent.classList.remove('urgent');
            medium.classList.remove('medium');
        }
    }
}


function selectLabel(label) {
    document.getElementById('add-task-category').innerHTML = `${label}`;
}


let subtasksArray = ['das ist ein subtask', 'das hier ist auch ein subtask wer weis denn sowas moin moin'];


function renderSubtask() {
    let subtasks = document.getElementById('subtask-container');
    subtasks.innerHTML = '';

    for (let i = 0; i < subtasksArray.length; i++) {
        const subtask = subtasksArray[i];

        subtasks.innerHTML += /*html*/`
        <li id="single-subtask${i}" class="subbtask" contenteditable="true">
            ${subtask}
        </li>
        <div>
                <svg class="subtask-icons" onclick="deleteSubtask(${i})">
                    <use href="assets/img/icons.svg#x-icon"></use>
                </svg>
                <svg class="subtask-icons" onclick="editSubtask(${i})">
                    <use href="assets/img/icons.svg#hook-icon"></use>
                </svg>
        </div>
    `;
    }
}


function addSubtask() {
    let newSubtask = document.getElementById('add-task-subtasks');
    subtasksArray.push(newSubtask.value);

    initAddTask()
}


function editSubtask(i) {
    subtasksArray.splice(i, 1, document.getElementById('single-subtask'+[i]).innerHTML);

    initAddTask();
}


function deleteSubtask(i) {
    subtasksArray.splice(i, 1);

    initAddTask();
}


function clearTask() {
    document.getElementById('add-task-title');
    document.getElementById('add-task-description');
    get
    document.getElementById('add-task-date');
}


function createTask() {
    let task = {
        'id': 1,
        'label': '',
        'title': '',
        'description': '',
        'category': '',
        'priority': '',
        'date':''
    }
    document.getElementById('add-task-button')
}