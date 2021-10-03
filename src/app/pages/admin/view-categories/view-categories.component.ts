import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

categories : any  = [];
 
  constructor(private category : CategoryService) { }

  ngOnInit(): void {
    this.category.categories().subscribe(
    (data:any)=>{
      this.categories = data;
      console.log(this.category);
      
    },(error)=>{
      console.log('error');
      console.log(error);
      Swal.fire("Error !! ", 'Error in Loading Category Data' , 'error');
      
    }
    )
  }

  //delete category
  deleteCategory(){
    Swal.fire({
      'icon' : 'info',
      'title' : "Are You Sure ?",
      confirmButtonText : 'Delete',
      showCancelButton : true,
 
    }).then(
      (result)=>{
        if(result.isConfirmed){
         //delete is clicked in Swal for category
        
        }
      }
    )
 
   }

}
