function PlayerService() {
    var _players = []  //My Roster Players
    var _nflPlayers = []; // NFL players data
    var _filteredPlayers = [];
    //  var playersData = [];

    var id = 3;

    function Player(name, team, pos, jersey, imagelink, id) {
        this.fullname = name;
        this.pro_team = team;
        this.pos = pos;
        this.jersey = jersey;
        this.photo = photo;
        this.id = id;
        id++;
    }


    this.getPlayers = function () {
        return _players;
    }

    this.getNFLPlayers = function () {
        return _nflPlayers;
    }
    this.getFilteredPlayers = function () {
        return _filteredPlayers;
    }

    this.setFilteredPlayers = function (players) {
        _filteredPlayers = players;
    }

    this.findNFLByID = function (id) {
        for (var i = 0; i < _nflPlayers.length; i++) {
            if (_nflPlayers[i].id == id) {
                return _nflPlayers[i];
            }
        }
        return new Player("error", "error", "error", 0, "", -2);
    }

    this.addPlayer = function (name, team, pos, jersey, imageLink, id) {
        if (!name || !pos || !imageLink || !team) {
            return
        }
        if (this.findMyPlayerByID(id).id != -2) {
            console.log(id);
            console.log(this.findMyPlayerByID(id).id);
            console.log("Player already exists!");
            return;
        }
        var player = new Player(name, team, pos, jersey, imageLink, id);
        _players.push(player)
    }

    this.removePlayer = function (id) {
        _players.forEach(function (player, index, arr) {
            if (player.id == id) {
                return arr.splice(index, 1);
            }
        });
    }

    this.getNFL = function loadPlayersData(callback) {
        var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback(playersData);
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "http://bcw-getter.herokuapp.com/?url=";
        var endPointUrl = url + encodeURIComponent(apiUrl);
        $.getJSON(endPointUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback(playersData)
        });
    }
function updateMyRoster(playerArr) {
    var template = '';


    playerArr.forEach(function (player) {
        template += `
    <div class="col-sm-6 col-lg-3 player-card">
        <div class="card text-center">
            <button id="remove-${player.id}" class="button alert remove-button">Remove Player</button>
            <img src="${player.photo}" alt="Photo of: ${player.fullname}">
            <p>${player.fullname}</p>
            <p>${myPlayerService.player.pro_team}</p>
            <p>${myPlayerService.player.position}</p>
            <p>#${player.jersey}</p>
        </div>
    </div>
    `
    });

    if (template == '') {
        template += `
        <div class="col-sm-6 col-lg-3 player-card">
            <div class="card text-center">
                <button class="button alert remove-button disabled">Remove Player</button>
                <img src="resources/player-shadow.jpg" alt="NFL Player Silhouette">
                <p>----</p>
                <p>----</p>
                <p>----</p>
            </div>
        </div>
        `
    }

    var element = $('#row-roster-container');
    element.empty();
    element.append(template);

}

this.updateNFLRoster = (playerArr)=>{
    var template = "";

    var tempArr = playerArr.slice(0,50);

    tempArr.forEach(function (player) {
        template += `
    <div class="col-sm-6 col-lg-3 player-card">
      <div class="card text-center">
        <button id="add-${player.id}" class="button success add-button">Add Player To Roster</button>
        <img class="player-image" src="${player.photo}" alt="Photo of: ${player.fullname}">
        <p>${player.fullname}</p>
        <p>${player.pro_team}</p>
        <p>${player.position}</p>
        <p>#${player.jersey}</p>
      </div>
    </div>
    `
    });

    var element = $('#row-nfl-container');
    element.empty();
    element.html(template);
}

this.NFLfilter = (playerArr)=>{
    var name = $('#nfl-search-name').val();
    var team = $('#nfl-search-team').val();
    var pos = $('#nfl-search-position').val();
    var num = $('#nfl-search-number').val();
    var tempArr = playerArr;
    tempArr = tempArr.filter(function (player) {
        if (player.fullname.toLowerCase().includes(name.toLowerCase()) || name == "") { return true }
        return false;
    })

    tempArr = tempArr.filter(function (player) {
        if (player.pro_team == team || team == 'ANY') { return true }
        return false;
    })

    tempArr = tempArr.filter(function (player) {
        if (player.position == pos || pos == 'ANY') { return true }
        return false;
    })

    tempArr = tempArr.filter(function (player) {
        if (player.jersey == num || num == "") { return true }
        return false;             console.log(player)

    })
    myPlayerService.setFilteredPlayers(tempArr);
    return tempArr;
}

function clearFilter() {
    var name = $('#nfl-search-name').val("");
    var team = $('#nfl-search-team').val('ANY');
    var pos = $('#nfl-search-position').val('ANY');
    var num = $('#nfl-search-number').val("");
}

function getElementPlayerID(element) {
    var index = element.id.indexOf('-') + 1;
    var id = element.id.slice(index, element.id.length);
    return id;
}

function updateAddPlayerClicked(id) {
    var element = $('#add-' + id);
    element.text("Player Added!");
    element.removeClass("success");
    element.addClass("button-glow");
}
}
var debugFlag = true;
myPlayerService = new PlayerService()

$('#button-filter').on('click', function (e) {
    e.preventDefault();
    if (debugFlag) { console.log("Filter clicked!") }
    myPlayerService.updateNFLRoster(myPlayerService.NFLfilter(myPlayerService.getNFLPlayers()))

});

$('#button-filter-clear').on('click', function (e) {
    e.preventDefault();
    if (debugFlag) { console.log("Filter Clear clicked!") }
    updateNFLRoster(myPlayerService.getNFLPlayers())
    clearFilter();
});

$('#button-add-custom').on('click', function (e) {
    e.preventDefault();
    if (debugFlag) { console.log("Add Custom clicked!") }
    myPlayerService.addPlayer(
        $('#nfl-add-name').val(),
        $('#nfl-add-team').val(),
        $('#nfl-add-position').val(),
        $('#nfl-add-number').val(),
        $('#nfl-add-url').val()
    )
    updateMyRoster(myPlayerService.getMyPlayers());
});

//Event Delegation
// $('#row-roster-container').on('click', '.remove-button', function (e) {
//     e.preventDefault();
//     var id = getElementPlayerID(this);
//     myPlayerService.removePlayer(id);
//     updateMyRoster(myPlayerService.getMyPlayers());
// });

// $('#row-nfl-container').on('click', '.add-button', function (e) {
//     e.preventDefault();
//     var id = getElementPlayerID(this);
//     var player = myPlayerService.findNFLByID(id);
//     myPlayerService.addPlayer(player.fullname, player.pro_team, player.position, player.jersey, player.photo, player.id);
//     updateMyRoster(myPlayerService.getMyPlayers());
//     updateAddPlayerClicked(id);
// });

// $('#row-nfl-container').on('click', '.next-button', function (e) {
//     e.preventDefault();
//     myPlayerService.setPageIndex((myPlayerService.getPageIndex() + 1));
//     updateNFLRoster(myPlayerService.getFilteredPlayers())
// });

// $('#row-nfl-container').on('click', '.prev-button', function (e) {
//     e.preventDefault();
//     myPlayerService.setPageIndex((myPlayerService.getPageIndex() - 1));
//     updateNFLRoster(myPlayerService.getFilteredPlayers())
// });