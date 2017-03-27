import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routing } from "./app.routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin-module/admin/admin.component';

import { AdminService } from './admin-module/admin.service';
import { MetaService } from './meta.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';

import { ItemModule } from "./item-module/item.module";
import { UserModule } from "./user-module/user.module";
import { StudyComponent } from './study/study.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LearnComponent } from './learn/learn.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    AdminComponent,
    StudyComponent,
    DashboardComponent,
    ProfileComponent,
    LearnComponent,
    ProfileEditComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Routing,
    ItemModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
        AdminService,
        MetaService,
        UserService,
        AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
