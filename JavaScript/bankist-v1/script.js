'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const accounts = [
  new Account(account1), 
  new Account(account2)];

/////////////////////////////////////////////////


/////////////////////////////////////////////////

createUserNames(accounts);

btnSort.addEventListener('click', e => {
  e.preventDefault();
  sortEnabled = !sortEnabled;
  renderAccount(sortEnabled);
});

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const username = inputLoginUsername.value;
  const userPin = Number(inputLoginPin.value);

  if (setLoggedInAccount(verifyLogIn(username, userPin)) === true) {
    !containerApp.className.includes('display')
      ? containerApp.classList.toggle('display')
      : null;
    labelWelcome.textContent = `Welcome back, ${
      loggedInAccount.owner.split(' ')[0]
    }`;

    renderAccount();
  } else {
    logOut();
  }
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
});



btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= loggedInAccount.getBalance() &&
    receiverAcc?.username !== loggedInAccount?.username
  ) {
    console.log(`transfer valid`);
    loggedInAccount.movements.push(-amount);
    loggedInAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());
    renderAccount();
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
  } else {
    // invalid transfer
    console.log(`invalid transfer`);
  }
  setLogOutTimer();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const determinatePercentage = 0.1;
  const loanAmt = Number(inputLoanAmount.value);

  if (
    loggedInAccount.movements.some(
      val => loanAmt >= determinatePercentage * val
    )
  ) {
    console.log('valid loan.');
    // add to account
    loggedInAccount.movements.push(loanAmt);
    loggedInAccount.movementsDates.push(new Date().toISOString());    // update display
    renderAccount();
  } else {
    // display error?
  }
  setLogOutTimer();
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const userToDelete = inputCloseUsername.value;
  const pinToDelete = +inputClosePin.value;
  if (
    verifyLogIn(userToDelete, pinToDelete) &&
    loggedInAccount.username === userToDelete &&
    loggedInAccount.pin === pinToDelete
  ) {
    const idxToDelete = accounts.indexOf(loggedInAccount);
    accounts.splice(idxToDelete, 1);
    logOut();
  }
});

// Lectures

// All numbers floating point numbers in JS

