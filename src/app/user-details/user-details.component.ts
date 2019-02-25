import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userData: any = [];
  public loadUpdateData: any = [];
  
  constructor(private userService: UserService,
    private _route: Router) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(
      response => {this.userData = response},
      (error) => console.log(error)
      );
  }

loadData(id: any) {
  this.userService.loadCompanyData(id)
  .subscribe(
    response => {this.loadUpdateData = response},
    (error) => console.log(error)
    );
}

  onEdit(id: any) {
    this.userService.editData(this.loadUpdateData,id)
    .subscribe(
      response => this.loadUpdateData = response,
      error => console.log(error)
    );
    $("#updateModal").modal("hide");
  }

  onDelete(id: any) {
    this.userService.deleteData(id).subscribe();
  }
}
