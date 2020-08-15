import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';
import { Ranking } from 'src/app/models/ranking';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private rankingService: RankingService) {}

  public rankings: Array<Ranking> = [];
  public loading: boolean = false;

  ngOnInit() {
    this.loading = false;
    this.rankingService.getHltvStats().subscribe((res: Ranking) => {
      this.rankings.push(res);

      console.log(this.rankings);

      this.rankingService.getEslStats().subscribe((res: Ranking) => {
        this.rankings.push(res);

        //this.rankingService.getCsppaStats().subscribe((res: Ranking) => {});
      });
    });
  }
}
