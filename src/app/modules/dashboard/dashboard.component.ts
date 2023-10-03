import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LoaderComponentService } from '@services/loader-component.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, private loaderService: LoaderComponentService) {}

  ngOnInit(): void {
    this.loaderService.hideLoader();
  }

}