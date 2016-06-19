import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import './rxjs-operators';

import { ClueService } from './clue.service';
import { GameState } from './game-state.service';
import { InputService } from './input.service';
import { KeyboardService } from './keyboard.service';

import { CluesComponent } from './clues.component';
import { ClueDetailComponent } from './clue-detail.component';
import { DashboardComponent } from './dashboard.component';
import { TitleScreenComponent } from './title-screen.component';

@Component({
  moduleId: module.id,
  selector: 'jparty-app',
  styleUrls: ['app.component.css'],
  template: `
    <div class="screen">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ClueService,
    GameState,
    InputService,
    KeyboardService
  ]
})
@RouteConfig([{
  path: '/',
  name: 'Title',
  component: TitleScreenComponent,
  useAsDefault: true
}, {
  path: '/dashboard',
  name: 'Dashboard',
  component: DashboardComponent
}, {
  path: '/board',
  name: 'Board',
  component: CluesComponent
}, {
  path: '/clue/:id',
  name: 'ClueDetail',
  component: ClueDetailComponent
}])
export class AppComponent {
  title = 'J!Party';
}
