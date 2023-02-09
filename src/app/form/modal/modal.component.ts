import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TYPE_QUESTION, IQuestionAnswer, FormAddNewQuestion } from 'src/app/const';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  readonly TYPE_QUESTION = TYPE_QUESTION;

  @Input() isShowModalAddQuestion = false;
  @Output() isShowModalAddQuestionChange = new EventEmitter<boolean>();

  @Output() pushData = new EventEmitter<IQuestionAnswer>();

  formAddNewQuestion!: FormGroup<FormAddNewQuestion>;

  constructor() {
    this.initForm();
  }

  private initForm() {
    this.formAddNewQuestion = new FormGroup(new FormAddNewQuestion());
    this.addAnswer();
    this.addAnswer();
  }

  addAnswer() {
    let answers = this.formAddNewQuestion.controls.answers;
    answers.push(new FormGroup({ answer: new FormControl<string | null>(null, Validators.required) }));
  }

  subAnswer(i: number) {
    console.log(this.formAddNewQuestion.controls.answers.value)
    let answers = this.formAddNewQuestion.controls.answers;
    answers.removeAt(i);
  }

  checkValid() {
    if (this.formAddNewQuestion.controls.question.invalid) {
      return false;
    }
    if (this.formAddNewQuestion.controls.type.value === this.TYPE_QUESTION.CHECK_BOX_LIST) {
      const answerValues = this.formAddNewQuestion.controls.answers.value
      for (let index = 0; index < answerValues.length; index++) {
        if (!answerValues[index].answer) return false;
      }
    }
    return true;
  }

  submit() {

    if (!this.checkValid()) {
      return;
    }

    let answers: string[] = [];
    if (this.formAddNewQuestion.controls.type.value === this.TYPE_QUESTION.CHECK_BOX_LIST) {
      let answersForm = this.formAddNewQuestion.controls.answers.value;
      answersForm.forEach(a => {
        answers.push(a.answer!);
      });
    }
    this.pushData.emit({
      answers: answers,
      answer: null,
      isOtherChoose: false,
      answerChoose: [],
      answerOther: null,
      isOther: this.formAddNewQuestion.controls.isOther.value,
      isRequired: this.formAddNewQuestion.controls.isRequired.value,
      question: this.formAddNewQuestion.controls.question.value,
      type: this.formAddNewQuestion.controls.type.value
    });
    this.close();
  }

  close() {
    this.isShowModalAddQuestion = false;
    this.isShowModalAddQuestionChange.emit(false);
  }

  ngOnInit(): void {
  }

}
