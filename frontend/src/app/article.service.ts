import { Injectable } from '@angular/core';
import {  Http } from "@angular/http";
@Injectable()
export class ArticleService {

  constructor(private http:Http) { }


  getarticleList(){

    return this.http.get("http://localhost:3000/api/article/")
  }

  getarticle(id){
    return this.http.get("http://localhost:3000/api/article/"+id)
  }

}
