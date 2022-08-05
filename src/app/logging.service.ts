import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {
  lastLog: string;
  constructor() { }
  printLog(message: string){
    console.log('Current Message: ' + message);
    console.log('Last Message: ' + this.lastLog);
    this.lastLog = message;
  }
}
