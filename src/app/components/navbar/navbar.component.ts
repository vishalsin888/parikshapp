import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login : LoginService) { }

  isLoggedIn = false;
  user : any = null;

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(
    (data)=>{
      console.log("user >> "+data);
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    },(error)=>{
      console.log("user error >> "+error);
    }
    )
  }

  public logout(){
    this.login.logout();
    window.location.reload();
    //this.login.loginStatusSubject.next(false);
  }

}
