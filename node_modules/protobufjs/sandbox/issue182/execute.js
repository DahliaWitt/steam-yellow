var ProtoBuf = require("../../index.js");

var builder = ProtoBuf.loadProtoFile(__dirname+'/commands.proto'),
    Container = builder.build('CommandContainer'),
    SessionCommand = builder.build('SessionCommand'),
    Login = builder.build('Command_Login');

var login = new Login({
    "user_name": "demo",
    "password": "abc123"
});

var container = new Container();
var command = new SessionCommand();
command.set(".Command_Login.ext", login);
container.add('session_command', command);

var container = new Container({
    'session_command': [new SessionCommand({
        '.Command_Login.ext': login
    })]
});