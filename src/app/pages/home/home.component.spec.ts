import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared.module';

import { HomeComponent } from './home.component';
import data from './to-render.json';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [TranslateService],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.ngOnInit();
    const { controls } = component.myForm;

    data.forEach((item) => {
      controls[item.field].setValue('');
    });
    expect(component.myForm.valid).toBeFalsy();
  });

  it('form valid when filled', () => {
    component.ngOnInit();
    const { controls } = component.myForm;

    data.forEach((item) => {
      controls[item.field].setValue('test');
    });
    expect(component.myForm.valid).toBeTruthy();
  });

  it('name field validity', () => {
    const { name } = component.myForm.controls;
    name.setValue('test');

    expect(name.valid).toBeTrue();
  });

  it('form field invalid when email is not entered', () => {
    const { name, email } = component.myForm.controls;
    name.setValue('test');
    email.setValue('');

    expect(component.myForm.valid).toBeFalsy();
  });

  it('form field invalid when name is not entered', () => {
    const { name, email } = component.myForm.controls;
    name.setValue('');
    email.setValue('test');

    expect(component.myForm.valid).toBeFalsy();
  });
});
