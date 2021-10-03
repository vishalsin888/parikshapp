import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {


  catId :any;
  quizzes : any ;
  constructor(private route : ActivatedRoute,
    private snack : MatSnackBar,
    private quizz : QuizService,) { }

  ngOnInit(): void {

   this.route.params.subscribe(
     (params:any)=>{
      this.catId = params.catId ;
      console.log("catId >> "+this.catId);
      if(this.catId ==0 ){
        //load all quizzes
        this.quizz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.quizzes = data;
            console.log(this.quizzes);
            
          },(error)=>{
            console.log(error);
            this.snack.open("Error in Loading Quizzes !! ",'',{
             duration:1000,
           });
          }
        )
   
      }else{
        //load specific quiz
        this.quizz.getActiveQuizzesOfCategory(this.catId)
        .subscribe(
          (data:any)=>{
            this.quizzes = data;
          },(error)=>{
            console.log(error);
            
          }
        )
      }
     },
   )
   
  }

}
