import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: Number;
  first_name: String;
  last_name: String;
  email: String,
  password: String,
  phone: String;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = "";
  password: string = "";
  phone: string = "";
  users: User[] = [];
  allEmails = new Set();
  baseUrl = 'http://localhost:8090/api/';
  isEmailNotExists: boolean = false;
  
  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
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

  show(){
    console.log(this.users);
    console.log(this.allEmails);
  }

  getUserDetails(email: string): Observable<User> {
    return this.http.get<{status: boolean, data: User[], message?: string}>(`${this.baseUrl}users/${email}`).pipe(
      map(response => {
        if (response.status && response.data.length > 0) {
          return response.data[0];
        } else {
          throw new Error(response.message || 'No user found');
        }
      })
    );
  }

  update(event: Event): void {
    event.preventDefault();
    console.log(this.email, this.password);

    if (this.allEmails.has(this.email)) {
      console.log("Email is registered.");
      this.getUserDetails(this.email).subscribe({
        next: (user) => {
          const userDetails = {
            first_name: user.first_name,
            last_name: user.last_name,  
            password: this.password,  
            phone: this.phone       
          };
          this.http.put<any>(`${this.baseUrl}users/update/${this.email}`, userDetails).subscribe({
            next: (response) => {
              console.log("Password updated successfully", response);
              alert("Your password has been updated successfully!");
              this.resetFormFields();
              this.loadUsers();
              this.router.navigate(['/login']);
            },
            error: (error) => {
              console.error("Error updating password", error);
            }
          });
        },
        error: (error) => {
          console.error("Error fetching user details", error);
          alert(error.message);
        }
      });
    } else {
      this.isEmailNotExists = true;
    }
  }

  resetFormFields(): void {
    this.email = "";
    this.password = "";
    this.phone = "";
  }
}
