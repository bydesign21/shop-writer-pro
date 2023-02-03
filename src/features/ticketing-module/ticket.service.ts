import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }
}
