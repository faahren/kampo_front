import { Team } from './team.entity';

export class User {
  id: number;
  email: string;
  team: Team;
  
  constructor(id: number, email: string, team: Team){
    this.id = id;
    this.email = email;
    this.team = team;
  }
}