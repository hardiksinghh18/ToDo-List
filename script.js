
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoInput = document.querySelector("#todo-input");
    const prioritySelect = document.querySelector("#priority-select");
    const addTaskBtn = document.querySelector("#add-task-btn");
    const todoList = document.querySelector("#todo-list");
    const taskCount = document.querySelector("#task-count");
    const progressCircle = document.querySelector("#progress-circle");
    const progressText = document.querySelector("#progress-text");
    const statsRatio = document.querySelector("#stats-ratio");
    const pendingCountLabel = document.querySelector("#pending-count");
    const greeting = document.querySelector("#greeting");
    const currentDateLabel = document.querySelector("#current-date");
    const filterBtns = document.querySelectorAll(".nav-btn");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // Initialize
    init();

    function init() {
        updateDate();
        updateGreeting();
        renderTasks();
        setupEventListeners();
    }

    function updateDate() {
        const now = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        currentDateLabel.innerText = now.toLocaleDateString('en-US', options);
    }

    function updateGreeting() {
        const hour = new Date().getHours();
        let text = "Good morning";
        if (hour >= 12 && hour < 17) text = "Good afternoon";
        else if (hour >= 17) text = "Good evening";
        greeting.innerText = `${text}`;
    }

    function setupEventListeners() {
        addTaskBtn.addEventListener('click', addTask);
        
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-white/5', 'text-primary');
                    b.classList.add('text-indigo-300/60');
                });
                btn.classList.add('bg-white/5', 'text-primary');
                btn.classList.remove('text-indigo-300/60');
                
                currentFilter = btn.id.replace('filter-', '');
                renderTasks();
            });
        });
    }

    function addTask() {
        const text = todoInput.value.trim();
        const priority = prioritySelect.value;
        
        if (!text) {
            alert("Please enter a task!");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: text,
            priority: priority, // low, medium, high
            completed: false,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };

        tasks.push(newTask);
        saveTasks();
        todoInput.value = '';
        renderTasks();
    }

    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) return { ...task, completed: !task.completed };
            return task;
        });
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        if (confirm("Delete this task?")) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }
    }

    function editTask(id) {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const newText = prompt("Edit task:", task.text);
        if (newText !== null && newText.trim() !== "") {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        todoList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (currentFilter === 'pending') filteredTasks = tasks.filter(t => !t.completed);
        if (currentFilter === 'completed') filteredTasks = tasks.filter(t => t.completed);

        filteredTasks.sort((a, b) => {
            const p = { high: 0, medium: 1, low: 2 };
            return p[a.priority] - p[b.priority];
        }).forEach(task => {
            const taskEl = createTaskElement(task);
            todoList.appendChild(taskEl);
        });

        updateStats();
    }

    function createTaskElement(task) {
        const div = document.createElement('div');
        div.className = "group relative flex items-center gap-2 sm:gap-6 p-3 sm:p-5 rounded-2xl bg-surface-container-low/40 hover:bg-surface-container-high/60 transition-all duration-300 border border-white/5 backdrop-blur-md";
        
        const priorityColors = {
            low: "bg-primary border-primary",
            medium: "bg-primary border-primary",
            high: "bg-secondary border-secondary"
        };
        
        const priorityBadge = {
            low: "border-primary/20 bg-primary/10 text-primary",
            medium: "border-indigo-300/20 bg-indigo-300/10 text-indigo-100",
            high: "border-secondary/20 bg-secondary/10 text-secondary"
        };

        div.innerHTML = `
            <div class="relative w-6 h-6 flex-shrink-0">
                <input class="peer appearance-none w-6 h-6 border-2 border-primary/30 rounded-lg checked:bg-primary checked:border-primary transition-all cursor-pointer" type="checkbox" ${task.completed ? 'checked' : ''}/>
                <span class="material-symbols-outlined absolute top-0 left-0 text-on-primary pointer-events-none opacity-0 peer-checked:opacity-100 text-lg transition-opacity flex items-center justify-center w-full h-full">check</span>
            </div>
            <div class="flex-1 flex flex-col gap-1 min-w-0">
                <span class="text-base sm:text-lg font-medium text-indigo-50 transition-all truncate ${task.completed ? 'line-through text-indigo-300/30' : ''}">
                    ${task.text}
                </span>
                <div class="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span class="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-indigo-300/40">
                        <span class="material-symbols-outlined text-xs">calendar_today</span>
                        ${task.createdAt}
                    </span>
                    <div class="flex items-center gap-1 px-1.5 py-0.5 rounded-full border ${priorityBadge[task.priority]}">
                        <span class="w-1 h-1 rounded-full ${task.priority === 'high' ? 'bg-secondary shadow-[0_0_8px_rgba(255,181,156,0.6)]' : 'bg-primary'}"></span>
                        <span class="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">${task.priority}</span>
                    </div>
                </div>
            </div>
            <div class="flex gap-0.5 sm:gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button class="edit-btn p-2 hover:bg-white/10 rounded-lg text-indigo-300 transition-colors">
                    <span class="material-symbols-outlined text-xl">edit</span>
                </button>
                <button class="delete-btn p-2 hover:bg-error/10 rounded-lg text-error transition-colors">
                    <span class="material-symbols-outlined text-xl">delete</span>
                </button>
            </div>
        `;

        const checkbox = div.querySelector('input');
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const editBtn = div.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTask(task.id));

        const deleteBtn = div.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        return div;
    }

    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        taskCount.innerText = `${total} Task${total !== 1 ? 's' : ''}`;
        progressText.innerText = `${percent}%`;
        statsRatio.innerHTML = `${completed}/${total} <span class="text-indigo-300/30 text-lg">Done</span>`;
        pendingCountLabel.innerText = pending;

        // Update progress circle (stroke-dashoffset range is 282.7 to 0)
        const offset = 282.7 - (percent / 100) * 282.7;
        progressCircle.style.strokeDashoffset = offset;
    }
});
