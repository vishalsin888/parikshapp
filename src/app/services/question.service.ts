import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  //get Questions of particular quiz
  public getQuestionsOfQuiz(qId:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  //get Questions of particular quiz for test
  public getQuestionsOfQuizForTest(qId:any){
    return this.http.get(`${baseUrl}/question/quiz/${qId}`);
  }

  //add question to server

  public addQuestion(question :any){
    return this.http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId : any){
    return this.http.delete(`${baseUrl}/question/${questionId}`)
  }

  
}
