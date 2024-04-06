export interface Question {
  _id : string;
  subject: string;
  question: string;
  options: string[],
  correct_answer: string,
  difficulty_level: Number;
}