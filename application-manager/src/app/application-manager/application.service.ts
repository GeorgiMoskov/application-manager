import { Injectable } from '@angular/core';
import { ApplicationManagerModule } from './application-manager.module';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError, flatMap } from 'rxjs/operators';
import { IApplication } from '../_models/application.model';
import { ICreateApplication } from '../_models/createApplication.model';

@Injectable({
  providedIn: ApplicationManagerModule
})
export class ApplicationService {
  private $applicationsSubject: BehaviorSubject<IApplication[]>;
  public $applications: Observable<IApplication[]>;
  constructor() {
    this.$applicationsSubject = new BehaviorSubject([]);
    this.$applications = this.$applicationsSubject.asObservable();
    this.initApplications();
  }

  private initApplications(): void {
    this.getApplicationsFromLocalStorage().subscribe(
      (applications: IApplication[]) => {
        if (applications) {
          this.$applicationsSubject.next(applications);
        }
      }
    )
  }

  public updateApplication(application: IApplication): Observable<IApplication[]> {
    const $updatedApplications = this.getApplicationsFromLocalStorage().pipe(
      tap((data: IApplication[]) => {
        if(!data.length) {
          throw new Error('ApplicationService: updateApplication() => the application that you trying to update does not exist!');
        }
      }),
      map((data: IApplication[]) => {
        const newData = data.map((item: IApplication) => {
          if (item.id == application.id) {
            return application;
          }
          return item;
        })
        return of(newData);
      }),
      catchError((err: Error) => {
        console.error(err.message);
        return of([]);
      })
    );

    return $updatedApplications.pipe(
      flatMap((data: IApplication[]) => {
        return this.setApplicationsInLocalStorage(data);
      }),
      tap((data: IApplication[])=>{
        this.$applicationsSubject.next(data);
      }));
  }

  createApplication(application: ICreateApplication): void {
    const newId = this.getUniqueIdFromLocalStorage();
    const newApplication: IApplication = Object.create(application);
    newApplication.id = newId;

    this.addNewApplicationToLocalStorage(newApplication);

    const newApplications: IApplication[] = [newApplication];

    this.$applicationsSubject.next(newApplications);
  }

  private getUniqueIdFromLocalStorage(): number {
    let id: string = localStorage.getItem('id');
    if (id) {
      localStorage.setItem('id', String(Number(id) + 1));
      return Number(id);
    }
    return Number(this.setUniqueIdInLocalStorage());
  }

  private setUniqueIdInLocalStorage(): string {
    const newId: string = String(0);
    localStorage.setItem('id', newId);
    return newId;
  }

  private getApplicationsFromLocalStorage(): Observable<IApplication[]> {
    const applications: IApplication[] =
      <IApplication[]>JSON.parse(localStorage.getItem('applications')) || [];
    console.log('getApplicationsFromLocalStorage(): applications = ', applications);
    return of(applications);
  }

  private setApplicationsInLocalStorage(applications: IApplication[]): Observable<IApplication[]> {
    localStorage.setItem('applications', JSON.stringify(applications));
    return of(applications);
  }

  private addNewApplicationToLocalStorage(application: IApplication): void {
    this.getApplicationsFromLocalStorage().pipe(
      map((data: IApplication[]) => {
        data.push(application);
        return this.setApplicationsInLocalStorage(data);
      })
    )
  }
}
