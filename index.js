const SteamUser = require('steam-user');
const client = new SteamUser();

SteamUser.prototype.setPersona = function(state, name) {
	this._send(SteamUser.EMsg.ClientChangeStatus, {
		"persona_state": state,
		"persona_state_flags": 4,
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
    console.log("Logged In! Press CTRL and C to stop.");
});