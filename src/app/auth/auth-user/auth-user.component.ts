import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
selector: 'app-login',
standalone: false,
templateUrl: './auth-user.component.html',
styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent {
loginForm: FormGroup;
errorMessage = signal<string | null>(null);

constructor(
  private authService: AuthService,
  private router: Router,
  private fb: FormBuilder
) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

onLogin() {
  if (this.loginForm.invalid) {
    return; 
  }

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe(
    (response) => {
      this.authService.setToken(response.token);
      this.router.navigate(['/']);
    },
    () => {
      this.errorMessage.set('Invalid credentials. Please try again.');
    }
  );
}

get formControls() {
  return this.loginForm.controls;
}
}
