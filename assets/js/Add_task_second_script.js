// If Statements

function dropdownMenuToggleIF(divID, arrow, dNone) {
    if (dNone) {
        openDropdownMenu(divID, arrow)
    } else {
        closeDropdownMenu(divID, arrow)
    }
}


function selectContactIF(i, get, unchecked, checked, user) {
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
}


function changePriorityIF(prio, urgent, medium, low) {
    if (prio == 'urgent') {
        if (urgent.classList.contains('urgent')) {
        } else {
            urgent.classList.add('urgent');
            currentPrio = 'urgent';
            medium.classList.remove('medium');
            low.classList.remove('low');
        }
    } else if (prio == 'medium') {
        if (medium.classList.contains('medium')) {
        } else {
            medium.classList.add('medium');
            currentPrio = 'medium';
            urgent.classList.remove('urgent');
            low.classList.remove('low');
        }
    } else if (prio == 'low') {
        if (low.classList.contains('low')) {
        } else {
            low.classList.add('low');
            currentPrio = 'low';
            urgent.classList.remove('urgent');
            medium.classList.remove('medium');
        }
    }
}


function filterContactsForAddTaskIF(i, value, contactList, checkContact) {
    if (checkContact.includes(value)) {
        let contact = contactList[i].name;
        const name = contact.split(" ");
        const firstName = name[0][0];
        const secondName = name[1] ? name[1][0] : '';
        let initials = firstName + secondName;
        document.getElementById('add-task-contact').innerHTML += renderContactListForTaskHTML(i, secondName, initials, contact);
    }
}


function addSubtaskIF(subtaskInput, subtaskInputArray) {
    if (subtaskInput.value.length >= 3) {
        subtasksArray.push(subtaskInputArray);
        initAddTask();
        subtaskInput.value = "";
        closeSubtask();
    } else {
        subtaskInput.reportValidity();
    }
}

function onClickOutsideIF(element, i, e) {
    if (!element.contains(e.target)) {
        document.getElementById(`single-subtask${i}`).setAttribute('onmouseenter', `subtaskEditButtonsOn(${i})`);
        document.getElementById(`single-subtask${i}`).setAttribute('onmouseleave', `subtaskEditButtonsOut(${i})`);
        document.getElementById(`single-subtask${i}`).classList.remove('subbtask-on-focus');
        document.getElementById(`single-subtask${i}`).classList.add('subbtask-hover');
        document.getElementById(`subtask-edit-buttons${i}`).innerHTML = '';
    };
}

function clearTaskIF(i, get, checked, unchecked) {
    if (get.innerHTML == checked) {
        get.innerHTML = unchecked;
        document.getElementById(`task-contakt${i}`).classList.remove('dark-background');
    }
}

// HTML

/**
 * Generates HTML markup for rendering a contact in the task list.
 * 
 * @param {number} i - The index of the contact.
 * @param {string} secondName - The second name of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} contact - The name of the contact.
 * @returns {string} HTML markup for rendering the contact.
 */
