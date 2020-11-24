import { Component, OnInit,OnDestroy} from '@angular/core';
import { TeampickerService } from './teampicker.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.component.html',
  styleUrls: ['./add-points.component.css']
})
export class AddpointsComponent implements OnInit {
  capcheck = false;

  team =[];
  players = [];
  playersname =[];
  selectedTeam = [];
  points = 0;
  checkduplicate = false;
  constructor(private getter:TeampickerService,private rout:Router) { }

  ngOnInit() {
    this.getter.getpoint();
    this.getter.getplayers().subscribe(x => {this.players = x.map(o => o.payload.doc.data())});

  }



  get(team,type){
    console.log(this.players);

    this.playersname = [];
    type.value = 'Select Type'; //reseting
    //console.log(team);
    for(let o of this.players[0].data){
      if(o.name == team){
        this.team=o.player;
      }
    }
   // console.log(this.team);


    console.log(this.players);

  }

  getplayername(type){

    this.playersname = [];
    for(let it of this.team){
      if(it.type == type){
          this.playersname.push(it);
      }

    }
  }
//list khali na ho and duplicate na ho
add(name,runs,six,four,wics,cap){

    this.points = 0;
    if(this.selectedTeam.find(x => x.player == name)){
      alert('you already select this Player');
    }
    else{
    if(runs == '' || name == '' || six == '' || four == ''|| wics == ''){
      alert('all fields are mandatory');
    }
    else{
      runs = parseInt(runs);
      four = parseInt(four);
      six = parseInt(six);
      wics = parseInt(wics);
      this.points = this.points + runs;
      this.points = this.points + (3*six);
      this.points = this.points+ (2*four);
      this.points = this.points + (wics*20);

      if(runs >= 50 && runs < 100){ this.points = this.points + 25}
      if(runs >= 100){ this.points = this.points + 50}
      if(wics >= 3 && wics < 5){this.points = this.points + 30;}
      if(wics >= 5 && wics < 7){this.points = this.points + 50;}
      if(wics >= 7){this.points = this.points + 100;}
      if(cap.checked){this.points = this.points + 100;}

      if(cap.checked == true && this.capcheck != true){
        this.capcheck = true;
        cap.checked = false;
        this.selectedTeam.push({
          player:name,
          points: this.points,
          mm: true
        })
    }
    else{
      this.selectedTeam.push({
        player:name,
        points: this.points
      })
    }




  }
}
  }

  del(i){

    if(this.selectedTeam[i].mm){this.capcheck = false}
    this.selectedTeam.splice(i,1);

  }

  save(){

    let match = prompt('please enter the match');
    while(match == ''){match = prompt('please enter the match');}
    if(confirm('are you confirm')){
      this.getter.savepoints(match,this.selectedTeam);
      alert('Points Saved');
    }

    this.selectedTeam = [];
    this.capcheck = false;
  }

  ngOnDestroy(){
    console.log("destroying child...");
    //this.data.pointuns().unsubscribe();
   // this.data.Teamuns().unsubscribe();
  }


}
