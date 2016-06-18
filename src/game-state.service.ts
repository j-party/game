import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';

@Injectable()
export class GameState {
  constructor(
    private router: Router
  ) {}
  goTo(routeName: string) {
    this.router.navigate([routeName]);
  }
}
