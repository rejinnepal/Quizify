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

  private baseUrl = 'http://localhost:8000/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}`);
  }

  addQuestion(question: Partial<Question>): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/add`, question);
  }

  updateQuestion(id: string, question: Partial<Question>): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/update/${id}`, question);
  }

  deleteQuestion(question: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${encodeURIComponent(question)}`);
  }
}