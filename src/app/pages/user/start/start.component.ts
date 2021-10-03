import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId :any;
  questions : any ;
  qlength :any = 0;
  marksGot = 0;
  correctAnswers = 0;
  attemted = 0;
  isSubmit = false;
  timer :any;


  constructor(private locStrategy : LocationStrategy,
    private questns :QuestionService,
    private route:ActivatedRoute,
    // private router: Router
    ) { }

  ngOnInit(): void {
    this.preventbackButton();
    this.qId = this.route.snapshot.params.qid;
    this.loadQuestions();
  }

  loadQuestions(){
    this.questns.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data : any)=>{
        console.log(data);
        this.questions=data;
        this.qlength = this.questions.length;
        this.timer = this.questions.length*2*60;
        this.startTimer();
      },(error)=>{
        console.log(error);
        Swal.fire("Error","Error In Loading Questions Of this Quiz",'error');
      }
    )
  }

  submitQuiz(){
    Swal.fire({
      icon : 'info',
      title : 'Do You Want to Submit ?',
      showCancelButton :true,
      confirmButtonText : 'Submit',
      }).then(
        (result:any)=>{
          if(result.isConfirmed){
           this.evalQuiz();
            //this.router.navigate(['/start/'+this.qId]);
          }
          else{

          }
        }
      )

  }
  evalQuiz(){
    this.isSubmit =  true;
    //calculations
    console.log(this.questions);
    this.questions.forEach((q:any) => {
      if(q.givenAnswer == q.answer){
        this.correctAnswers ++;
        let singleMarks = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += singleMarks;
      }
      if(q.givenAnswer != null || q.givenAnswer != undefined){
        if(q.givenAnswer.trim() != ''){
          this.attemted ++;
        }
      }
    });
    console.log("ca"+this.correctAnswers + 'mg'+this.marksGot+ 'at'+this.attemted);
    
  }

  startTimer(){
   let t = setInterval(
     ()=>{
       if(this.timer<=0){
        this.evalQuiz();
         clearInterval(t);
       }else{
         this.timer--;
       }
     },1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} Min : ${ss} Sec`;

  }

  // prevent back button or disable back button 
  preventbackButton(){
    history.pushState(null , '' , location.href);
    this.locStrategy.onPopState(
      ()=>{
        history.pushState(null,'',location.href);
      });
  }

}
