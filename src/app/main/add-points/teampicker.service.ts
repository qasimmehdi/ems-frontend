import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TeampickerService {
  allmatch = [];
  checkmatch = [];
  part = [];
  point = [];
  teams = [];
  call = null;
  pcall = null;
  ocall = null;
  temps = [];


  constructor(private fire: AngularFirestore) {
  }


  getplayers() {

    return this.fire.collection('/players').snapshotChanges();

  }

  getusers() {
    console.log('b');
    return this.fire.collection('/users').snapshotChanges();
  }

  savedata(name, list) {
    console.log('d');
    for (let i in list) {
      this.fire.collection('/' + name).doc(i.toString()).set(list[i])
    }

  }

  temp(list) {
    this.fire.collection('/players').doc('teams').set({ data: list });
  }
  temp1(name) {
    return this.fire.collection('/' + name);
  }

  getpoint() {
    this.ocall = this.fire.collection('/score').snapshotChanges().subscribe(x => this.allmatch = x.map(o => o.payload.doc.data()));
    console.log(this.allmatch);
  }
  savepoints(name, list) {
    this.allmatch[0].data.push({ match: name, score: list });
    this.fire.collection('/score').doc('result').set({ data: this.allmatch[0].data });
    console.log(this.allmatch);
    this.ocall.unsubscribe();
  }

  deluser(name) {
    console.log('f');
    this.fire.collection('/users').doc(name).delete();
  }

  saveParticipant(name) {
    console.log('k');
    this.fire.collection('/participants').doc(name).set({ teamAdded: true });
  }

  getParticipants() {
    console.log('o');
    return this.fire.collection('/participants').snapshotChanges();
  }


  getpoints() {

    return this.fire.collection('/points').snapshotChanges();
  }


  abc() {
    this.pcall = this.fire.collection('/score').snapshotChanges().subscribe(x => this.checkmatch = x.map(o => o.payload.doc.data()));
    return this.fire.collection('/teams').snapshotChanges().subscribe(x => {
      this.teams = x.map(o => o.payload.doc.data());

      for (let name of this.teams[0].data[0].data) {

        for (let k of name.team) {
          k.type = 0;
          k.type = parseInt(k.type);
        }
      }

      for (let name of this.teams[0].data[0].data) {
        var a = 0;
        for (let k of name.team) {


          // console.log(this.checkmatch);
          for (let m of this.checkmatch[0].data) {
            //console.log(m);
            for (let o of m.score) {
              if (o.player == k.name) {
                k.type = k.type + o.points;
                // console.log(o.player);

                a = a + o.points;
              }
            }
          }
          if (k.captain) {
            k.captain = '(C)'
            a = a + k.type;
            k.type = k.type * 2;

          }


        }
        name.name.tp = name.name.tp + a;

      }
      this.teams[0].data[0].data.sort((left, right) => {
        if (left.name.tp < right.name.tp) return 1;
        if (left.name.tp > right.name.tp) return -1;
        return 0;
      });


    });



  }

}
