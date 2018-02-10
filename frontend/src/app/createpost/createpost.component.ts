import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  file: File;
  username
  constructor(private http: Http, private route: Router) { }

  ngOnInit() {

    const token = sessionStorage.getItem("token");
    console.log(token);
    if (!token) {
      //redirect to login
      this.route.navigate(['/login']);
    } else {
      let header = new Headers({ "Authorization": "Bearer " + token });
      let options = new RequestOptions({ headers: header });
      console.log(header)

      this.http.post("http://localhost:3000/api/validatetoken", {}, options)
        .subscribe(
        result => {

        },
        error => {
          sessionStorage.removeItem("token")
          this.route.navigate(['/login']);
        }
        );
    }

  }



  fileChange($event) {
    this.file = $event.target.files[0];
  }

  submit(f: NgForm) {
    if (f.value.title != "" && f.value.title != null && f.value.excerpt != "" && f.value.excerpt != null && f.value.story != "" && f.value.story != null && this.file != null) {
      let formData = new FormData();
      formData.append("title", f.value.title);
      formData.append("excerpt", f.value.excerpt);
      formData.append("story", f.value.story);
      formData.append("articleImage", this.file);

      let token = sessionStorage.getItem("token");
      let header = new Headers({ "Authorization": "Bearer " + token });
      let options = new RequestOptions({ headers: header });

      this.http.post("http://localhost:3000/api/article", formData, options)
        .subscribe(
        result => {
          console.log(result.json());
          this.route.navigate(['/dashboard']);
          f.reset();
        },
        error => {
          console.log(error);
        }
        )
    } else {


    }
  }






  

  // upload(){

  //       let formData = new FormData();
  //       formData.append("articleImage", this.file);
  //       formData.append("name", "Employee 1");
  //       formData.append("address", "Address 1");

  //       let header = new Headers();
  //       let options = new RequestOptions({ headers : header });

  //       this.http.post("http://localhost:3000/upload", formData, options)
  //       .subscribe(
  //         result => {
  //           console.log(result.json());
  //           this.imagePath = result.json().path;
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //       );

  //     }

}
