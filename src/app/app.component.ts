import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsmobile from 'src/aws-exports';
import { SessionService } from './session-store/domain-state/session.service';


Amplify.configure(awsmobile);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private sessionService: SessionService) {

  }

  ngOnInit(): void {
  }
  title = 'ShopWriterPro';
}
