export default {
    name: 'say',
    description: 'Repeats your message.',
    usage: 'say [content]',
    execute(message, parsed, client, channelid) {
        const content = parsed.joined;
        if (!content) return client.sendMessage(channelid, 'you must specify what to say!');

        client.sendMessage(channelid, content);
    }
}