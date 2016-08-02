import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Category, Clue } from './clue';
import { ClueService } from './clue.service';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private router: Router,
    private clueService: ClueService
  ) {}
  ngOnInit() {
    this.clueService.choose(6).then(categories => { this.categories = categories; });
  }
  gotoDetail(clue: Clue) {
    let link = ['ClueDetail', { id: clue.id }];
    this.router.navigate(link);
  }
}
