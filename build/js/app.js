'use strict';

document.addEventListener('DOMContentLoaded', function () {
  loadApp();
});

const loadApp = () => {
  selectPercents();
};

/////////////////// Change colors on percents /////////////////////////////
const selectPercents = function () {
  const percents = document.querySelector('.calculator__percents');
  const btnPercent = document.querySelectorAll('.calculator__btn');
  percents.addEventListener('click', function (e) {
    const clicked = e.target.closest('button');
    if (!clicked) return;
    btnPercent.forEach(btn =>
      btn.classList.remove('calculator__btn--selected', 'selected')
    );
    clicked.classList.add('calculator__btn--selected');
    clicked.classList.add('selected');
    tipCalculate();
  });
  const clickedInput = document.querySelector('.calculator__btn--mod');
  clickedInput.addEventListener('click', function () {
    btnPercent.forEach(btn =>
      btn.classList.remove('calculator__btn--selected', 'selected')
    );
    clickedInput.classList.add('selected');
    tipCalculate();
  });
};
///////////////// calculate the tip /////////////////////////////////////////
const tipCalculate = function () {
  const tipPercent = document.querySelector('.selected');
  const bill = document.querySelector('#bill');
  if (!tipPercent || !bill) return;
  const ppl = document.querySelector('#ppl');
  const calcDisplay = document.querySelector('#calcfail');
  if (Number(ppl.value) === 0) {
    calcDisplay.innerHTML = `<p id="calcfail" class="calculator__text">Number of People <span>Can't be zero</span> </p>`;
    return;
  }
  calcDisplay.innerHTML = `<p id="calcfail" class="calculator__text">Number of People</p>`;
  const tip = (bill.value * tipPercent.value) / 100;
  const total = tip / ppl.value;
  const tipCont = document.querySelector('#tipcont');
  tipCont.innerHTML = `<p class="calculator__prize">${total.toFixed(2)}</p>`;
  const personCont = document.querySelector('#perscont');
  personCont.innerHTML = `<p class="calculator__prize">${tip.toFixed(2)}</p>`;
};
