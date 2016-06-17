import { Component }      from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { ClueService }    from './clue.service';
import { DashboardComponent } from './dashboard.component';
import { CluesComponent } from './clues.component';
import { ClueDetailComponent } from './clue-detail.component';

@Component({
  moduleId: module.id,
  selector: 'jparty-app',
  styleUrls: ['app.component.css'],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Board']">Board</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    ClueService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/board',
    name: 'Board',
    component: CluesComponent
  },
  {
    path: '/clue/:id',
    name: 'ClueDetail',
    component: ClueDetailComponent
  },
])
export class AppComponent {
  title = 'J!Party';
}
