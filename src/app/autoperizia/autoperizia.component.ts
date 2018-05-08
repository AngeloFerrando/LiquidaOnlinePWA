import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-autoperizia',
  templateUrl: './autoperizia.component.html',
  styleUrls: ['./autoperizia.component.scss']
})
export class AutoperiziaComponent implements OnInit {

  @Output() openPhoto: EventEmitter<any> = new EventEmitter();

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  mesi = [
    {name: 'Gennaio', lastDay: 31},
    {name: 'Febbraio', lastDay: 28},
    {name: 'Marzo', lastDay: 28},
    {name: 'Aprile', lastDay: 28},
    {name: 'Maggio', lastDay: 28},
    {name: 'Giugno', lastDay: 28},
    {name: 'Luglio', lastDay: 28},
    {name: 'Agosto', lastDay: 28},
    {name: 'Settembre', lastDay: 28},
    {name: 'Ottobre', lastDay: 28},
    {name: 'Novembre', lastDay: 28},
    {name: 'Dicembre', lastDay: 28},
  ];

  anni = [
    2014,
    2015,
    2016,
    2017,
    2018,
  ];

  selectedMonth = this.mesi[0];
  selectedDay = 1;
  selectedYear = 2017;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  getDays(mese) {
    const val = [];

    for (let i = 1; i <= mese.lastDay; i++) {
      val.push(i);
    }

    return val;
  }
}
