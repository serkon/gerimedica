import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
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

  it('should render h1 current language WELCOME', async () => {
    // const translate = TestBed.inject(TranslateService); // bunun yerine direk component'in instance'ını kullandım. Ama herhangi bir dil için test yapmak istiyorsan buradan set edebilirsin.
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    const { languageService } = app;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      languageService.translate.get('WELCOME').subscribe((res: string) => {
        expect(compiled.querySelector('h1')?.textContent).toContain(res);
      });
    });
  });
});
