import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AdminService } from "../admin.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AdminService,
                private router: Router) {}
  ngOnInit() {
  }

    onLogout(){
        this.authService.logout();
        this.router.navigate(['/admin', 'signin']);
    }

}
