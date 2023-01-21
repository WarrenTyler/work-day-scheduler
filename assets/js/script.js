$(function () {
  // Handler for .ready() called.
  const $currentDayEl = $("#current-day");
  const currentDay = moment();
  $currentDayEl.text(currentDay.format("dddd, MMMM Do"));

  for (let i = 9; i < 18; i++) {
    // used to test current hour based on an 24 number hour time
    // const currentHour = Number(moment("13", "H").format("H"));
    // or 
    // const currentHour = Number(moment().hour(13).format("H"));
    const currentHour = moment().hour();
    let timeblockTense = "past";
    
    if (i > currentHour) {
      timeblockTense = "future";
    } else if (i === currentHour) {
      timeblockTense = "present";
    }

    $(".container").append(
      `
      <div class="row">
        <div class="col hour text-right">${moment().hour(i).format("hA")}</div>
        <textarea class="col time-block ${timeblockTense}"></textarea>
        <button class="col btn saveBtn"><i class="fas fa-save"></i></button>
      </div>
      `
    );
  }
});
