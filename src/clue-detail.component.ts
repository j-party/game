import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Clue } from './clue';
import { ClueService } from './clue.service';

@Component({
  moduleId: module.id,
  selector: 'clue-detail',
  styleUrls: ['clue-detail.component.css'],
  templateUrl: 'clue-detail.component.html'
})
export class ClueDetailComponent implements OnInit {
  clue: Clue;
  constructor(
    private clueService: ClueService,
    private routeParams: RouteParams
  ) {}
  ngOnInit() {
    let id = +this.routeParams.get('id');
    //this.clueService.getClue(id).then(clue => this.clue = clue);
  }
  goBack() {
    window.history.back();
  }
}
