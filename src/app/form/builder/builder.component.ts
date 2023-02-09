import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestionAnswer, TYPE_QUESTION } from 'src/app/const';
import { SharedService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  readonly TYPE_QUESTION = TYPE_QUESTION;
  isShowModalAddQuestion = false;
  datas: IQuestionAnswer[] = [];

  constructor(private sharedService: SharedService, private router: Router) {
    this.sharedService.$$().subscribe((data: IQuestionAnswer[]) => {
      this.datas = data;
    });
  }

  ngOnInit(): void {
  }

  change(event: any, data: IQuestionAnswer) {
    const value = event.target.value;
    if (event.target.checked) data.answerChoose?.push(value);
    else data.answerChoose = data.answerChoose?.filter(a => a != value) || [];

  }

  checkValid() {
    if (this.datas.length == 0) return false;
    for (let index = 0; this.datas.length > index; index++) {
      const data = this.datas[index];
      if (data.isRequired) {
        if (data.type === this.TYPE_QUESTION.CHECK_BOX_LIST) {
          if (data.answerChoose?.length == 0) return false;
        }
        else if (data.answer == null || data.answer == '') return false;
      }
    }
    return true;
  }

  viewAnswer() {
    this.sharedService.$(this.datas);
    this.router.navigate(['form', 'answers']);
  }

}
