import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

interface User {
  id: Number;
  first_name: String;
  last_name: String;
  email: String,
  password: String,
  phone: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  userLoggedIn: boolean = false;
  userArray: any[] = [];
  isResultLoaded: boolean = false;
  isUpdateFormActive: boolean = false;
  isPasswordIncorrect: boolean = false;
  isEmailNotExists: boolean = false;
  users: User[] = [];
  allEmails = new Set();

  first_name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";
  currentUserID: string = "";
  
  constructor(private http: HttpClient, private router: Router){
    this.loadUsers();
  }

  show(){
    console.log(this.users);
    console.log(this.allEmails);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<{status: boolean, data: User[]}>('http://localhost:8090/api/users').pipe(map(response => response.data));
  }
  loadUsers(): void {
    this.getAllUsers().subscribe((data: User[]) => {
        this.users = data;
        this.users.forEach(user => {
          this.allEmails.add(user.email);
        })
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }
  login(event: Event){
    console.log(this.email);
    console.log(this.password);
    event.preventDefault();
    if (this.allEmails.has(this.email)){
      const user = this.users.find(user => user.email.trim().toLowerCase() === this.email.trim().toLowerCase());
      if (user){
        if (user.password === this.password){
          console.log("Login successful");
          alert("You logged in successfully!");
          this.userLoggedIn = true;
          this.router.navigate(['/app']);
        } else {
          this.isPasswordIncorrect = true;
          console.log("Password is incorrect!");
        }
      } else {
        console.log("User not found");
      }
    } else {
      this.isEmailNotExists = true;
      console.log("Email does not exists");
    }
  }
}
