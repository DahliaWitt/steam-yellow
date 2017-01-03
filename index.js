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
let flagsArr = [ 
	1, 
	4,
	256 + 1,
	256 + 4,
	1 + 256 + 512,
	4 + 256 + 512,
	1 + 256 + 512 + 1024,
	4 + 256 + 512 + 1024,
	1 + 256 + 512 + 1024 + 2048,
	4 + 256 + 512 + 1024 + 2048
]; // etc
let currentFlag = 0;

// Overwrite the SteamUser library's persona flags to make it yellow
SteamUser.prototype.setPersona = function (state, name) {
	if (flags > 0) {
        this._send(SteamUser.EMsg.ClientChangeStatus, {
            "persona_state": state,
            "persona_state_flags": flagsArr[currentFlag], // This makes it yellow
            "player_name": name
        });
    }
	else {
		let update = function() { 
			flag = flagsArr[currentFlag];
			
			console.log("Applying flag " + flag);
			this._send(SteamUser.EMsg.ClientChangeStatus, {
				"persona_state": state,
				"persona_state_flags": flagsArr[currentFlag], // This makes it yellow
				"player_name": name
			});
			
			if (++currentFlag > flagsArr.length - 1) {
				currentFlag = 0;
			}
		}.bind(this);
		
		setInterval(update, 1000);
	}
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
		message: 'Note: If "Inf Loop" Is Checked, It Will Default to just "Inf Loop"\nPlease select which flags to enable:',
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
			{name: "Inf Loop",
			 value: -10000}
		]
	
	}
// then log in
]).then(data => {
	flags = data.flags.reduce((v,p)=>v+p, 0);
	console.log(flags);
	client.logOn(data);
});


