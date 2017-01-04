# Steam Yellow
Turn your username yellow in steam.

# NOTE: As of 7:45 EST January 3rd, Valve has patched steam. The yellow function no longer works. 

[Discord](https://discord.gg/VzzEutE)
[Steam Group](http://steamcommunity.com/groups/goldnamemasterrace)

## Video tutorials:
OneUpGaming: https://www.youtube.com/watch?v=acPqNhXtLzc (Old, new one in progress)

uLLeticaL: https://www.youtube.com/watch?v=337khh_8WJ4 (Old)

## How to install (NEW!):
1. Install NodeJS LTS here: https://nodejs.org/en/ (Tested with v.6.9.2)
2. Download this repo [here](https://github.com/DrakeWitt/steam-yellow/archive/master.zip) and extract somewhere.
3. Start the program by double clicking on `start.bat` if you are on windows or `start.sh` on macOS.

NOTE: This is a different process than the original program. It has been re-designed to work much easier. If you get errors related to "NPM" try restarting your computer. 

## If you have an Error about Missing Modules, Please Run
```bash
npm update
```

## How to install (Advanced):
```bash
$ git clone https://github.com/DrakeWitt/steam-yellow.git
$ cd steam-yellow
$ npm install
```

## How to run (Advanced):

### Prompt
```bash
$ node index
```

Then enter information manually.

### Command line Arguments
```bash
$ node index --user username --pass password --flags 4
```

Flags default to everything enabled.

### JSON file
```bash
$ node index ./login.json
```

Then in `./login.json`:

```json
{
	"username": "username",
	"password": "password",
	"flags": 4
}
```

Flags default to everything enabled.

### Use at your own risk. I'm not responsible for anything that happens. 

Disclaimer: Steam Forum Moderators are currently aware of the glitch and have most likely have reported this to Valve (http://steamcommunity.com/discussions/forum/1/154645427520675908/). Use at your own risk. 
