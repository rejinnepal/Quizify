import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userRegistered: boolean = false;
  isResultLoaded: boolean = false;
  isUpdateFormActive: boolean = false;
  alreadyRegistered: boolean = false;
  allUsers$!: Observable<any[]>;
  allEmails = new Set();
  users: User[] = [];

  first_name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";
  currentUserID: string = "";

  constructor(private http: HttpClient, private router: Router) {
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


  register(event: Event){
    event.preventDefault();
    if (this.allEmails.has(this.email)){
      this.alreadyRegistered = true;
    }
    else {
      let bodyData = {
        "first_name": this.first_name,
        "last_name": this.last_name,
        "email": this.email,
        "password": this.password,
        "phone": this.phone
      };

      this.http.post("http://localhost:8090/api/users/add", bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert("You are successfully registered");
        this.loadUsers();
      });
      this.userRegistered = true;
      this.router.navigate(['/login']);
    }
  }

}
