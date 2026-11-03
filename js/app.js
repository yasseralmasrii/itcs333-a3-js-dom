document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const errorMsg = document.getElementById("error-msg");
    const todoList = document.getElementById("todo-list");
    const counter = document.getElementById("counter");
    
    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    function updateCounter() {
        const activeItems = todoList.querySelectorAll("li:not(.completed)");
        counter.textContent = `${activeItems.length} item${activeItems.length === 1 ? "" : "s"} left`;
    }

    function applyFilter() {
        const items = todoList.querySelectorAll("li");
        items.forEach((li) => {
            const isCompleted = li.classList.contains("completed");
            if (currentFilter === "active") {
                li.style.display = isCompleted ? "none" : "flex";
            } else if (currentFilter === "done") {
                li.style.display = isCompleted ? "flex" : "none";
            } else {
                li.style.display = "flex";
            }
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    const text = input.value.trim();
    if (text === "") {
        errorMsg.classList.remove("hidden");
        return;
    }
    errorMsg.classList.add("hidden");
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = text;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "delete-btn";
    btn.textContent = "Delete";
    li.appendChild(span);
    li.appendChild(btn);
    todoList.appendChild(li);
    input.value = "";
    updateCounter();
    applyFilter();
    });

    todoList.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        if (e.target.classList.contains("delete-btn")) {
            todoList.removeChild(li);
        } else {
            li.classList.toggle("completed");
        }
    updateCounter();
    applyFilter();
    });

    filterAll.addEventListener("click", () => {
        currentFilter = "all";
        applyFilter();
    });

    filterActive.addEventListener("click", () => {
        currentFilter = "active";
        applyFilter();
    });

    filterDone.addEventListener("click", () => {
        currentFilter = "done";
        applyFilter();
    });
});
