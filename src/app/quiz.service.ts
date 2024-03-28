// // quiz.service.ts (Angular service)

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Question } from './question.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuizService {

//   private apiUrl = 'http://localhost:5039/api/quizify'; // API endpoint

//   constructor(private http: HttpClient) { }

//   getQuestions(): Observable<Question[]> {
//     return this.http.get<any>(`${this.apiUrl}/getQuestions`);
//   }

//   addQuestion(newQuestion: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/addQuestions`, { newQuestion });
//   }

//   deleteQuestion(id: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/DeleteQuestions?id=${id}`);
//   }
// }




// quiz.service.ts (Angular service)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:8000/questions');
  }
}