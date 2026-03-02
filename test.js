const test = arg => {
    const bar = document.getElementsByClassName("bar")[0];
    bar.innerHTML +=
    `<div class="${String(arg)}">${String(arg)}</div>`;
};
