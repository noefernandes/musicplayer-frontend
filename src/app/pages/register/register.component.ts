import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Validation from '../../utils/validation';
import { AuthService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';
import { AlertType } from '../../models/alert-type';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, RouterLink, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  logoPath = 'assets/logo.png';
  submitted: boolean = false;
  loading: boolean = false;

  alertType: AlertType | null = null;
  showAlert: boolean = false;

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl('')
  });

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  subscription!: Subscription;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        username: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(40)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        confirmedPassword: ['', [Validators.required]]
      },
      {
        validators: [Validation.match('password', 'confirmedPassword')]
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    if(this.form.invalid) {
      return;
    }

    this.subscription = this.authService.registerUser(
      this.form.value.fullname,
      this.form.value.username, 
      this.form.value.password)
      .subscribe({
        next: () => {
          this.loading = false;
          this.submitted = false;
          this.form.reset();
          this.alertType = AlertType.SUCCESS;
        },
        error: () => {
          this.loading = false;
          this.submitted = false;
          this.alertType = AlertType.DANGER;
        }
      }
    );

    this.alertType = null;
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
