import { FormControl, FormArray, Validators, FormGroup } from '@angular/forms';

export interface IQuestionAnswer {
  question: string | null;
  type: string | null;
  answers: string[] | null;
  answer: string | null;
  answerChoose: string[] | null;
  answerOther: string | null;
  isOther: boolean | null;
  isOtherChoose: boolean | null;
  isRequired: boolean | null;
}

export class FormAddNewQuestion {
  type = new FormControl<string | null>(TYPE_QUESTION.CHECK_BOX_LIST);
  question = new FormControl<string | null>(null, Validators.required);
  answers = new FormArray<FormGroup<{ answer: FormControl<string | null> }>>([]);
  isOther = new FormControl<boolean | null>(false);
  isRequired = new FormControl<boolean | null>(false);
}

export enum TYPE_QUESTION {
  CHECK_BOX_LIST = "CHECK_BOX_LIST",
  PARAGRAPH = "PARAGRAPH"
}
