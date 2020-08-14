import { Component, OnInit, Input } from '@angular/core';
import { Ranking } from 'src/app/models/ranking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  constructor() { }


  @Input() ranking: Ranking
  ngOnInit() {
    console.log(this.ranking);
  }

}
