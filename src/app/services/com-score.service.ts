import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComScoreService {

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  sendData(data: number) {
    this.dataSubject.next(data);
  }

  constructor() { }
}
