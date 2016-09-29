var myPlayer = $('.player-roster')
var myRoster
function addToRoster(event){
    event.preventDefault()
  var name= $('#name').val()
  var position = $('#position').val()
  var jersey = $('#jersey').val()

  myPlayer.append(`<div class="player-card">
                <div>
                    <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"></div>
                <div>
                    <h4>${name}</h4>
                </div>
                <div>
                    <h5>${position}</h5>
                </div>
                <div>
                    <p>${jersey}</p>
                </div>
            </div>`)
}

