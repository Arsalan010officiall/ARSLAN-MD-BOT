const {
    Module,
    groupDB,
    getLang,
    lang
} = require('../lib');

Module({
    pattern: 'filter ?(.*)',
    desc: lang.FILTERS.DESC,
    react: '🌝',
    type: 'filter',
    onlyGroup: true,
    fromMe : true
}, async (message, match )=>{
        if(match == 'get') {
        const {filter} = await groupDB(['filter'], {jid: message.jid, content: {}}, 'get');
            if(!Object.keys(filter)[0]) return await message.send('_there have not any filters found_\n_*Example* filter jsl= filters message content_');
            let msg = '';
            for( const f in filter) {
           msg +=  `_*pattern:* ${f}_\n_*filter:* ${filter[f].chat}_\n\n`;
           }
           return await message.send(msg);
        } else {
        if(!match.includes('=')) return await message.send('_*Example:* filter jsl=https://img.png type/sticker_');
            let [pattern, msg] = match.split('=');
            let type = 'text';
            if(!msg) return await message.send('_*Example:* filter jsl=https://img.png type/image\n_*values:* text, sticker, audio, image, vedio_');
            if(msg.includes('type/')) {
                   type = msg.split('type/')[1].trim().toLowerCase();
                   msg = msg.split('type/')[0].trim()
            }
            await groupDB(['filter'], {jid: message.jid, content: {[pattern]: {type,chat:msg}}}, 'add');
            return await message.send(`_successfully added filter *${pattern}*_`);
        }
});


Module({
    pattern: 'stop ?(.*)',
    desc: 'remove filters fromg group',
    react: '😫',
    type: 'filter',
    onlyGroup: true,
    fromMe : true
}, async (message, match) => {
        if(!match) return await m.send('*Example*\n*stop* ```hi``` _to stop filter *hi*_\n*filter* ```get``` to get current filters thets you added');
        const {filter} = await groupDB(['filter'], {jid: message.jid, content: {}}, 'get');
        if(!Object.keys(filter)[0]) return await message.send('_there have not any filters found_\n_*Example* filter jsl= filters message content_');
        await groupDB(['filter'], {jid: message.jid, content: {id: match}}, 'delete');
        return await message.send('_successfull_');
    });
