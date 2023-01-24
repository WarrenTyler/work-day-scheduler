$(function () {
  const $currentDayEl = $("#current-day");
  const $timeblockEl = $("#timeblock");
  const currentMoment = moment();

  $currentDayEl.text(currentMoment.format("dddd, MMMM Do"));

  createTimeblockRows(9, 17);

  populateSavedTasked(currentMoment);

  // FUNCTIONS ----------------------------------------- //

  function getTimeblockTense(currentHour, timeblockHour) {
    let timeblockTense = "past";

    if (timeblockHour > currentHour) {
      timeblockTense = "future";
    } else if (timeblockHour === currentHour) {
      timeblockTense = "present";
    }

    return timeblockTense;
  }

  // create and append timeblock rows to page using ints to represent 24 hour time
  function createTimeblockRows(from24Hour, to24Hour) {
    for (
      let timeblockHour = from24Hour;
      timeblockHour <= to24Hour;
      timeblockHour++
    ) {
      const timeblockTense = getTimeblockTense(
        currentMoment.hour(),
        timeblockHour
      );

      $timeblockEl.append(
        `
        <div class="row time-block" data-hour="${timeblockHour}">
          <div class="col-2 hour text-right p-3">${moment()
            .hour(timeblockHour)
            .format("hA")}
          </div>
          <textarea class="col-8 ${timeblockTense}"></textarea>
          <button class="col-2 btn save-btn"><i class="fas fa-save"></i></button>
        </div>
        `
      );
    }
  }

  // this function will populate the textarea's with any tasks that are in
  // local storage for a particular date
  function populateSavedTasked(currentMoment) {
    const savedTasks = JSON.parse(localStorage.getItem("storedTasks")) || {};
    const forDate = currentMoment.format("DD-MM-YYYY");

    let tasksForDate = savedTasks[forDate] || [];
    tasksForDate.forEach((task) => {
      const textTarget = $(`[data-hour=${task.taskTime}]`).find("textarea");
      textTarget.val(task.taskText);
    });
  }

  // EVENTS ----------------------------------- //

  $timeblockEl.on("click", ".save-btn", function () {
    // get the button that was clicked parent
    const $timeblockRowEl = $(this).parent();

    const tasks = JSON.parse(localStorage.getItem("storedTasks")) || {};
    // taskDate will be used as a key for the storage data structure
    const taskDate = moment().format("DD-MM-YYYY");

    // create a new task object based on the text for the task at a particular hour
    const taskText = $(this).parent().find("textarea").val();
    const taskTime = $timeblockRowEl.data("hour");
    const task = { taskTime, taskText };

    let tasksForDate = tasks[taskDate] || [];
    // remove any task set for this particular time
    tasksForDate = tasksForDate.filter((task) => task.taskTime != taskTime);
    // only add task if there is some text
    if (taskText) {
      tasksForDate.push(task);
    }
    tasks[taskDate] = tasksForDate;
    // remove the date key if there are no task entries
    if (tasksForDate.length === 0) {
      delete tasks[taskDate];
    }

    localStorage.setItem("storedTasks", JSON.stringify(tasks));
  });
});
