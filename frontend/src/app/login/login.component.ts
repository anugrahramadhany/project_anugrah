
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  // loginUsername = "Sign in"
  // logout = "Logout"
  // visible = false
  username : string;
  password : string;

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {

    
  }



  login(f: NgForm) {
    
    let obj = {
      username : f.value.username,
      password : f.value.password
    }
         
    
  
          let header = new Headers({ "Content-Type": "application/json" });
          let options = new RequestOptions({ headers: header });
    
          this.http.post("http://localhost:3000/api/writer/login", obj, options)
            .subscribe(
            result => {
              
              console.log(result.json())
              console.log(obj.username);
              sessionStorage.setItem("username", obj.username);
              sessionStorage.setItem("token", result.json().token)
              this.route.navigate(['/dashboard']);
            },
            error => {
              
              console.log("User Not Found");
            }
            )
    
        }
      


      // logoutButton(){
      //   sessionStorage.removeItem("username")
      //   sessionStorage.removeItem("token")
       
    
      //   localStorage.removeItem("username")
      //   localStorage.removeItem("token")
        
    
      //   console.log(this.loginUsername)
      //   this.loginUsername = "Sign in"
      //   this.visible = false
      // }

    }