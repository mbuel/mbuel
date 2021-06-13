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

let sortEnabled = false;
let countdown = undefined;
let loggedInAccount;
const timeOutMax = 180000;
let currentTimeout = timeOutMax;
// Functions

const createUserNames = function (accounts) {
    accounts.forEach((account, i) => {
      let user = account.owner;
      account.username = user
        .toLocaleLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
    });
};

const setLogOutTimer = function() {
    if (countdown) {
        clearInterval(countdown);
    }
    currentTimeout = timeOutMax;
      countdown = setInterval(() => {
        // Render timer
        if (currentTimeout >= 0) {
            const minutes = new Date(currentTimeout).getMinutes();
            const seconds = new Date(currentTimeout).getSeconds();

            labelTimer.textContent = `${minutes + ':' + seconds.toString().padStart(2, '0')}`;
            currentTimeout = currentTimeout - 1000;
        } else {
            logOut();
        }
      }, 1000);
}
  

const setLoggedInAccount = function (account) {
    if (account) {
      loggedInAccount = account;
      
        setLogOutTimer();

      return true;
    }
    return false;
};

/**
 * Renders banking account to screen
 * @param {*} account
 */
const renderAccount = function (sort = false) {
    const currentDate = new Date();
  
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }
  
    labelDate.textContent = new Intl.DateTimeFormat(loggedInAccount.locale, options).format(currentDate);
    containerMovements.innerHTML = ''; // reset transactions
    inputCloseUsername.value = '';
    containerMovements.innerHTML = loggedInAccount.getMovements(sort);
  
    labelSumIn.innerHTML = loggedInAccount.getDeposits();
    labelSumOut.innerHTML = loggedInAccount.getWithdrawals();
    labelBalance.innerHTML = loggedInAccount.getBalance();
    labelSumInterest.textContent = `${loggedInAccount.getInterest()}`;
  
    [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
      if (i % 2 === 0) row.style.backgroundColor = 'darkgrey';
    });
  };

  const verifyLogIn = function (username, pin) {
    const currentAccount = accounts.find(acc => acc.username === username);
    console.log(currentAccount, currentAccount?.pin === pin);
    return currentAccount?.pin === pin && currentAccount;
  };



const logOut = function () {
    containerApp.className.includes('display')
      ? containerApp.classList.toggle('display')
      : null;
    labelWelcome.textContent = `Log in to get started`;
    clearInterval(countdown);
    setLoggedInAccount(null);
};

