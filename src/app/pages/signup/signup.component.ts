import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService : UserService, private snack : MatSnackBar) { }

  public user = {
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : '',
    phone : '',
  }

  ngOnInit(): void {
  }

  formSubmit() {
   
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
     this.snack.open("Username is required", '', {
       duration:1000,
     });
      return;
    }

    //validate fields

    //calling addUser function of userService
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        Swal.fire('Success', 'UserId '+data.id+' Registered SuccessFully','success');
        console.log(data);
      },
      (error)=>{
        console.log(error);
        this.snack.open("Something went wrong !!", '', {
          duration:1000,
        });
        
      }
    ) 
  }

  resetRegistration(){
    this.user.username = '';
    this.user.password = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.phone = '';
    this.user.email = '';

  }

}
