const axios = require('axios');
const fs = require('fs');

const postRegion = {
    default: {
        ja: '', ko: '', en: '', zhTw: '', fr: '', de: '', es: '', it: '', zhCn: ''
    },
    alola: {
        ja: ' (アローラのすがた)', ko: ' (알로라의 모습)', en: ' (Alolan Form)', zhTw: ' (阿羅拉的樣子)', fr: ' (Forme d\'Alola)', de: ' (Alola-Form)', es: ' (Forma de Alola)', it: ' (Forme di Alola)', zhCn: ' (阿罗拉的样子)'
    },
    galar: {
        ja: ' (ガラルのすがた)', ko: ' (가라르의 모습)', en: ' (Galarian form)', zhTw: ' (伽勒爾的樣子)', fr: ' (Forme de Galar)', de: ' (Galar-Form)', es: ' (Forma de Galar)', it: ' (Forma di Galar)', zhCn: ' (伽勒尔的样子)'
    },
    hisui: {
        ja: ' (ヒスイのすがた)', ko: ' (히스이의 모습)', en: ' (Hisuian Form)', zhTw: ' (洗翠的樣子)', fr: ' (Forme de Hisui)', de: ' (Hisui-Form)', es: ' (Forma de Hisui)', it: ' (Forma di Hisui)', zhCn: ' (洗翠的样子)'
    },
    paldea: {
        ja: ' (パルデアのすがた)', ko: ' (팔데아 모습)', en: ' (Paldean Form)', zhTw: ' (帕底亞的樣子)', fr: ' (Forme de Paldea)', de: ' (Paldea-Form)', es: ' (Forma de Paldea)', it: ' (Forma di Paldea)', zhCn: ' (帕底亚的样子)'
    }
}

const main = async () => {
    const { data: { count: speicesCount } } = await axios.get('https://pokeapi.co/api/v2/pokemon-species')
    const { data: { results: species } } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?&limit=${speicesCount}`)

    const i18nJa = { pokemon: {} }
    const i18nKo = { pokemon: {} }
    const i18nEn = { pokemon: {} }
    const i18nZhTw = { pokemon: {} }
    const i18nFr = { pokemon: {} }
    const i18nDe = { pokemon: {} }
    const i18nEs = { pokemon: {} }
    const i18nIt = { pokemon: {} }
    const i18nZhCn = { pokemon: {} }

    // await Promise.all(species.map(async s => {
    for (const s of species) {
        const { data: { name, names, varieties } } = await axios.get(s.url)

        console.log(`${name} ${s.url}...`)

        for (const v of varieties) {
            let variety
            if (v.pokemon.name.includes('-mega')
                || v.pokemon.name.includes('-ash')
                || v.pokemon.name.includes('-gmax')
                || v.pokemon.name.includes('-totem')
                || v.pokemon.name.includes('-cap')) variety = undefined
            else if (v.pokemon.name.includes('-alola')) variety = 'alola'
            else if (v.pokemon.name.includes('-galar')) variety = 'galar'
            else if (v.pokemon.name.includes('-hisui')) variety = 'hisui'
            else if (v.pokemon.name.includes('-paldea')) variety = 'paldea'
            else variety = 'default'

            if (variety) {
                const lang = new Set(names.map(v => v.language.name))
                i18nJa.pokemon[v.pokemon.name] = lang.has('ja') ? names.find(v => v.language.name === 'ja').name + postRegion[variety].ja : 'xxxxxx'
                i18nKo.pokemon[v.pokemon.name] = lang.has('ko') ? names.find(v => v.language.name === 'ko').name + postRegion[variety].ko : 'xxxxxx'
                i18nEn.pokemon[v.pokemon.name] = lang.has('en') ? names.find(v => v.language.name === 'en').name + postRegion[variety].en : 'xxxxxx'
                i18nZhTw.pokemon[v.pokemon.name] = lang.has('zh-Hant') ? names.find(v => v.language.name === 'zh-Hant').name + postRegion[variety].zhTw : 'xxxxxx'
                i18nFr.pokemon[v.pokemon.name] = lang.has('fr') ? names.find(v => v.language.name === 'fr').name + postRegion[variety].fr : 'xxxxxx'
                i18nDe.pokemon[v.pokemon.name] = lang.has('de') ? names.find(v => v.language.name === 'de').name + postRegion[variety].de : 'xxxxxx'
                i18nEs.pokemon[v.pokemon.name] = lang.has('es') ? names.find(v => v.language.name === 'es').name + postRegion[variety].es : 'xxxxxx'
                i18nIt.pokemon[v.pokemon.name] = lang.has('it') ? names.find(v => v.language.name === 'it').name + postRegion[variety].it : 'xxxxxx'
                i18nZhCn.pokemon[v.pokemon.name] = lang.has('zh-Hans') ? names.find(v => v.language.name === 'zh-Hans').name + postRegion[variety].zhCn : 'xxxxxx'
            }
        }
        // }))
    }


    fs.writeFileSync('i18n/ja.json', JSON.stringify(i18nJa), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/ko.json', JSON.stringify(i18nKo), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/en.json', JSON.stringify(i18nEn), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/zh-TW.json', JSON.stringify(i18nZhTw), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/fr.json', JSON.stringify(i18nFr), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/de.json', JSON.stringify(i18nDe), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/es.json', JSON.stringify(i18nEs), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/it.json', JSON.stringify(i18nIt), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/zh-CN.json', JSON.stringify(i18nZhCn), { encoding: 'utf8', flag: 'w' })
}

main()