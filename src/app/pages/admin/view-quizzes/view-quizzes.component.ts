import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any = []
  constructor(private quiz : QuizService,private snack : MatSnackBar,) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data:any)=>{
        console.log(data);
        this.quizzes = data;

      },(error)=>{
        console.log(error);
        Swal.fire("Error !! ", 'Error in Loading Quiz Data' , 'error');
        // this.snack.open("Error in Loading Quiz data !!",'',{
        //   duration:1000,
        // });
        
      }
    )
  }

  deleteQuiz(qId :any){
    // alert(qId);
   Swal.fire({
     'icon' : 'info',
     'title' : "Are You Sure ?",
     confirmButtonText : 'Delete',
     showCancelButton : true,

   }).then(
     (result)=>{
       if(result.isConfirmed){

        //delete is clicked in Swal
        this.quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
            console.log(data);
            //after deleting quiz from db remove its Id from frontEnd by filtering
            this.quizzes = this.quizzes.filter((quiz:any)=> quiz.qId != qId);
            Swal.fire("Success ", 'Quiz Deleted SuccessFully' , 'success');
          },(error)=>{
            console.log(error);
            Swal.fire("Error !! ", 'Error in Deleting Quiz' , 'error');
            
          }
        );
       }
     }
   )

  }

  //updateQuiz 

}
