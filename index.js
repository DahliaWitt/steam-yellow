// yellow: node index.js [username] [password] 4

const SteamUser = require('steam-user');
const client = new SteamUser();

SteamUser.prototype.setPersona = function(state, name) {
	console.log(getTime() + " ID: " + client.steamID.getSteam3RenderedID() +
							" State: " + state + " Flags: " + process.argv[4]);

	this._send(SteamUser.EMsg.ClientChangeStatus, {
		"persona_state": state,	// state
		"persona_state_flags": parseInt(process.argv[4]),	// flags
		"player_name": name
	});
};

const logOnOptions = {
	accountName: process.argv[2],
	password: process.argv[3]
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
	console.log(getTime() + " Logged In! Press CTRL and C to stop.");
});

function getTime() {
	var time = new Date();
	return "[" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "]";
}