function renderContactListForTaskHTML(i, secondName, initials, contact) {
    return /*html*/`
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


function renderSubtaskHTML(i, subtask) {
    return /*html*/`
    <li id="single-subtask${i}" class="subbtask subbtask-hover" onmouseenter="subtaskEditButtonsOn(${i})" onmouseleave="subtaskEditButtonsOut(${i})" onclick="focusSubtask(${i})">
        <span id="single-subtask-txt${i}" contenteditable="true" class="subbtask-span" value="${subtask}">${subtask}</span>
        <div id="subtask-edit-buttons${i}" class="subtask-icons-single-div" onclick="doNotClose(event)"></div>
    </li>
`;
}


function closeSubtaskHTML() {
    return /*html*/`
    <button type="button" id="add-subtask-button" formnovalidate onclick="openSubtask()">
        <svg class="subtask-icons">
            <use href="assets/img/icons.svg#plus-add-icon"></use>
        </svg>
    </button>
`;
}


function openSubtaskHTML() {
    return /*html*/`
    <svg class="subtask-icons" onclick="closeSubtask()">
        <use href="assets/img/icons.svg#x-icon"></use>
    </svg>
    <div class="mini-seperator"></div>
    <button type="button" id="add-subtask-button" formnovalidate onclick="addSubtask()">
        <svg class="subtask-icons">
            <use href="assets/img/icons.svg#hook-icon"></use>
        </svg>
    </button>
`;
}


function editSubtaskHTML(i) {
    return /*html*/`
    <svg class="subtask-icons-single" onclick="focusSubtask(${i})">
        <use href="assets/img/icons.svg#edit-pen"></use>
    </svg>
    <svg class="subtask-icons-single" onclick="deleteSubtask(${i})">
        <use href="assets/img/icons.svg#trashcan-delete-icon"></use>
    </svg>
`;
}


function focusSubtaskHTML(i) {
    return /*html*/`
    <svg class="subtask-icons-single" onclick="deleteSubtask(${i})">
        <use href="assets/img/icons.svg#trashcan-delete-icon"></use>
    </svg>
    <div class="mini-seperator"></div>
    <svg class="subtask-icons-single" onclick="editSubtask(${i})">
        <use href="assets/img/icons.svg#hook-icon"></use>
    </svg>
`;
}


// for use in Console

/**
 * Deletes all tasks by clearing the tasks array in the local storage.
 * This function is intended for emergency use only.
 * @returns {Promise<void>}
 */
async function deleteAllTasksEmergencyFunction() {
    // tasks = JSON.parse(await getItem('tasks'));
    console.log(tasks);
    tasks = [];
    await setItem('tasks', JSON.stringify(tasks));
    let test = JSON.parse(await getItem('tasks'));
    console.log(test);
}

async function addExampleTasks() {
    // tasks = JSON.parse(await getItem('tasks'));
    console.log(tasks);
    tasks = tasks = [
        {
            "id": 0,
            "title": "Entwicklung neuer Website-Features",
            "description": "Implementierung von zusätzlichen Funktionen auf der Unternehmenswebsite",
            "contacts": [
                "Emily Davis",
                "Mohammed Ali"
            ],
            "dueDate": "2024-05-01",
            "priority": "low",
            "category": "todos",
            "label": "HTML",
            "subtasks": [
                {
                    "task": "Header-Design anpassen",
                    "done": false
                },
                {
                    "task": "Navigation hinzufügen",
                    "done": false
                },
                {
                    "task": "Footer aktualisieren",
                    "done": false
                }
            ]
        },
        {
            "id": 1,
            "title": "Benutzeroberfläche für Mobile App gestalten",
            "description": "Design der Benutzeroberfläche für die mobile Anwendung",
            "contacts": [
                "Sophia Rossi",
                "Chen Wei",
                "Luca Ferrari"
            ],
            "dueDate": "2024-05-05",
            "priority": "medium",
            "category": "inprogress",
            "label": "User Story",
            "subtasks": [
                {
                    "task": "Startbildschirm entwerfen",
                    "done": true
                },
                {
                    "task": "Anmeldeformular gestalten",
                    "done": false
                }
            ]
        },
        {
            "id": 2,
            "title": "Integration von Zahlungsgateways",
            "description": "Implementierung von Zahlungsoptionen in die Anwendung",
            "contacts": [
                "Hannah Kim",
                "Mikhail Ivanov",
                "Isabella Martinez",
                "Eva Schmidt"
            ],
            "dueDate": "2024-05-10",
            "priority": "urgent",
            "category": "inprogress",
            "label": "Technical Task",
            "subtasks": [
                {
                    "task": "PayPal-Integration",
                    "done": false
                },
                {
                    "task": "Kreditkartenzahlung unterstützen",
                    "done": false
                }
            ]
        },
        {
            "id": 3,
            "title": "Verbesserung der Suchfunktion",
            "description": "Optimierung der Suchfunktion auf der Website",
            "contacts": [
                "Sophia Rossi",
                "Chen Wei"
            ],
            "dueDate": "2024-05-15",
            "priority": "medium",
            "category": "inprogress",
            "label": "User Story",
            "subtasks": [
                {
                    "task": "Autovervollständigung hinzufügen",
                    "done": false
                },
                {
                    "task": "Suchergebnisse filtern",
                    "done": false
                }
            ]
        },
        {
            "id": 4,
            "title": "Entwicklung eines CSS-Frameworks",
            "description": "Erstellung eines benutzerdefinierten CSS-Frameworks für das Projekt",
            "contacts": [
                "Ava Garcia",
                "Ethan Lee",
                "Charlotte Kim"
            ],
            "dueDate": "2024-05-20",
            "priority": "medium",
            "category": "await",
            "label": "CSS",
            "subtasks": [
                {
                    "task": "Grid-System entwerfen",
                    "done": false
                },
                {
                    "task": "Responsive Design implementieren",
                    "done": false
                }
            ]
        },
        {
            "id": 5,
            "title": "Durchführung von Systemtests",
            "description": "Tests der Anwendung auf verschiedene Systemkonfigurationen",
            "contacts": [
                "Emily Davis"
            ],
            "dueDate": "2024-05-25",
            "priority": "urgent",
            "category": "todos",
            "label": "Testing",
            "subtasks": [
                {
                    "task": "Kompatibilität mit verschiedenen Browsern prüfen",
                    "done": false
                },
                {
                    "task": "Performance-Tests durchführen",
                    "done": false
                }
            ]
        },
        {
            "id": 6,
            "title": "Implementierung von Datenbankmigrationen",
            "description": "Aktualisierung der Datenbankstruktur gemäß den neuen Anforderungen",
            "contacts": [
                "Liam Brown",
                "Charlotte Kim",
                "Mikhail Ivanov"
            ],
            "dueDate": "2024-05-30",
            "priority": "urgent",
            "category": "await",
            "label": "Technical Task",
            "subtasks": [
                {
                    "task": "Schema-Änderungen vornehmen",
                    "done": false
                },
                {
                    "task": "Daten migrieren",
                    "done": false
                }
            ]
        },
        {
            "id": 7,
            "title": "Entwicklung einer Dashboard-Ansicht",
            "description": "Erstellung einer Übersichtsseite für Administratoren",
            "contacts": [
                "Ava Garcia",
                "Sophia Rossi",
                "Liam Brown"
            ],
            "dueDate": "2024-06-01",
            "priority": "low",
            "category": "todos",
            "label": "User Story",
            "subtasks": [
                {
                    "task": "Benutzerstatistiken anzeigen",
                    "done": false
                },
                {
                    "task": "Grafische Auswertungen erstellen",
                    "done": false
                }
            ]
        },
        {
            "id": 8,
            "title": "Implementierung von OAuth-Authentifizierung",
            "description": "Integration von OAuth-Authentifizierung für externe Plattformen",
            "contacts": [
                "Mohammed Ali",
                "Charlotte Kim",
                "Liam Brown"
            ],
            "dueDate": "2024-06-05",
            "priority": "medium",
            "category": "done",
            "label": "Technical Task",
            "subtasks": [
                {
                    "task": "OAuth-Anbieter auswählen",
                    "done": true
                },
                {
                    "task": "Authentifizierungsfluss implementieren",
                    "done": true
                }
            ]
        },
        {
            "id": 9,
            "title": "Erstellung eines Testplans",
            "description": "Ausarbeitung eines detaillierten Plans für die Anwendungstests",
            "contacts": [
                "Oliver Russo",
                "Amelia Patel",
                "Eva Schmidt"
            ],
            "dueDate": "2024-06-10",
            "priority": "low",
            "category": "done",
            "label": "Testing",
            "subtasks": [
                {
                    "task": "Testziele definieren",
                    "done": true
                },
                {
                    "task": "Testumgebung einrichten",
                    "done": true
                }
            ]
        }
    ];
    await setItem('tasks', JSON.stringify(tasks));
    let test = JSON.parse(await getItem('tasks'));
    console.log(test);
}

async function addExampleContacts() {
    let contactList = [
        {
            "name": "Emily Davis",
            "mail": "emily.davis@example.com",
            "phone": "+12025551234"
        },
        {
            "name": "Mohammed Ali",
            "mail": "mohammed.ali@example.com",
            "phone": "+966555555555"
        },
        {
            "name": "Sophia Rossi",
            "mail": "sophia.rossi@example.com",
            "phone": "+390123456789"
        },
        {
            "name": "Chen Wei",
            "mail": "chen.wei@example.com",
            "phone": "+8613812345678"
        },
        {
            "name": "Luca Ferrari",
            "mail": "luca.ferrari@example.com",
            "phone": "+390987654321"
        },
        {
            "name": "Hannah Kim",
            "mail": "hannah.kim@example.com",
            "phone": "+821012345678"
        },
        {
            "name": "Mikhail Ivanov",
            "mail": "mikhail.ivanov@example.com",
            "phone": "+79123456789"
        },
        {
            "name": "Isabella Martinez",
            "mail": "isabella.martinez@example.com",
            "phone": "+521234567890"
        },
        {
            "name": "Eva Schmidt",
            "mail": "eva.schmidt@example.com",
            "phone": "+491234567890"
        },

        {
            "name": "Liam Brown",
            "mail": "liam.brown@example.com",
            "phone": "+12025551234"
        },
        {
            "name": "Sophie Wilson",
            "mail": "sophie.wilson@example.com",
            "phone": "+447777777777"
        },
        {
            "name": "Yusuf Khan",
            "mail": "yusuf.khan@example.com",
            "phone": "+923001234567"
        },
        {
            "name": "Ava Garcia",
            "mail": "ava.garcia@example.com",
            "phone": "+12025559999"
        },
        {
            "name": "Ethan Lee",
            "mail": "ethan.lee@example.com",
            "phone": "+12025558888"
        },
        {
            "name": "Charlotte Kim",
            "mail": "charlotte.kim@example.com",
            "phone": "+821012345678"
        },
        {
            "name": "Noah Nguyen",
            "mail": "noah.nguyen@example.com",
            "phone": "+84123456789"
        },
        {
            "name": "Amelia Patel",
            "mail": "amelia.patel@example.com",
            "phone": "+918888888888"
        },
        {
            "name": "Oliver Russo",
            "mail": "oliver.russo@example.com",
            "phone": "+390123456789"
        },
        {
            "name": "Emma Ali",
            "mail": "emma.ali@example.com",
            "phone": "+966555555555"
        }
    ];
    await setItem('contactList', JSON.stringify(contactList));
    let test = JSON.parse(await getItem('contactList'));
    console.log(test);
}

async function deleteAllContactsEmergencyFunction() {
    // tasks = JSON.parse(await getItem('tasks'));
    let contactList = [];
    await setItem('contactList', JSON.stringify(contactList));
    let test = JSON.parse(await getItem('contactList'));
    console.log(test);
}