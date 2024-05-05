import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IApplication } from "../interfaces/application.interface";

@Injectable({ providedIn: 'root' })
export class ApplicationService {

  constructor(
    private readonly http: HttpClient
  ) {}

  sendApplication(application: IApplication) {
    return this.http.post('https://formspree.io/f/mgejjapy', application);
  }
}