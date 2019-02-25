import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  newData:any = {
    company_name:'',
    company_website:''
  }

  constructor(private userService: UserService,
    private _route: Router
    ) { }

  ngOnInit() {
  }

  onAdd() {
    this.userService.addData(this.newData)
    .subscribe(
      response => {this.newData = response},
      error => console.log(error)
    );
    alert('Data Added succsessfully.');
    this._route.navigate(['/userDetails']);
  }

}
