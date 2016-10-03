function PlayerController(){
  
  var playerService = new PlayerService()
  
  function updateRoster(arr){
    var rosterElem = $('#roster')
    var template = ''
    for (var i = 0; i < arr.length; i++) {
      var player = arr[i];
      template += `
      
       <div class="col-sm-6 col-lg-3 player-card">
        <div class="card text-center">
            <button id="remove-${player.id}" class="button alert remove-button">Remove Player</button>
            <img src="${player.photo}" alt="Photo of: ${player.fullname}">
            <p>${player.fullname}</p>
            <p>${player.pro_team}</p>
            <p>${player.position}</p>
            <p>#${player.jersey}</p>
        </div>
    </div>
      

      `
    }
    rosterElem.empty()
    rosterElem.append(template);
    // registerRemove()
  }
  
  $('.new-player-form').on('submit', function addPlayer(event){
    event.preventDefault();
    var form = event.target;
    playerService.addPlayer(form.pName.value, form.pPosition.value, form.pJersey.value)
    updateRoster(playerService.getPlayers())
  })
  
  $('#roster').on('click', 'button.remove-player', function(){
     playerService.removePlayer(this.id)
     updateRoster(playerService.getPlayers())
  })
  
  
  
  
  
  playerService.getNFL(updateRoster)  
  
  
  
  
// updateRoster(playerService.getPlayers())
}
PlayerController()