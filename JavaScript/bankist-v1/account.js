class Account {
    owner = '';
    currency = '';
    movements = [];
    movementsDates = [];
    interestRate = 0;
    pin = 0;
    locale = '';
    currencyOptions = {};

    constructor(opt) {
        this.owner = opt.owner;
        this.currency = opt.currency;
        this.movements = opt.movements;
        this.movementsDates = opt.movementsDates;
        this.interestRate = opt.interestRate;
        this.pin = opt.pin;
        this.locale = opt.locale;
        this.currencyOptions = {
            style: 'currency',
            currency: this.currency
        };
    }
    getDeposits(digits = 2) {
        const deposits = this.movements
          .filter(val => val > 0)
          .reduce((acc, cur) => acc + cur);
        return new Intl.NumberFormat(this.locale, this.currencyOptions).format(deposits);
    }
    getWithdrawals(digits=2) {
        const withdrawal = this.movements
        .filter(val => val < 0)
        .reduce((acc, cur) => acc + cur);
      return new Intl.NumberFormat(this.locale, this.currencyOptions).format(withdrawal);
    }
    getBalance(digits = 2) {
        return new Intl.NumberFormat(this.locale, this.currencyOptions).format(this.movements.reduce((acc, cur) => acc + cur));
    }
    getMovements(sort) {
        let movements = this.movements.slice().reduce(
          
          
          (acc, val, i) => {
                if (i === 0) {
                  acc = [
                
                
                {
                          val: val,
                          date: this.movementsDates[i],
                        },
              ,
              ,
              ];
                } else {
                  acc = [
                    ...acc,
                    {
                      val: val,
                      date: this.movementsDates[i],
                    },
                  ];
                }
                return acc;
              },     
          [{ val: 0, date: 0 }]
        ).filter((val) => val);
        if (sort) {
          movements.sort((a, b) => a.val - b.val);
        }
        return movements
          .map((mov, i) => {
            const direction = mov.val > 0 ? 'deposit' : 'withdrawal';
            return `
          <div class="movements__row" key=${i + 1}>
            <div class="movements__type movements__type--${direction}" > ${
              i + ' ' + direction
            }</div >
            <div class="movements__date" key=${i + 1}>
              ${new Date(mov.date)}
            </div>
            <div class="movements__value">${new Intl.NumberFormat(this.locale, this.currencyOptions).format(mov.val)}</div>
          </div>\n`;
          })
          .reverse()
          .join('');
      }
      getInterest(digits = 2) {
        return new Intl.NumberFormat(this.locale, this.currencyOptions).format(this.movements
          .reduce((sum, mov) => {
            let interest = 0;
            if (mov > 0) {
              interest = (mov * this.interestRate) / 100;
              interest = interest >= 1 ? interest : 0;
            }
            return (sum += interest);
          }, 0));
      }
}