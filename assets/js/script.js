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
      <div class="row time-block">
        <div class="col-2 hour text-right p-3">${moment().hour(i).format("hA")}</div>
        <textarea class="col-8 ${timeblockTense}"></textarea>
        <button class="col-2 btn saveBtn"><i class="fas fa-save"></i></button>
      </div>
      `
    );
  }
});
