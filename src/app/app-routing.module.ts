import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {component: QuizComponent, path: 'app'},
  { component: LoginComponent, path: 'login'},
  { component: HomeComponent, path: 'home'},
  { component: RegisterComponent, path: 'register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
