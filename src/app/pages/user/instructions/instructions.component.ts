import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId:any;
  quizData : any;
  constructor(private route:ActivatedRoute,private quiz:QuizService
    ,private router:Router) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params.qid;
    //alert(this.qId);
    this.quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.quizData= data;
        
      },(error:any)=>{
        console.log(error);
        Swal.fire("Error in Loading Quiz Data","Error","error");

      }
    )

  }
  startQuiz(){
    Swal.fire({
      icon : 'info',
      title : 'Do You Want to Start ?',
      showCancelButton :true,
      confirmButtonText : 'Start',
      }).then(
        (result:any)=>{
          if(result.isConfirmed){
            this.router.navigate(['/start/'+this.qId]);
          }
          else{

          }
        }
      )
  }
}
