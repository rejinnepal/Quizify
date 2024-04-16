import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

  downloadResults() {
    const data = document.getElementById('score-results-container') as HTMLElement;
    const button = document.getElementById('download-results-button') as HTMLElement;
    button.style.display = 'none';

    html2canvas(data, { scale: 2 }).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const logoImg = new Image();
        logoImg.src = '../../assets/656e9d671ff40834d6f330d3_CO7LsOvIovcCEAE=.png';
        logoImg.onload = () => {
            const logoWidth = 60;
            const logoHeight = 30;
            const xLogoPos = (pageWidth / 2) - (logoWidth / 2);
            pdf.addImage(logoImg, 'PNG', xLogoPos, 10, logoWidth, logoHeight);

            const textPositionY = logoHeight + 25;
            pdf.setFontSize(12);
            pdf.text('Unofficial Transcript', pageWidth / 2, textPositionY, { align: 'center' });

            const additionalTextY = textPositionY + 10;
            pdf.setFontSize(10);
            pdf.text('This is not an official report. This is made available only for unofficial purposes.', pageWidth / 2, additionalTextY, { align: 'center' });

            const contentTopMargin = additionalTextY + 10; 

            let contentHeightRemaining = imgHeight;
            let contentPositionY = contentTopMargin;

            while (contentHeightRemaining > 0) {
                let spaceOnPage = pageHeight - contentPositionY - 10;
                if (contentHeightRemaining > spaceOnPage) {
                    pdf.addImage(contentDataURL, 'PNG', 0, contentPositionY, imgWidth, spaceOnPage, undefined, 'FAST');
                    pdf.addPage(); 
                    contentHeightRemaining -= spaceOnPage;
                    contentPositionY = 0; 
                } else {
                    pdf.addImage(contentDataURL, 'PNG', 0, contentPositionY, imgWidth, contentHeightRemaining);
                    contentHeightRemaining = 0;
                }
            }

            pdf.save('Quizify-Score-Results.pdf');
            button.style.display = '';
        };

        logoImg.onerror = () => {
            console.error('Failed to load logo image');
            button.style.display = '';
            pdf.addImage(contentDataURL, 'PNG', 0, 10, imgWidth, imgHeight);
            pdf.save('Quizify-Score-Results.pdf');
        };
    });
  }


}
