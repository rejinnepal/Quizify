import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent {
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  subject: string = "";
  question: string = "";
  option1: string = "";
  option2: string = "";
  option3: string = "";
  option4: string = "";
  correct_answer: string = "";
  difficulty_level: string = "";
  editMode: boolean = false;

  constructor(private quizService: QuizService, private router: Router) { }

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

  deletionComplete(){
    this.router.navigate(['./app'])
  }

  editQuestion(question: Question){
    this.currentQuestion = question;
    this.subject = question.subject;
    this.question = question.question;
    this.option1 = question.options[0];
    this.option2 = question.options[1];
    this.option3 = question.options[2];
    this.option4 = question.options[3];
    this.correct_answer = question.correct_answer;
    this.difficulty_level = question.difficulty_level.toString();
    this.editMode = true;
    console.log(this.currentQuestion, this.subject, this.correct_answer, this.difficulty_level, this.question, this.option1, this.option2, this.option3, this.option4);
    console.log("Editing question:", question);
    }


  submitChanges(){

    if (this.currentQuestion && this.currentQuestion._id) {
      const updatedQuestion: Partial<Question> = {
        subject: this.subject,
        question: this.question,
        options: [this.option1, this.option2, this.option3, this.option4],
        correct_answer: this.correct_answer,
        difficulty_level: Number(this.difficulty_level)
      };
      this.quizService.updateQuestion(this.currentQuestion._id, updatedQuestion).subscribe({
        next: (updatedQuestion) => {
          console.log('Question updated successfully', updatedQuestion);
          this.editMode = false;
          this.resetFormFields();
          this.loadQuestions();
        },
        error: (error) => console.error('Error updating question:', error)
      });
    }
  }

  resetFormFields(): void {
    this.subject = '';
    this.question = '';
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.correct_answer = '';
    this.difficulty_level = '';
  }

  closeOverlayBox(){
    this.editMode = false;
  }

}
