import { Component, OnInit } from '@angular/core';
import { IApplication } from 'src/app/_models/application.model';
import { ApplicationService } from '../application.service';
import { ApplicationModal } from 'src/app/_models/application-modal.enum';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  public applications: IApplication[] = [];
  public showApplicationModal: boolean = false;
  public applicationInAction: IApplication;
  public applicationInActionType: ApplicationModal;

  constructor(private applicationManager: ApplicationService) {}

  ngOnInit() {
    this.applicationManager.$applications.subscribe((data: IApplication[]) => {
      this.applications = data;
    });
  }

  public onAddClick() {
    this.applicationInAction = null;
    this.applicationInActionType = ApplicationModal.add;
    this.showApplicationModal = true;
  }

  public onModalApplicationData(application: IApplication) {
    this.showApplicationModal = false;
    if (this.applicationInActionType == ApplicationModal.add) {
      this.applicationManager.addApplication(application).subscribe();
    }

    if (this.applicationInActionType == ApplicationModal.edit) {
      this.applicationManager.updateApplication(application).subscribe();
    }
  }

  public onViewClick(application: IApplication) {
    this.applicationInAction = application;
    this.applicationInActionType = ApplicationModal.view;
    this.showApplicationModal = true;
  }

  public onEditClick(application: IApplication) {
    this.applicationInAction = application;
    this.applicationInActionType = ApplicationModal.edit;
    this.showApplicationModal = true;
  }

  public onEditA;

  public onDeleteClick(application: IApplication) {
    this.applicationManager.deleteApplication(application.id).subscribe();
  }
}
