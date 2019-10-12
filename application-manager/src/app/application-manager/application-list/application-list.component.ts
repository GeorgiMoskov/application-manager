import { Component, OnInit } from '@angular/core';
import { IApplication } from 'src/app/_models/application.model';
import { Communication } from 'src/app/_models/communication.enum';
import { EnglishLevel } from 'src/app/_models/english-level.enum';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  public applications: IApplication[] = [];

  constructor() {}

  ngOnInit() {
    this.applications.push({
      id: 0,
      name: 'Georgi',
      email: 'moskov120@abv.bg',
      age: 23,
      phone: '0876663015',
      preferredCommunication: Communication.email,
      englishLevel: EnglishLevel.B2,
      availableToStart: new Date(),
      technicalSkillsAndCourses: 'javascript and html',
      shortPersonalPresentation: 'Im cool',
      studyFromHome: true
    });

    this.applications.push({
      id: 1,
      name: 'Georgi',
      email: 'moskov120@abv.bg',
      age: 23,
      phone: '0876663015',
      preferredCommunication: Communication.email,
      englishLevel: EnglishLevel.B2,
      availableToStart: new Date(),
      technicalSkillsAndCourses: 'javascript and html',
      shortPersonalPresentation: 'Im cool',
      studyFromHome: true
    });

    this.applications.push({
      id: 2,
      name: 'Georgi',
      email: 'moskov120@abv.bg',
      age: 23,
      phone: '0876663015',
      preferredCommunication: Communication.email,
      englishLevel: EnglishLevel.B2,
      availableToStart: new Date(),
      technicalSkillsAndCourses: 'javascript and html',
      shortPersonalPresentation: 'Im cool',
      studyFromHome: true
    });
  }
}
