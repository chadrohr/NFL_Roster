// function PlayerController(){
  
//   var playerService = new PlayerService()
  
//   function updateRoster(arr){
//     var rosterElem = $('#roster')
//     var template = ''
//     for (var i = 0; i < arr.length; i++) {
//       var player = arr[i];
//       template += `
//       <div class="card">
//         <h3>${player.name}</h3>
//         <h4>${player.pos}</h4>
//         <p>${player.jersey}</p>
//         <button class="remove-player" id="${player.id}">DESTROY FOREVER</button>
//         <button>I DO NOTHING</button>
//       </div>
//       `
//     }
//     rosterElem.empty()
//     rosterElem.append(template);
//     // registerRemove()
//   }
  
//   $('.new-player-form').on('submit', function addPlayer(event){
//     event.preventDefault();
//     var form = event.target;
//     playerService.addPlayer(form.pName.value, form.pPosition.value, form.pJersey.value)
//     updateRoster(playerService.getPlayers())
//   })
  
//   $('#roster').on('click', 'button.remove-player', function(){
//      playerService.removePlayer(this.id)
//      updateRoster(playerService.getPlayers())
//   })
  
  
  
  
  
//   playerService.getNFL(updateRoster)  
  
  
  
  
// // updateRoster(playerService.getPlayers())
// }
// PlayerController()