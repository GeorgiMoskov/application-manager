import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError, flatMap, take } from 'rxjs/operators';
import { IApplication } from '../_models/application.model';

@Injectable({
  providedIn: 'root'
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
    this.getApplicationsFromLocalStorage().subscribe((applications: IApplication[]) => {
      if (applications.length) {
        this.$applicationsSubject.next(applications);
      }
    });
  }

  public updateApplication(application: IApplication): Observable<IApplication[]> {
    return this.updateApplicationInLocalStorage(application).pipe(
      tap((data: IApplication[]) => {
        this.$applicationsSubject.next(data);
      })
    );
  }

  public addApplication(application: IApplication): Observable<IApplication[]> {
    return this.getUniqueIdFromLocalStorage().pipe(
      map(
        (id: number): IApplication => {
          const newApplication: IApplication = { ...application };
          newApplication.id = id;
          return newApplication;
        }
      ),
      flatMap(
        (newApplication: IApplication): Observable<IApplication[]> => {
          return this.addNewApplicationToLocalStorage(newApplication);
        }
      ),
      tap((data: IApplication[]) => {
        this.$applicationsSubject.next(data);
      })
    );
  }

  public deleteApplication(id: number): Observable<IApplication[]> {
    return this.deleteApplicationInLocalStorage(id).pipe(
      tap((data: IApplication[]) => {
        this.$applicationsSubject.next(data);
      })
    );
  }

  private getUniqueIdFromLocalStorage(): Observable<number> {
    let id: string = localStorage.getItem('id');
    if (!id) {
      return this.setUniqueIdInLocalStorage().pipe(
        tap((id: number) => {
          localStorage.setItem('id', String(Number(id) + 1));
        })
      );
    }
    localStorage.setItem('id', String(Number(id) + 1));
    return of(Number(id));
  }

  private setUniqueIdInLocalStorage(): Observable<number> {
    const id: number = 0;
    localStorage.setItem('id', String(id));
    return of(id).pipe(take(1));
  }

  private getApplicationsFromLocalStorage(): Observable<IApplication[]> {
    const applications: IApplication[] =
      <IApplication[]>JSON.parse(localStorage.getItem('applications')) || [];
    return of(applications).pipe(take(1));
  }

  private updateApplicationInLocalStorage(application: IApplication): Observable<IApplication[]> {
    const $updatedApplications = this.getApplicationsFromLocalStorage().pipe(
      tap((data: IApplication[]) => {
        if (!data.length || !data.find((item: IApplication) => item.id == application.id)) {
          throw new Error(
            'ApplicationService: updateApplication() => the application that you trying to update does not exist!'
          );
        }
      }),
      map((data: IApplication[]) => {
        const newData = data.map((item: IApplication) => {
          if (item.id == application.id) {
            return application;
          }
          return item;
        });
        return newData;
      }),
      flatMap((data: IApplication[]) => {
        return this.setApplicationsInLocalStorage(data);
      }),
      catchError((err: Error) => {
        console.error(err.message);
        return of([]);
      })
    );

    return $updatedApplications;
  }

  private deleteApplicationInLocalStorage(id: number): Observable<IApplication[]> {
    return this.getApplicationsFromLocalStorage().pipe(
      map((data: IApplication[]) => {
        return data.filter((item: IApplication) => {
          return item.id != id;
        });
      }),
      flatMap((data: IApplication[]) => {
        return this.setApplicationsInLocalStorage(data);
      })
    );
  }

  private setApplicationsInLocalStorage(applications: IApplication[]): Observable<IApplication[]> {
    localStorage.setItem('applications', JSON.stringify(applications));
    return of(applications);
  }

  private addNewApplicationToLocalStorage(application: IApplication): Observable<IApplication[]> {
    return this.getApplicationsFromLocalStorage().pipe(
      flatMap((data: IApplication[]) => {
        data.push(application);
        return this.setApplicationsInLocalStorage(data);
      })
    );
  }
}
