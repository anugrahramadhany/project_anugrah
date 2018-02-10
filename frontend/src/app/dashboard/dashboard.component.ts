import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute } from "@angular/router";


import { ArticleService } from "../article.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articleList = [];
  writername
  writerList = [];
  firstname
  username
  lastname

  constructor(private http: Http ,private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {

    const token = sessionStorage.getItem("token");
    if (!token) {
      this.route.navigate(['/']);
    }
    else {
      console.log(token);
      let header = new Headers({ "Authorization": "Bearer " + token });
      let options = new RequestOptions({ headers: header });
      this.http.post("http://localhost:3000/api/validatetoken", {}, options)
        .subscribe(
        result => {

        },
        error => {
          sessionStorage.removeItem("token");
          this.route.navigate(['/']);
        }
        )
    }
    // 
    

    this.loadarticleList();
    this.loadSessionwriter()
  }

  loadSessionwriter() {
    let token = sessionStorage.getItem("token");
    let header = new Headers({ "Authorization": "Bearer " + token });
    let options = new RequestOptions({ headers: header });

    console.log("ini token " + token);

    this.username = sessionStorage.getItem("username");
    // console.log(this.username);
    this.http.get("http://localhost:3000/api/writer/", options)
      .subscribe(
      result => {
        this.writerList = result.json();
        for (let i = 0; i < this.writerList.length; i++) {
          if (this.writerList[i].username == this.username) {
            this.writername = this.writerList[i].firstname;this.writerList[i].lastname

          }
        }
        // console.log(this.id);

      },
      error => {

      }
      );
  }




  loadarticleList() {

    let token = sessionStorage.getItem("token");
    let header = new Headers({ "Authorization": "Bearer " + token })
    let options = new RequestOptions({ headers: header });

    this.http.get("http://localhost:3000/api/article/", options)
      .subscribe(
      result => {
        this.articleList = result.json();
      },
      error => {

      }
      );
  }

  DeleteArticle(id){
    let header = new Headers();
    let options = new RequestOptions({ headers : header });

    this.http.delete("http://localhost:3000/api/article/" + id, options)
    .subscribe(
      result => {
        this.loadarticleList();
      },
      error => {
        console.log(error);
      }
    );
  }

}
