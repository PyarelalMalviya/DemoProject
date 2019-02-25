import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') signupForm: NgForm;
  regToken: any;
  regKey: string = 'QpwL5tke4Pnpja7X';

  constructor(private userService: UserService,
    private _route: Router
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    return this.userService.userReg(this.signupForm.value)
    .subscribe(
      response => {this.regToken = response
      if(this.regKey==this.regToken.token)
        this._route.navigate(['/userDetails']);},
        (errors) => console.log(errors)
    )
  }

}
