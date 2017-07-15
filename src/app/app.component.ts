import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private _router: Router, private _meta: Meta, private _title: Title) { }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/':
            this._title.setTitle('La constituante');
            this._meta.updateTag({ name: 'Bienvenue en democratie', content: 'La constituante est une plateforme citoyenne pour redefinir une nouvelle constitution' });
            break;
          case '/about':
            this._title.setTitle('About Page');
            this._meta.updateTag({ name: 'description', content: 'About Page Description' });
            break;
        }
      }
    });
  }
}
