import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private fb: FormBuilder){}

ngOnInit() {
  this.form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });}

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log("Form is submitted successfully");
    }
    else {
      console.log("Form is not submitted");
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
