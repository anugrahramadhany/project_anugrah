import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { Http, Headers, RequestOptions } from "@angular/http"


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
  }
 
  emptyfield


  register(f: NgForm) {

    if (f.value.username != null && f.value.username != "" && f.value.password != null && f.value.password != "" && f.value.email != null && f.value.email != "" && f.value.firstname != "" && f.value.firstname != null && f.value.lastname != "" && f.value.lastname != null) { 

      let obj = {
        username: f.value.username,
        password: f.value.password,
        firstname: f.value.firstname,
        lastname: f.value.lastname,
        email: f.value.email

      }

      let header = new Headers({"Content-Type" : "application/json"})
      let options = new RequestOptions({ headers: header })

      this.http.post("http://localhost:3000/api/writer/register", obj, options)
        .subscribe(
        result => {
          this.route.navigate(['/login'])
        },
        error => {
          console.log(error)
        }
        )
    }

  
   else{
      console.log("Field cannot be empty")
      this.emptyfield = "Field cannot be empty"
    }




  }



}