import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  questions: Question[] = [];
  quizQuestions: Question[] = [];
  preferencesSet: boolean = false;
  quizSubmitted: boolean = false;
  quizResults: any[] = [];
  selectedOption: String = "";
  selectedOptions: String[] = [];
  correctOptions: String[] = [];
  questionsList: String[] = [];
  eachScore: number = 1;
  totalScore: Number = 0;
  totalAttempted: Number = 0;
  difficultyLevels: Number[] = [1, 2, 3, 4, 5];
  difficultyLevelSelected: Number = 1;
  subjects: String[] = ["Computer Science", "Physics", "Mathematics", "Spanish", "Chemistry"];
  subjectSelected: String = "";
  numberOfQuestions: Number[] = [10, 20, 30, 40, 50];
  numberofQuestionsSelected: Number = 20;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  submitQuiz() {
    this.quizSubmitted = true;
    this.quizResults = [];

    for (let i = 0; i<this.selectedOptions.length; i++) {
      if (this.selectedOptions[i] == this.correctOptions[i]){
        this.quizResults.push({question: this.questionsList[i], selectedOption: this.selectedOptions[i], correctOption: this.correctOptions[i], correctStatus: "Correct", score: this.eachScore});
        this.totalScore = +this.totalScore + 1;
      }
      else {
        this.quizResults.push({question: this.questionsList[i], selectedOption: this.selectedOptions[i], correctOption: this.correctOptions[i], correctStatus: "Incorrect", score: 0});
      }
      this.totalAttempted = +this.totalAttempted + 1;
    }
  };

  addSelectedOption(selectedOption: String, question: Question){
    this.selectedOptions.push(selectedOption);
    this.correctOptions.push(question.correct_answer);
    this.questionsList.push(question.question);
    this.selectedOption = "";
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

  fetchQuestions(difficultyLevelSelected: Number, subjectSelected: String, numberofQuestionsSelected: Number) : Question[] {
    this.preferencesSet = true;
    var count = 0;
    for (let question of this.questions){
      if (question.subject == subjectSelected && question.difficulty_level <= difficultyLevelSelected){
        this.quizQuestions.push(question);
        count += 1;
      }
      if (count > (numberofQuestionsSelected as number)){
        return this.quizQuestions
      }
    }
    console.log(this.difficultyLevelSelected);
    console.log(this.subjectSelected);
    console.log(this.numberofQuestionsSelected);
    return this.quizQuestions;
  }






  // addQuestion(): void {
  //   if (this.newQuestion.trim()) {
  //     this.quizService.addQuestion(this.newQuestion.trim()).subscribe(
  //       () => {
  //         this.loadQuestions();
  //         this.newQuestion = '';
  //       },
  //       error => console.error('Error adding question:', error)
  //     );
  //   }
  // }

  // deleteQuestion(id: string): void {
  //   this.quizService.deleteQuestion(id).subscribe(
  //     () => this.loadQuestions(),
  //     error => console.error('Error deleting question:', error)
  //   );
  // }

  // submitQuestion(): void {
  //   this.quizService.addQuestion(this.newQuestion).subscribe(
  //     () => {
  //       this.newQuestion = {
  //         subject: '',
  //         question: '',
  //         options: ['', '', '', ''],
  //         correctOption: '',
  //         difficultyLevel: ''
  //       };
  //     },
  //     error => {
  //       console.error('Error submitting question:', error);
  //     }
  //   );
  // }
}
