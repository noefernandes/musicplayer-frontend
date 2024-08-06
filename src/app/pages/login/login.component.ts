import { Component, inject } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

    setTimeout(() => {
      this.loading = false;
    }, 2000)
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
