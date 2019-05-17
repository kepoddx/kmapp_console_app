import  { createReadStream, createWriteStream } from 'fs'
import * as path from 'path'
import { Transform } from 'stream'

import mustache from 'mustache'

const templateName = './component.tpl';
const template = path.join(process.cwd(), 'libs', 'templating', templateName)
const outfile = 'test.vue';

const file = createReadStream(template)
const writer = createWriteStream(outfile)

const hydrate = new Transform({
    transform: (data, _, done) => {
        let hData = mustache.render(data.toString(), {class: 'cmp', name: 'table'});
        done(null, hData)
    }
})

file.pipe(hydrate).pipe(writer)