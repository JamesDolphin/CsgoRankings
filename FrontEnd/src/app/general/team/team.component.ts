import { Component, OnInit, Input } from '@angular/core';
import { TeamRanking } from 'src/app/models/teamRanking';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor() {}

  @Input() team: TeamRanking;
  ngOnInit() {}
}
