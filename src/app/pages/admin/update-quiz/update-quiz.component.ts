import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  quiz :any;
  categories:any;

  constructor(private route :ActivatedRoute,
    private _quiz:QuizService,
    private _cat:CategoryService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    //getting qid from the url using ActivatedRoute & storing into qId
    this.qId = this.route.snapshot.params.qid;

    this._quiz.getQuiz(this.qId).subscribe(
      (data : any)=>{

        this.quiz = data;
        console.log(this.quiz);
        
      },(error)=>{
        console.log(error);
        
      }
    )

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },(error)=>{
        console.log(error);
        Swal.fire("Error !! ","Error in Loading Category ",'error');
      }
    )
  }

  //update quiz fun

  public updateQuiz(){
   
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success ","Quiz Updated  ",'success').then(
          (results)=>{
            this.router.navigate(['/admin/quizzes']);
          }
        )
      },(error)=>{
        console.log(error);
        Swal.fire("Error !! ","Error in Updating Quiz !! ",'error');
        
      }
    )
  }

}
