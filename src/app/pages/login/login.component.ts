import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logindata ={
    username : '',
    password : '',
  }
  constructor(private snack :MatSnackBar, private login:LoginService,private router : Router,) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("login btn clicked");
    if(this.logindata.username.trim() == null || this.logindata.username ==''){
      this.snack.open("Username required !!",'',{
        duration :1000,
      });
      return;
    }
    if(this.logindata.password.trim() == null || this.logindata.password ==''){
      this.snack.open("Password required !!",'',{
        duration :1000,
      });
      return;
    }

    //request to server to generate token

    this.login.generateToken(this.logindata).subscribe(
    (data : any) =>{
      this.login.loginUser(data.token);
      console.log('success token data >> '+data.token);
      //login here to navigate
      
      this.login.getCurrentUser().subscribe(
        (user :any)=>{
          this.login.setUser(user);
          console.log("in sub  >> "+user);
          //redirecting based on user role either admin or user
          if(this.login.getUserRole() == "ADMIN"){
            console.log("user >> "+this.login.getUserRole());
            
            // redirect to admin
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          }else if(this.login.getUserRole() == "NORMAL"){
            console.log("user >> " + this.login.getUserRole());
            // redirect to user
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);
          }else{
            // else logout
            console.log("NO ROLE FOUND");
            this.login.logout();
          }
        },(error)=>{
          console.log('error in getting token');
          console.log(error);
          this.snack.open("Invalid Details !! Try Again",'',{
            duration:1000,
          });
          
        }
      ) 
    },(error) =>{
      console.log('error');
      console.log(error);

    }
  );
  }

  //form submit ends

}
