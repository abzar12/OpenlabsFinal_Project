import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: "./app.css"
})
export class App {

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        let route = this.router.routerState.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        const data = route.snapshot.data;

        if (data?.['title']) {
          this.title.setTitle(data['title']);
        }
        if (data?.['description']) {
          this.meta.updateTag({
            name: 'description',
            content: data['description']
          });
        }
      });
  }
}