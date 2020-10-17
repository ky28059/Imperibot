//import {ImperichatClient} from 'imperichat-js';
import ImperichatClient from './modifiedSDK.js';
import fs from 'fs';
import {parseArgs} from "./commands/utils/argumentParser.js";
import {id, password} from './config.js';

const client = new ImperichatClient();
client.commands = new Map();

client.loadCommands = async function() {
    const dirnames = ['normal'];

    for (let dir of dirnames) {
        const commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            let command = await import(`./commands/${dir}/${file}`);
            command = command.default;
            client.commands.set(command.name, command);
        }
    }
    console.log('Commands loaded!');
}

client.once('ready', async () => {
    await client.loadCommands();
    client.subscribe('2814671470');
    console.log('Logged in!');
})

client.on('message', async message => {
    let prefix = '!'; // temp, this bot not as powerful as RBot yet

    if (message.content.substring(0, prefix.length) === prefix) {
        const parsed = parseArgs(message, prefix);
        const commandName = parsed.commandName;

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        let channelid = message.sectionId; // The finest of spaghetti

        try {
            await command.execute(message, parsed, client, channelid);
        } catch (error) {
            console.error(error);
            await client.sendMessage(channelid, 'there was an error trying to execute that command!');
        }
    }
});

client.on('error', error => {
    console.error(error);
})

await client.login(id, password);
