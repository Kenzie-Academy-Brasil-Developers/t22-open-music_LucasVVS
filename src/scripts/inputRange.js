function applyInputRangeStyle() {
  const inputRange = document.querySelector("#customRange");

  inputRange.addEventListener("input", (event) => {
    const currentInputValue = event.target.value;
    const runnableTrackProgress = (currentInputValue / inputRange.max) * 100;

    inputRange.style.background = `linear-gradient(to right, var(--color-brand-1) ${runnableTrackProgress}%, var(--color-grey-5) ${runnableTrackProgress}%)`;
  });
}

export { applyInputRangeStyle };
