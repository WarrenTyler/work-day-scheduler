$(function () {
  // Handler for .ready() called.
  const $currentDayEl = $("#current-day");
  const $timeblockEl = $("#timeblock");
  const currentMoment = moment();

  $currentDayEl.text(currentMoment.format("dddd, MMMM Do"));

  createTimeblockRows(9, 17);

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

  // EVENTS ----------------------------------- //

  $timeblockEl.on("click", ".save-btn", function () {
    // console.log(this.parentNode.dataset.hour)
    // console.log($(this).parent().data("hour"));

    const $timeblockRowEl = $(this).parent();
    // const $timeblockTextEl = $timeblockRowEl.find("textarea");
    // console.log($(this).parent().find("[data-task-entry]").val())
    // console.log($(this).parent().find("textarea").val());
    // const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    const tasks = JSON.parse(localStorage.getItem("storedTasks")) || {};
    const taskDate = moment().format("DD-MM-YYYY");
    const taskText = $(this).parent().find("textarea").val();
    const taskTime = $timeblockRowEl.data("hour");
    const task = { taskTime, taskText };

    let tasksForDate = tasks[taskDate] || [];

    tasksForDate = tasksForDate.filter((task) => task.taskTime != taskTime);

    tasksForDate.push(task);
    tasks[taskDate] = tasksForDate;
    console.log(tasks);

    localStorage.setItem("storedTasks", JSON.stringify(tasks));
  });
});
