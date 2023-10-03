import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsmobile from 'src/aws-exports';

Amplify.configure(awsmobile);
@Component({
  selector: 'swp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shop Writer Pro';
}
