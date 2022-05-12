'use strict';

document.addEventListener('DOMContentLoaded', function () {
  loadApp();
});

const loadApp = () => {
  selectPercents();
  keydown();
  resetApp();
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
////// Press enter to calculate tip
const keydown = () => {
  const tipInput = document.querySelector('#tipinput');
  tipInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) tipCalculate();
  });
};

///////////////////////////// RESET BUTTON //////////////////////////////
const resetApp = function () {
  const resetBtn = document.querySelector('.calculator__reset');
  resetBtn.addEventListener('click', function () {
    document
      .querySelectorAll('.calculator__btn')
      .forEach(perc => perc.classList.remove('calculator__btn--selected'));
    document
      .querySelectorAll('.calculator__input')
      .forEach(inp => (inp.value = 0));
    const calcDisplay = document.querySelector('#calcfail');
    calcDisplay.innerHTML = `<p id="calcfail" class="calculator__text">Number of People</p>`;
    document.querySelector('#ppl').style.removeProperty('border');
    document.querySelector('#tipinput').value = 0;
    document
      .querySelectorAll('.calculator__prize')
      .forEach(prz => (prz.textContent = `$0.00`));
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
    ppl.style.border = '2px solid rgb(250, 153, 153)';
    return;
  }
  calcDisplay.innerHTML = `<p id="calcfail" class="calculator__text">Number of People</p>`;
  ppl.style.border = '2px solid transparent';
  const tip = (bill.value * tipPercent.value) / 100;
  const total = tip / ppl.value;
  const tipCont = document.querySelector('#tipcont');
  tipCont.innerHTML = `<p class="calculator__prize">${total.toFixed(2)}</p>`;
  const personCont = document.querySelector('#perscont');
  personCont.innerHTML = `<p class="calculator__prize">${tip.toFixed(2)}</p>`;
};
