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

// Verbosing info to user
console.log("Welcome to yellow-steam!");
console.log("Join our discord and steam group!");
console.log("WEBSITE: https://drakewitt.github.io/steam-yellow/");

/* Add numbers to this to make it do different things:
	e.g. 4 makes it yellow, 256 shows web icon, 512 shows mobile icon, 2048 shows VR icon 
*/
var myPersonaStateFlags = 4;

rl.question('Show a VR online indicator? (y/n) ', (answer) => {
	if (answer === 'y') myPersonaStateFlags += 2048;
	rl.question('Show a mobile online indicator? (y/n) ', (answer) => {
		if (answer === 'y') myPersonaStateFlags += 512;
		rl.question('Show a web online indicator? (y/n) ', (answer) => {
			if (answer === 'y') myPersonaStateFlags += 256;

			// Overwrite the SteamUser library's persona flags to make it yellow
			SteamUser.prototype.setPersona = function (state, name) {
				this._send(SteamUser.EMsg.ClientChangeStatus, {
					"persona_state": state,
					"persona_state_flags": myPersonaStateFlags, // This makes it yellow and other optional stuff
					"player_name": name
				});
			};

			// Set the online state to yellow after logging in
			client.on('loggedOn', () => {
				client.setPersona(SteamUser.Steam.EPersonaState.Online);
				console.log("Logged In! Press CTRL and C to stop.");
			});

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
		});
	});
});
