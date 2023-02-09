import { IQuestionAnswer } from 'src/app/const';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private event = new ReplaySubject<IQuestionAnswer[]>()

  constructor() { }

  $(data: IQuestionAnswer[]) {
    this.event.next(data);
  }

  $$() {
    return this.event;
  }
}
