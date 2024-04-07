import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  difficultyLevels: number[] = [1, 2, 3, 4, 5];
  difficultyLevelSelected: number | null = null;
  subjects: String[] = ["All", "Computer Science", "Physics", "Mathematics", "Spanish", "Chemistry", "Biology"];
  subjectSelected: String = "";
  numberOfQuestions: number[] = [10, 20, 30, 40, 50];
  numberofQuestionsSelected: number | null = null;

  constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) { }

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

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  fetchQuestions(difficultyLevelSelected: number | null, subjectSelected: String, numberofQuestionsSelected: number | null) : Question[] {
    this.preferencesSet = true;
    this.quizQuestions = [];

    const effectiveDifficultyLevel = difficultyLevelSelected !== null ? difficultyLevelSelected : Math.max(...this.difficultyLevels);
    const effectiveNumberOfQuestionsSelected = numberofQuestionsSelected !== null ? numberofQuestionsSelected : Math.max(...this.numberOfQuestions);
    const effectiveSubjectSelected = subjectSelected !== "" ? subjectSelected : "All";

    let filteredQuestions = this.questions.filter(question => 
      question.subject === effectiveSubjectSelected || effectiveSubjectSelected === "All"
    ).filter(question => 
      +question.difficulty_level <= effectiveDifficultyLevel
    );

    let shuffledQuestions = this.shuffleArray(filteredQuestions);
    this.quizQuestions = shuffledQuestions.slice(0, effectiveNumberOfQuestionsSelected);
    return this.quizQuestions;
  }

  retakeQuiz(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }
}
