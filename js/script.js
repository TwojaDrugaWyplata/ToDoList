{
  let tasks = [];

  let hiding = false;

  const renderTasks = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
      <li class="tasksList__item${hiding && task.done ? " tasksList__item--hidden" : ""}">
          <button class="tasksList__button js-toggleTaskDone${task.done ? "" : " tasksList__button--false"}"></button>
              <span class="tasksList__task${task.done ? "" : " tasksList__task--false"}">
                  ${task.name}
              </span>
          <button class="tasksList__button tasksList__button--deleteButton js-deleteTask"></button>
      </li>
          `
    }
    document.querySelector(".js-tasksList").innerHTML = htmlString;
  };
  const renderButtons = () => {
    let listString = "";
    listString += `
    <button class="section__button js-hideDoneButton${tasks.length > 0 ? "" : " tasksList--hidden"}">
        ${hiding ? "Pokaż ukończone" : "Ukryj ukończone"}
    </button>
    <button class="section__button js-doneAllButton${tasks.length > 0 ? "" : " tasksList--hidden"} ${tasks.every(({ done }) => done) ? " section__button--notActive" : ""}">
        Ukończ wszystkie
    </button>`;
    document.querySelector(".js-sectionButtons").innerHTML = listString;

    bindDoneAllListener();
    bindHideDoneListener();

  };
  const render = () => {
    renderTasks();
    renderButtons();
    bindListeners();
  };

  const bindDoneAllListener = () => {
    const doneAllButton = document.querySelector(".js-doneAllButton");
    doneAllButton.addEventListener("click", () => {
      tasks.forEach((task, index) => {
        tasks = [
          ...tasks.slice(0, index),
          { ...tasks[index], done: true },
          ...tasks.slice(index + 1),
        ];
      });
      render();
    });
  };


  const bindHideDoneListener = () => {
    const hideDoneButton = document.querySelector(".js-hideDoneButton");
    hideDoneButton.addEventListener("click", () => {
      hiding = !hiding;
      console.log(hiding)
      render();
    });
  };


  const addNewTask = () => {
    const newTask = document.querySelector(".js-input").value.trim();

    if (newTask === "") {
      return;
    }
    tasks = [
      ...tasks,
      { name: newTask, done: false },
    ];
    render();
  };

  const deleteTask = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1),
    ];
    render();
  };
  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const bindListeners = () => {

    const doneButtons = document.querySelectorAll(".js-toggleTaskDone");
    doneButtons.forEach((doneButton, index) => {
      doneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    const deleteButtons = document.querySelectorAll(".js-deleteTask");
    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });
  };

  const clearForm = () => {
    document.querySelector(".js-form").reset();
  };

  const focusInput = () => {
    document.querySelector(".js-input").focus();
  };

  const init = () => {
    render();

    const formElement = document.querySelector(".js-form");
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      addNewTask();
      clearForm();
      focusInput();
    });

  };
  init();
};