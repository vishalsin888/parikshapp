import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  //public Editor = ClassicEditor;

  qId : any;
  title : any;

  question = {
    quiz : {
      qId : '',
    },
    content : '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    answer : '',
  };
  constructor(private route : ActivatedRoute,
    private _ques : QuestionService,
    private snack : MatSnackBar,
    ) { }

  ngOnInit(): void {

    this.qId = this.route.snapshot.params.qid;
    this.title = this.route.snapshot.params.title;
    console.log(this.qId + ' -- '+ this.title);
    this.question.quiz['qId'] = this.qId;
        
  }

  submitQuestion(){
   
    if(this.question.content.trim() == '' || this.question.content.trim() == null){
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer.trim() == null){
      return;
    }
    this._ques.addQuestion(this.question).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire("Success  ","Question Added to Quiz","success");
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },(error)=>{
        console.log(error);
        Swal.fire("Error !! ","Error in Adding Question ","error");
      }
    )

}
}
