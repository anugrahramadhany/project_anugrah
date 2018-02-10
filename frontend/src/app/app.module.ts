import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule,Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { ArticledetailComponent } from './articledetail/articledetail.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CreatepostComponent,
    ArticledetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'dashboard',component:DashboardComponent},
      {path:'edit',component:EditComponent},
      {path:'articledetail/:id',component:ArticledetailComponent},
      {path:'createpost',component:CreatepostComponent}  
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
