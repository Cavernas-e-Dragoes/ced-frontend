import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';
import { characterCard } from 'src/app/models/characterCard';
import { Race } from 'src/app/models/race';
import { Class } from 'src/app/models/class';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit{
  
  chars: characterCard[];
  CLass!: Class;
  Race!: Race;

  constructor(
    private characterService: CharacterService,
    private route: Router
  ) {
    this.chars = []
  }

  ngOnInit() {
    this.listCharactersMock();
  }

  private listCharacters(): void {

    this.characterService.list(this.takeToken())
      .subscribe(
        data => {
          this.chars = data;
        },
        error => {
          console.log(error);
        });

  }
  private listCharactersMock(): void {
    const character1 = new characterCard(1, 'Aragorn', 'Human', 'Ranger', 12);
    const character2 = new characterCard(2, 'Gandalf', 'Wizard', 'Wizard', 9);
    const character3 = new characterCard(3, 'Legolas', 'Elf', 'Archer', 10);


          this.chars.push(character1);
          this.chars.push(character2);
          this.chars.push(character3);

  }

  private takeToken(): string {
    var token = sessionStorage.getItem("token");

    if (token == null) {
      return "login não encontrado.";
    } else {
      console.log(token)
      return token;
    }

  }

  showCharacter(id: number) {
    sessionStorage.setItem("idChar", id.toString());
    this.route.navigateByUrl('/character-sheet');
  }
}
