$(function () {
  // Handler for .ready() called.
  const $currentDayEl = $("#current-day");
  const $timeblockEl = $("#timeblock");
  const currentMoment = moment();

  $currentDayEl.text(currentMoment.format("dddd, MMMM Do"));

  const startHour24 = 9;
  const endHour24 = 17;
  for (
    let timeblockHour = startHour24;
    timeblockHour <= endHour24;
    timeblockHour++
  ) {
    const timeblockTense = getTimeblockTense(
      currentMoment.hour(),
      timeblockHour
    );
    $timeblockEl.append(
      `
      <div class="row time-block">
        <div class="col-2 hour text-right p-3">
          ${moment().hour(timeblockHour).format("hA")}
        </div>
        <textarea class="col-8 ${timeblockTense}"></textarea>
        <button class="col-2 btn saveBtn"><i class="fas fa-save"></i></button>
      </div>
      `
    );
  }

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
});
