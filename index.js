"use strict";

/*
* IMPORTS: Libraries that steam-yellow uses.
*/
const SteamUser = require('steam-user');
const inquirer = require('inquirer');
const client = new SteamUser();
const argv = require('minimist')(process.argv.slice(2));

// Verbosing info to user
console.log("Welcome to yellow-steam!");
console.log("Join our discord and steam group!");
console.log("WEBSITE: https://drakewitt.github.io/steam-yellow/");

let flags;
let counter = 0;
let flagList = [
	1,
	256,
	512,
	1024
];

// Overwrite the SteamUser library's persona flags to make it yellow
SteamUser.prototype.setPersona = function (state, name) {
	if (flags > 0) {
		this._send(SteamUser.EMsg.ClientChangeStatus, {
			"persona_state": state,
			"persona_state_flags": flags,
			"player_name": name
		});
	} else {
		let flags = 0;
		
		let update = function() {
			flags |= flagList[Math.floor(counter / 2)];
			
			let finalFlags = flags;
			if (counter % 2 == 1) {
				finalFlags |= 4;
			}
			
			console.log("Applying flags " + finalFlags);
			
			this._send(SteamUser.EMsg.ClientChangeStatus, {
				"persona_state": state,
				"persona_state_flags": finalFlags,
				"player_name": name
			});
			
			counter++;
			if (counter >= flagList.length * 2) {
				counter = 0;
				flags = 0;
			}
		}.bind(this);
		
		setInterval(update, 750);
	}
};
client.on('loggedOn', () => {
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
	console.log("Logged In! Press CTRL and C to stop.");
});

/** (<Function callback>) => <Promise ({flags: <Number>, ...})> */
function getLogin(callback) {
	if (argv.user && argv.pass) {		// command line
		return Promise.resolve({
			flags: argv.flags || 2820,
			accountName: argv.user,
			password: argv.pass
		});
	} else if (argv._.length) {		// JSON file
		let data = require(argv._[0]);
		data.flags = data.flags || 2820;
		return Promise.resolve({
			flags: data.flags,
			accountName: data.username,
			password: data.password
		});
	} else {		// prompt
		return inquirer.prompt([
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
				message: 'If "Cycling" is checked, it overrides all other options.\nPlease select which flags to enable:',
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
					{name: "Cycling",
					 value: -10000}
				]
			}
		]).then(data => {
			data.flags = data.flags.reduce((v,p)=>v+p, 0);
			return data;
		})
	}
}

// Get our login data, then login
getLogin().then(data => {
	flags = data.flags;
	delete data.flags;

	client.logOn(data)
});
