/*
* IMPORTS: Libraries that steam-yellow uses.
*/
const SteamUser = require('steam-user');
const inquirer = require('inquirer');
const client = new SteamUser();

// Verbosing info to user
console.log("Welcome to yellow-steam!");
console.log("Join our discord and steam group!");
console.log("WEBSITE: https://drakewitt.github.io/steam-yellow/");

let flags;
// Overwrite the SteamUser library's persona flags to make it yellow
SteamUser.prototype.setPersona = function (state, name) {
	this._send(SteamUser.EMsg.ClientChangeStatus, {
		"persona_state": state,
		"persona_state_flags": flags, // This makes it yellow
		"player_name": name
	});
};
client.on('loggedOn', () => {
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
	console.log("Logged In! Press CTRL and C to stop.");
});

// Prompt for stuff
inquirer.prompt([
	{
		name: 'accountName',
		message: 'Steam username:',
		type: 'input'
	},
	{
		name: 'password',
		message: 'Steam password:',
		type: 'password'
	},
	{
		name: 'flags',
		message: 'Please select which flags to enable (max 3 indicators):',
		type: 'checkbox',
		choices: [
			{name: "Yellow name",
			 value: 4,
			 checked: true},
			{name: "VR online indicator",
			 value: 2048},
			{name: "Mobile online indicator",
			 value: 512},
			{name: "Web online indicator",
			 value: 256},
                        {name: "Big picture indicator",
                         value: 1024}
		]
	}
// then log in
]).then(data => {
	flags = data.flags.reduce((v,p)=>v+p, 0);

	client.logOn(data);
});


