//// script.js


'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKER APP

// Data
// const account1 = {
//   owner: 'Hedi Rivas',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
//   // username : 'hr',
//   // balance : 3850
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];
const account1 = {
  owner: 'Hedi Rivas',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-09-09T17:01:17.194Z',
    '2023-09-18T23:36:17.929Z',
    '2023-09-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'fr-FR',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-09-18T18:49:59.371Z',
    '2023-09-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Fonctions //

const startLogOutTimer = () => {
  let time = 300;

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in the get started';
    }

    time--
  };

  tick();
  const timer = setInterval(tick, 1000);
  return timer

}
const formatCur = (value, local, currency) => {
  return new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency,
  }).format(value)
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatedMovementDate(date)

    const formatedCurr = formatCur(mov.toFixed(2), acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formatedCurr}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
};

const formatedMovementDate = (date, locale) => {
  const calcDatePassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

  const daysPassed = Math.round(calcDatePassed(new Date(), date))
  console.log(daysPassed);

  if (daysPassed < 1) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 1) return `${daysPassed}`;
  else {
    return new Intl.DateTimeFormat(locale).format(date)
  }
}
//displayMovements(account1.movements);

//create a username key
const createUsernames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((el) => el[0])
      .join('');
  });
};

createUsernames(accounts);

const calcDisplayBalance = (acc) => {
  currentAccount.balance = acc.movements.reduce((a, b) => a + b, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.local, acc.currency);
};

//calcDisplayBalance(account1.movements);

const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((a, b) => a + b, 0);
  labelSumIn.textContent = formatCur(incomes, acc.local, acc.currency);

  const out = acc.movements.filter((mov) => mov < 0).reduce((a, b) => a + b, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.local, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((int) => (int * 1.2) / 100)
    .filter((acc) => acc > 1)
    .reduce((a, b) => a + b, 0);
  labelSumInterest.textContent = formatCur(interest, acc.local, acc.currency);
};

const updateUI = (acc) => {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

//calcDisplaySummary(account1.movements);

// Listeners //

// implement Login

let currentAccount;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    const now = new Date()
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

    updateUI(currentAccount);
  }
  inputLoginUsername.value = '';
  inputLoginPin.value = '';

  startLogOutTimer();
});

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(Math.floor(inputTransferAmount.value));
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance > amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    setTimeout(() => {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString())
      receiverAcc.movementsDates.push(new Date().toISOString())


      updateUI(currentAccount);
    }, 3000)

  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault()

  const user = inputCloseUsername.value
  const pin = Number(inputClosePin.value)

  if (user === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    )

    //supp le compte
    accounts.splice(index, 1);

    //hide ui

    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'log in to get started'
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault()

  const loanAmount = Math.floor(inputLoanAmount.value)
  const requestedAmount = currentAccount.movements.some((mov) => mov >= loanAmount * 0.1);

  if (loanAmount > 0 && requestedAmount) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);

      currentAccount.movementsDates.push(new Date().toISOString())

      updateUI(currentAccount)
    }, 3000)

  }

  inputLoanAmount.value = ''
})

let sorted = false;
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted
})