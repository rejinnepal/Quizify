export interface Question {
  id: Number;
  subject: String;
  question: String;
  options: String[],
  correct_answer: String,
  difficulty_level: Number;
}
  