$(function () {
  // Handler for .ready() called.
  const $currentDayEl = $("#currentDay");

  const currentDay = moment();

  $currentDayEl.text(currentDay.format("dddd, MMMM Do"));
});
