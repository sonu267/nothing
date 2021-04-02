class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.xpos = 0
    this.rank = null
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      xpos:this.xpos,
      rank:this.rank
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getfinishedPlayers(){
    var finishedref = database.ref('finishedPlayers')
    finishedref.on("value",(data)=>{
      finishedPlayers=data.val()

    })
    

  }
static updatefinishedPlayers(){
  database.ref('/').update({
    finishedPlayers:finishedPlayers+1
  })
  this.rank+=1
}   
}
