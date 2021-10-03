import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId :any;
  title: any;

  questions :any = [];

  constructor(private route: ActivatedRoute,
    private question: QuestionService,
    private snack : MatSnackBar,
    ) { }

  ngOnInit(): void {

    this.qId = this.route.snapshot.params.qid;
    this.title = this.route.snapshot.params.title;
    console.log(this.qId);
    console.log(this.title);
    this.question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions = data;
        
      },(error)=>{
        console.log(error);
        
      }
    )
    
  }

  //delete question
  deleteQuestion(quesId:any){
    Swal.fire(
      {
        icon : 'info',
        showCancelButton: true,
        confirmButtonText : 'Delete',
        title : 'Are You Sure ?'
      }
    ).then(
      (result)=>{
       if(result.isConfirmed){
         //delete pressed

         this.question.deleteQuestion(quesId).subscribe(
           (data:any)=>{
            Swal.fire("Success  ","Question Deleted ","success");
            this.questions= this.questions.filter((q:any)=> q.quesId != quesId);
          },(error:any)=>{
            this.snack.open("Error in Deleting Question !! ",'',{
              duration:1000,
            });
            console.log(error);
            
           }
         )
       }
      }
    )
  }

}
