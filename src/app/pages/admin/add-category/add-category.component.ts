import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title : '',
    description : '',
  }
  constructor(private _category:CategoryService,
    private snack:MatSnackBar,) { }

  ngOnInit(): void {
  }

  categoryFormSubmit(){
    if(this.category.title.trim() == '' || this.category.title.trim() ==null){
      this.snack.open("Title Required !! ",'',{
        duration:1000,
      });
      return;
    }

    this._category.addcategory(this.category).subscribe(
      (data:any)=>{
        //this.category = data;
        console.log(this.category);
        console.log('cat added');
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !! ","Category Added Successfully", 'success');

      },(error)=>{
        console.log(error);
        console.log('cat not added');
        this.snack.open("Category Can not be Added !! ",'',{
          duration:1000,
        });
      }
    )
  }

}
