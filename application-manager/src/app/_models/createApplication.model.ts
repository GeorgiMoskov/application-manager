import { Communication } from './communication.enum';
import { EnglishLevel } from './english-level.enum';

export interface ICreateApplication {
  name: string; //text, required
  email: string; //text, required
  age: number; //number, required
  phone: string; //Number - text, required
  preferredCommunication: Communication; //radio buttons for Email and Phone, required
  englishLevel: EnglishLevel; // select with options, required
  availableToStart: Date; //date, required
  technicalSkillsAndCourses?: string; // text
  shortPersonalPresentation?: string; // text
  studyFromHome?: boolean; // checkbox
}