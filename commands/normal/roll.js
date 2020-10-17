export default {
    name: 'roll',
    aliases: ['rng', 'dice'],
    description: 'rolls a x sided dice.',
    usage: 'roll [sides]',
    execute(message, parsed, client, channelid) {
        let sides = parsed.first;
        if (!sides) sides = 6;

        let roll = Math.floor(Math.random() * Math.floor(sides)) + 1;
        client.sendMessage(channelid, `Rolled a ${sides} sided die and got ${roll}`);
    }
}