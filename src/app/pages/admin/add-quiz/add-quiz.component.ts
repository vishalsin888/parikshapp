import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories : any = [];

  quizData = {
    title : '',
    description : '',
    maxMarks : '',
    numberOfQuestions : '',
    active : true,
    category : {
      cid :'',
    },
  }
  constructor(private _cat : CategoryService,
    private snack:MatSnackBar,
    private _quiz: QuizService,) { }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(this.categories);
        
      },(error)=>{
        console.log(error);
        Swal.fire("Error !! ","Error in Loading Data from Server","error");
      }
    )
  }

  addQuiz(){

    if(this.quizData.title.trim() == '' || this.quizData.title.trim() == null){
      this.snack.open("Title Required !!",'',{
        duration:1000,
      });
      return;
    }
    console.log(this.quizData);
      //validation
      this._quiz.addQuiz(this.quizData).subscribe(
        (data:any)=>{
          console.log('data in add quiz');
          console.log(data);
          
          Swal.fire("Success","Quiz Added SuccessFully",'success');
          this.quizData = {
            title : '',
            description : '',
            maxMarks : '',
            numberOfQuestions : '',
            active : true,
            category : {
              cid : '',
            }
          }

        },(error:any)=>{
          console.log(error);
          Swal.fire("Error !! ","Error in Adding Quiz ",'error');
        }
      )
    }
    
  }

