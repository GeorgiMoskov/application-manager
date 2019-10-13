import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApplicationModal } from 'src/app/_models/application-modal.enum';
import { IApplication } from 'src/app/_models/application.model';

@Component({
  selector: 'app-view-edit-add-application',
  templateUrl: './view-edit-add-application.component.html',
  styleUrls: ['./view-edit-add-application.component.css']
})
export class ViewEditAddApplicationComponent implements OnInit {
  @Input() type: ApplicationModal;
  @Input() applicationData: IApplication;
  @Output() newApplicationData: EventEmitter<IApplication> = new EventEmitter();
  @Output() closeApplicationModal: EventEmitter<any> = new EventEmitter();

  name = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.required);
  age = new FormControl(null, Validators.required);
  phoneNumber = new FormControl(null, Validators.required);
  prefWayOfCommunication = new FormControl('email', Validators.required);
  englishLevel = new FormControl('A1', Validators.required);
  availableToStartOn = new FormControl(null, Validators.required);
  technicalSkillsAndCourses = new FormControl();
  shortPersonalPresentation = new FormControl();
  studyFromHome = new FormControl();

  constructor() {}

  ngOnInit() {
    if (this.type == ApplicationModal.edit || this.type == ApplicationModal.view) {
      this.name.setValue(this.applicationData.name);
      this.email.setValue(this.applicationData.email);
      this.age.setValue(this.applicationData.age);
      this.phoneNumber.setValue(this.applicationData.phone);
      this.prefWayOfCommunication.setValue(this.applicationData.preferredCommunication);
      this.englishLevel.setValue(this.applicationData.englishLevel);
      this.availableToStartOn.setValue(this.applicationData.availableToStart);
      this.technicalSkillsAndCourses.setValue(this.applicationData.technicalSkillsAndCourses);
      this.shortPersonalPresentation.setValue(this.applicationData.shortPersonalPresentation);
      this.studyFromHome.setValue(this.applicationData.studyFromHome);
    }

    if (this.type == ApplicationModal.view) {
      this.name.disable();
      this.email.disable();
      this.age.disable();
      this.phoneNumber.disable();
      this.prefWayOfCommunication.disable();
      this.englishLevel.disable();
      this.availableToStartOn.disable();
      this.technicalSkillsAndCourses.disable();
      this.shortPersonalPresentation.disable();
      this.studyFromHome.disable();
    }
  }

  public emitData() {
    const newApplication: IApplication = {
      id: this.applicationData ? this.applicationData.id || null : null,
      name: this.name.value,
      email: this.email.value,
      age: this.age.value,
      phone: this.phoneNumber.value,
      preferredCommunication: this.prefWayOfCommunication.value,
      englishLevel: this.englishLevel.value,
      availableToStart: this.availableToStartOn.value,
      technicalSkillsAndCourses: this.technicalSkillsAndCourses.value || null,
      shortPersonalPresentation: this.shortPersonalPresentation.value || null,
      studyFromHome: this.studyFromHome.value || null
    };

    this.newApplicationData.emit(newApplication);
  }

  public close() {
    this.closeApplicationModal.emit(null);
  }

  public checkAllFormControlsValidation() {
    if (!this.checkFormControlIsValid(this.name)) {
      return false;
    }
    if (!this.checkFormControlIsValid(this.email)) {
      return false;
    }
    if (!this.checkFormControlIsValid(this.age)) {
      return false;
    }
    if (!this.checkFormControlIsValid(this.phoneNumber)) {
      return false;
    }
    if (!this.checkFormControlIsValid(this.prefWayOfCommunication)) {
      return false;
    }
    if (!this.checkFormControlIsValid(this.englishLevel)) {
      return false;
    }
    if (!this.checkFormControlIsValid(this.availableToStartOn)) {
      return false;
    }
    return true;
  }

  private checkFormControlIsValid(formControl: FormControl): boolean {
    return formControl.valid;
  }
}
