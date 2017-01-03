/*
* IMPORTS: Libraries that steam-yellow uses.
*/
const SteamUser = require('steam-user');
const readline = require('readline');
const client = new SteamUser();

// NodeJS Readline
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Overwrite the SteamUser library's persona flags to make it yellow
SteamUser.prototype.setPersona = function (state, name) {
	this._send(SteamUser.EMsg.ClientChangeStatus, {
		"persona_state": state,
		"persona_state_flags": 4, // This makes it yellow
		"player_name": name
	});
};
// Verbosing info to user
console.log("Welcome to yellow-steam!");
console.log("Join our discord and steam group!");
console.log("WEBSITE: https://drakewitt.github.io/steam-yellow/");

// Prompt for username
rl.question('Username? ', (answer) => {

	let username = answer;
	rl.question('Password? ', (answer) => {
		let password = answer;
		const logOnOptions = {
			accountName: username,
			password: password
		};

		client.logOn(logOnOptions);

		rl.close();
	});
});

client.on('loggedOn', () => {
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
	console.log("Logged In! Press CTRL and C to stop.");
});
