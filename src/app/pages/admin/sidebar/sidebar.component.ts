import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private login : LoginService,) { }

  ngOnInit(): void {
  }

  //logout
  logout(){
    Swal.fire({
      'icon' : 'info',
      'title' : 'Are You Sure To Logout ?',
      confirmButtonText : 'Logout',
      showCancelButton : true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.login.logout();
      }
    }
    )
   
  }

}
