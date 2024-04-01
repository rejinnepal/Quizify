import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  subject: string = "";
  question: string = "";
  option1: string = "";
  option2: string = "";
  option3: string = "";
  option4: string = "";
  options: string[] = [];
  correct_answer: string = "";
  difficulty_level: string = "";

  constructor(private quizService: QuizService, private router: Router) { }

  getOptions(): string[] {
    return [this.option1, this.option2, this.option3, this.option4];
  }

  submitQuestion(): void {
    this.options = this.getOptions();
    console.log(this.subject);
    console.log(this.question);
    console.log(this.options);
    console.log(this.correct_answer);
    console.log(this.difficulty_level);
    const newQuestion: Question = {
      subject: this.subject,
      question: this.question,
      options: this.options,
      correct_answer: this.correct_answer, 
      difficulty_level: parseInt(this.difficulty_level)
    };
  
    this.quizService.addQuestion(newQuestion).subscribe({
      next: (response) => {
        console.log('Question added successfully!');
      },
      error: (error) => {
        console.error('Error adding question:', error);
      }
    });
    alert('Question submitted successfully!')
    this.router.navigate(['/app']);
  }
}
