import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Clue } from './clue';
import { ClueService } from './clue.service';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  clues: Clue[] = [];
  constructor(
    private router: Router,
    private clueService: ClueService
  ) {}
  ngOnInit() {
    this.clueService.getClues()
      .then(clues => this.clues = clues.slice(1,3));
  }
  gotoDetail(clue: Clue) {
    let link = ['ClueDetail', { id: clue.id }];
    this.router.navigate(link);
  }
}
