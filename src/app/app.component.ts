import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend_bocaCheia';

  constructor(
    private sanitizer : DomSanitizer,
  ) { }

  getSafeHtml ( html : string ) { return this.sanitizer.bypassSecurityTrustHtml ( html ); }
}
