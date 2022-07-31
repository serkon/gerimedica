import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';

import data from './to-render.json';

export interface Control {
  field?: string;
  label?: string;
  type?: string;
  hidden?: string;
  mandatory?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myForm!: FormGroup;
  public myControl = new FormControl('');
  public items = data;

  constructor(public fb: FormBuilder, public languageService: LanguageService) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  /**
   * Creates form dynamically based on the data in the json file
   */
  reactiveForm(): void {
    const controls: { [K in keyof Control]: FormControl<string | null> } = {};
    data.forEach(
      (item) =>
        (controls[item.field as keyof Control] = new FormControl('', {
          validators: item.mandatory ? [Validators.required] : [],
        })),
    );
    this.myForm = this.fb.group({ ...controls });
  }

  submitForm(): void {
    console.log(this.myForm.value);
  }

  /* Handle form errors */
  public errorHandling = (control: string, error: string): boolean => this.myForm.controls[control].hasError(error);
}
