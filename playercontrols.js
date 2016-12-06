function PlayerController() {


  var playerService = new PlayerService()

  playerService.getNFL(ready)

  function ready(data) {
    debugger



    update(data, '#roster')


    $('#roster').on('click', '.btn-success', function () {

      playerService.addToMyPlayers(this.id)
      update(playerService.getMyPlayers(), '#my-roster')
      update(playerService.getPlayers(), '#roster')
    })

    $('#my-roster').on('click', '.btn-danger', function () {
      playerService.removeMyPlayer(this.id)
      update(playerService.getMyPlayers(), '#my-roster')
      update(playerService.getPlayers(), '#roster')
    })
    $('.saveMyRoster').on('click', function () {
      localStorage.setItem('myRoster', JSON.stringify(myPlayers))
      update()
    })
    $('.removeMyRoster').on('click', function () {
      myPlayers = [];
      update()
    })

  }



  function update(list, target) {
    debugger

    var elem = $(target)
    elem.empty()

    for (var i in list) {
      var player = list[i];

      var myTemplate = `
      <div class="player-card text-center">
          <img src="${player.photo}" alt="">
          <h3 class="bevan">${player.fullname}</h3>
          <h4 class="neuton">${player.position}</h4>
          <p class="neuton">${player.jersey}</p>
          <p class="neuton">${player.pro_team}</p>
          <div>
             <button class="btn-danger" id="${player.id}">Remove</button>
          </div>          
      </div>
      `
      var nflTemplate = `
      <div class="player-card text-center">
        <img class="mugshot" src="${player.photo}"/>
        <h3 class="bevan">${player.fullname}</h3>
        <h4 class="neuton">${player.position}</h4>
        <p class="neuton">${player.jersey}</p>
        <p class="neuton">${player.pro_team}</p>
        <div>
            <button class="btn-success" id="${player.id}">Add</button>
        </div>              
      </div>
      `
      elem.append(target == '#roster' ? nflTemplate : myTemplate)
    }
  }
}
PlayerController()