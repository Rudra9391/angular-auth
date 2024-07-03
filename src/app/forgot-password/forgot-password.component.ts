import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  showOtpForm: boolean = false;
  showInputField: boolean = false;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      option: ['', Validators.required],
      emailOrPhone: ['', [Validators.required, this.emailOrPhoneValidator()]]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  onOptionChange() {
    this.showInputField = true;
    this.forgotPasswordForm.get('emailOrPhone')?.reset();
  }

  sendOtp() {
    const selectedOption = this.forgotPasswordForm.value.option;
    const emailOrPhone = this.forgotPasswordForm.value.emailOrPhone;
    console.log('Sending OTP to:', selectedOption, 'with:', emailOrPhone);
    this.showOtpForm = true;
  }

  verifyOtp() {
    console.log('Verifying OTP:', this.otpForm.value.otp);
  }

  emailOrPhoneValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (this.forgotPasswordForm && this.forgotPasswordForm.get('option')?.value === 'email') {
        if (!value || !value.includes('@')) {
          return { invalidEmail: true };
        }
      } else if (this.forgotPasswordForm && this.forgotPasswordForm.get('option')?.value === 'phone') {
        if (!value || !/^\d{10}$/.test(value)) {
          return { invalidPhoneNumber: true };
        }
      }
      return null;
    };
  }
}
