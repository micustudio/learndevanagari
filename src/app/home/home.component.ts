import { Component, OnInit } from '@angular/core';

import { MetaService } from '../meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  twitterFollowers: number = 0;

  constructor(private metaService: MetaService) { }

  ngOnInit() {
    console.log("GOOD MORNING from HOME! Initialize the home component for service use.");
        this.metaService.getTwitterFollowers().subscribe(
                (twitterFollowers: number) => {
                    this.twitterFollowers = twitterFollowers;
                }
        );
  }

}
