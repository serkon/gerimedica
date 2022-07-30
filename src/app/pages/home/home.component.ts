import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public param = { value: 'This project is Angular Pure Starter' };

  constructor(public languageService: LanguageService, private router: Router) {}

  navigate(): void {
    this.router.navigate(['/sample']);
  }
}
