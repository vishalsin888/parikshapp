import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient,) { }

  //get quizzes

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //add quizzes

  public addQuiz(quiz:any){
    console.log('in add of quiz service');
    console.log(`${baseUrl}/quiz/`);
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz

  public deleteQuiz(qId :any){
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get single quiz
  public getQuiz(qId:any){
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`, quiz)

  }

  //get quizzes of category

  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`)
  }

  // get active quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  //get Active quizzes of category
  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }
 

}
