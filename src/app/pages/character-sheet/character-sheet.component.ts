import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit{

  chars: Character[];
  personagem: Character | undefined;
  constructor() {
    this.chars = [];
    const character1 = new Character(1, 'Oliver', 'Aragorn', 'Human', 'Ranger', 12, 'Leal e Bom', 20, 565656, 3, 4, 25, 1, 16, 18, 18, 18, 15, 10, 10, 21);
    const character2 = new Character(2, 'Aurora', 'Gandalf', 'Wizard', 'Wizard', 9, 'Leal e Bom', 20, 565656, 3, 4, 25, 1, 16, 18, 18, 18, 15, 10, 10, 21);
    const character3 = new Character(3, 'Bruno', 'Legolas', 'Elf', 'Archer', 10, 'Leal e Bom', 20, 565656, 3, 4, 25, 1, 16, 18, 18, 18, 15, 10, 10, 21);


          this.chars.push(character1);
          this.chars.push(character2);
          this.chars.push(character3);

     this.personagem = this.chars.find(char =>  char.id === Number(sessionStorage.getItem("idChar")));

  }
  
  ngOnInit() {
    this.listCharactersMock();
  }

  private listCharactersMock(): void {

  }

}
