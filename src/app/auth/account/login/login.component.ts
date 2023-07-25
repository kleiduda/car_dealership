import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm2!: FormGroup;
  formSubmitted: boolean = false;
  loading: boolean = false;
  returnUrl: string = '/';
  error: string = '';
  showPassword: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.loginForm2 = this.fb.group({
      email: ['kleitonsfreitas@gmail.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages';
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() { return this.loginForm2.controls; }


  /**
   * On submit form
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm2.valid) {
      this.loading = true;
      this.authenticationService.login(this.formValues.email?.value, this.formValues.password?.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.router.navigate([this.returnUrl]);
          },
          (error: any) => {
            this.error = error;
            this.loading = false;
          });
    }
  }

}
