export function parseArgs(message, prefix) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g); // removes the prefix, then the spaces, then splits into array
    const commandName = args.shift().toLowerCase();

    let parsed = {};
    parsed.commandName = commandName;
    parsed.raw = args;
    parsed.joined = args.join(' ');
    parsed.first = args[0];

    return parsed;
}