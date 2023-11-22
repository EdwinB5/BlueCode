import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LoaderComponentService } from '@services/loader-component.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  constructor(public authService: AuthService,
    public loaderService: LoaderComponentService,) {

  }

  ngOnInit(): void {
    this.loaderService.runLoader(2500, () => {
      console.log('Modify loading...');
    });
  }

}
