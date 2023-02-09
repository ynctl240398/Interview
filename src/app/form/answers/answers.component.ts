import { IQuestionAnswer, TYPE_QUESTION } from 'src/app/const';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  readonly TYPE_QUESTION = TYPE_QUESTION;
  datas: IQuestionAnswer[] = [];

  constructor(private sharedService: SharedService, private router: Router) {
    this.sharedService.$$().subscribe((data: IQuestionAnswer[]) => {
      this.datas = data;
    });
  }

  ngOnInit(): void {
    if (this.datas.length == 0) this.back();
  }

  back() {
    this.sharedService.$(this.datas);
    this.router.navigate(['form', 'builder']);
  }

}
