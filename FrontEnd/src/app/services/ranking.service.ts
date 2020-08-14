import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ranking } from '../models/ranking'

export interface Cat {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) {}

  getHltvStats(): Observable<Ranking> {
    return this.http.get<Ranking>('http://localhost:8000/api/hltvStats')
  }

  getEslStats(): Observable<Ranking> {
    return this.http.get<Ranking>('http://localhost:8000/api/eslStats')
  }

  getCsppaStats(): Observable<Ranking> {
    return this.http.get<Ranking>('http://localhost:8000/api/csppaStats')
  }
}
