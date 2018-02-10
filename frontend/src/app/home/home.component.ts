import { Component, OnInit } from '@angular/core';
import { Http,Headers,RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articleList=[]
  constructor(private http:Http,private route:Router) { }

  ngOnInit() {
    this.loadArticleList(); 
  }

  loadArticleList(){
    this.http.get("http://localhost:3000/api/article")
    .subscribe(
      result=>{
        this.articleList=result.json();
        console.log(this.articleList)
      },error =>{

      }
    )

  }

}
