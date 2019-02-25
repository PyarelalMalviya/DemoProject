import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loginToken: any;
  login: string = 'QpwL5tke4Pnpja7X';

  constructor(
    private userService: UserService,
    private _route: Router,
    ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'usubmit': new FormControl()
     // 'remember': new FormControl('yes')
    });
  }

  onSubmit() {
    this.userService.loginUser(this.signinForm.value)
    .subscribe(
      response => {this.loginToken = response
         if(this.login==this.loginToken.token) {
          this._route.navigate(['/userDetails']);
          localStorage.setItem("token", this.loginToken.token)
         }
        },
      (error) => console.log(error)
    );
  }
}
