import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';
import { BuilderComponent } from './builder/builder.component';
import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: '', component: FormComponent, children: [
      { path: '', redirectTo: 'builder', pathMatch: 'full' },
      { path: 'builder', component: BuilderComponent },
      { path: 'answers', component: AnswersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
