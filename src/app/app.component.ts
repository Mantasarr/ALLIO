import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  status: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ALLIO';

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Home",
      status: true
    },
    {
      link: "/alerts",
      icon: "info",
      menu: "Nouvelle Campagne",
      status: false
    },
    {
      link: "/grid-list",
      icon: "file-text",
      menu: "Prospectus",
      status: false
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Bon De Reduction",
      status: false

    },
    {
      link: "/expansion",
      icon: "divide-circle",
      menu: "Parametres",
      status: false

    },
  ]

}
