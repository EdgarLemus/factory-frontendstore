import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import { SecurityService } from './services/security.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  public settings: Settings;
  constructor(public appSettings: AppSettings,
    public authService: AuthService,
    public router: Router) {
    this.settings = this.appSettings.settings;
    authService.handleAuthentication();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.renewTokens();
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }
}
