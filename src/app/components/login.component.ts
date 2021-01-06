import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isValid = true;
  
  constructor(
    private fb: FormBuilder,
    private loginServ: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('', [ Validators.required ]),
      password: this.fb.control('', [ Validators.required ])
    });
  }

  async onLogin() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.isValid = await this.loginServ.login(username, password);
    this.router.navigate(['/main']);
  }
}
