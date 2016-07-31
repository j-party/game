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
    this.clueService.getClues()
      .then(categories => {
        this.categories = [];
        this.categories.push(categories[0]);
        this.categories.push(categories[1]);
        this.categories.push(categories[2]);
      });
  }
  gotoDetail(clue: Clue) {
    let link = ['ClueDetail', { id: clue.id }];
    this.router.navigate(link);
  }
}
