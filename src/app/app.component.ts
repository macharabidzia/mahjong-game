import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state(
        'open',
        style({
          boxShadow: '0px 8px 21px -8px rgba(140,99,194,1)',
        })
      ),
    ]),
  ],
})
export class AppComponent {
  title = 'Mahjong like game';
  numbers: number[] = [];
  twoNumArray: any = [];
  randomNumbers: { isOpen: boolean; number: number }[] = [];
  constructor() {
    this.setNumbers();
    console.log(this.randomNumbers);
  }

  shuffle(array): void {
    let currentIndex: number = array.length,
      temporaryValue: number,
      randomIndex: number;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  cardAnimation(numberObject) {
    if (!numberObject.isOpen) {
      let itemIndex = this.randomNumbers.findIndex(
        (item) => item == numberObject
      );
      let obj = {
        number: numberObject.number,
        isOpen: true,
      };
      this.randomNumbers[itemIndex] = obj;
      if (this.twoNumArray.length == 2) {
        if (this.twoNumArray[0].number !== this.twoNumArray[1].number) {
          this.twoNumArray.forEach((element) => {
            let index = this.randomNumbers.findIndex(
              (x) => x.number == element.number && x.isOpen === element.isOpen
            );
            console.log(index);
            this.randomNumbers[index] = {
              number: this.randomNumbers[index].number,
              isOpen: false,
            };
          });
        }
        this.twoNumArray = [];
      }
      this.twoNumArray.push(obj);
    }
  }
  setNumbers(): void {
    let x = true;
    for (var i = 1; i <= 50; i++) {
      this.numbers.push(i);
    }
    while (x != false) {
      if (this.randomNumbers.length < 30) {
        let num: number = this.numbers[
          Math.floor(Math.random() * this.numbers.length)
        ];
        if (!this.randomNumbers.find((element) => element.number == num)) {
          for (let i = 0; i < 2; i++) {
            this.randomNumbers.push({ isOpen: false, number: num });
          }
        }
      } else {
        x = false;
      }
    }
    this.shuffle(this.randomNumbers);
  }
}
