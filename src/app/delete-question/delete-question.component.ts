import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent {
  questions: Question[] = [];
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuestions();
    console.log(this.questions);
  }

  loadQuestions(): void {
    this.quizService.getQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  deleteQuestion(questionText: string): void {
    this.quizService.deleteQuestion(questionText).subscribe({
      next: (response) => {
        this.questions = this.questions.filter(question => question.question !== questionText);
        console.log('Question deleted successfully');
      },
      error: (error) => {
        console.error('There was an error deleting the question', error);
      }
    });
    this.loadQuestions();
  }


}
