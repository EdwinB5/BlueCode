import { Component } from '@angular/core';
import { NavigationButton } from '@models/navigation.model';

@Component({
  selector: 'app-navbar-vertical',
  templateUrl: './navbar-vertical.component.html',
  styleUrls: ['./navbar-vertical.component.css']
})
export class NavbarVerticalComponent {
  navigationButtons: NavigationButton[] = [
    { link: '', label: 'Home', section: undefined },
    { link: 'about', label: 'About us', section: 'about-us' },
    { link: 'about', label: 'Mission', section: 'mission' },
    { link: 'about', label: 'Vision', section: 'vision' },
    { link: 'politics', label: 'Politics', section: undefined },
    { link: 'contact', label: 'Contact us', section: undefined },
    { link: 'our-services', label: 'Our services', section: undefined },
  ];

}
