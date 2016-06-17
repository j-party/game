import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Clue } from './clue';
import { ClueService } from './clue.service';

@Component({
  moduleId: module.id,
  selector: 'clues',
  styleUrls: ['clues.component.css'],
  templateUrl: 'clues.component.html'
})
export class CluesComponent implements OnInit {
  clues: Clue[];
  selectedClue: Clue;
  constructor(
    private router: Router,
    private clueService: ClueService
  ) {}
  getClues() {
    this.clueService.getClues().then(clues => this.clues = clues);
  }
  ngOnInit() {
    this.getClues();
  }
  onSelect(clue: Clue) { this.selectedClue = clue; }
  gotoDetail() {
    this.router.navigate(['ClueDetail', { id: this.selectedClue.id }]);
  }
}
