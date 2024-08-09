import { Component, inject } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';
import AuthResponse from '../../models/auth-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  logoPath = 'assets/logo.png';
  googleIconPath = 'assets/google-icon.svg';
  facebookIconPath = 'assets/facebook-icon.svg';
  loading: boolean = false;
  submitted: boolean = false;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  subscription!: Subscription;
  
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    if(this.form.invalid) {
      return;
    }

    this.subscription = this.authService.loginUser(
      this.form.value.username,
      this.form.value.password
    ).subscribe({
      next: (data: AuthResponse) => {
        this.loading = false;
        this.submitted = false;
        this.form.reset();
      },
      error: () => {
        this.loading = false;
        this.submitted = false;
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
