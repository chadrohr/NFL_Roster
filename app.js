var myPlayer = $('.player-roster')
var myRoster = [];
function addToRoster(event){
    event.preventDefault();
  var name = $('#name').val()
  var position = $('#position').val()
  var jersey = $('#jersey').val()
 // function()
  var myNewPlayer = ""
  myRoster.push(name,position,jersey);
    
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

// for (var i = in myRoster){}
// myRoster.push(myPlayer.name, myPlayer.position, myPlayer.jersey);
//  function myPlayer = {
//       this.name = name,
//       this.position = position,
//       this.jersey = jersey,
// function buildMyRoster(name, position,jersey){
//     for(i = 0; i < myRoster.length; i ++){
        
//     }
}