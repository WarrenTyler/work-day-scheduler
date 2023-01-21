$(function () {
  // Handler for .ready() called.
  const $currentDayEl = $("#current-day");
  const currentMoment = moment();

  $currentDayEl.text(currentMoment.format("dddd, MMMM Do"));

  const startHour24 = 9;
  const endHour24 = 17;
  for (
    let timeblockHour = startHour24;
    timeblockHour <= endHour24;
    timeblockHour++
  ) {
    // used to test current hour based on an 24 number hour time
    // const currentHour = Number(moment("13", "H").format("H"));
    // or
    // const currentHour = Number(moment().hour(13).format("H"));
    const currentHour = currentMoment.hour();
    let timeblockTense = "past";

    if (timeblockHour > currentHour) {
      timeblockTense = "future";
    } else if (timeblockHour === currentHour) {
      timeblockTense = "present";
    }

    $(".container").append(
      `
      <div class="row time-block">
        <div class="col-2 hour text-right p-3">${moment()
          .hour(timeblockHour)
          .format("hA")}</div>
        <textarea class="col-8 ${timeblockTense}"></textarea>
        <button class="col-2 btn saveBtn"><i class="fas fa-save"></i></button>
      </div>
      `
    );
  }
});
