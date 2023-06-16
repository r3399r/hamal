const axios = require('axios');
const fs = require('fs');

const customI18n = {
    ja: {
        alola: 'アローラ',
        galar: 'ガラル',
        hisui: 'ヒスイ',
        paldea: 'パルデア',
        "tauros-paldea-combat-breed": "コンバット",
        "tauros-paldea-blaze-breed": "ブレイズ",
        "tauros-paldea-aqua-breed": "ウォーター",
        'incarnate': 'けしん',
        'therian': 'れいじゅう',
        "gimmighoul": "はこ",
        "gimmighoul-roaming": "とほ",
        "zacian": "れきせんのゆうしゃ",
        "zacian-crowned": "けんのおう",
        "zamazenta": "れきせんのゆうしゃ",
        "zamazenta-crowned": "たてのおう",
        "toxtricity-amped": "ハイ",
        "toxtricity-low-key": "ロー",
        "average": "ふつう",
        "small": "ちいさい",
        "large": "おおきい",
        "super": "とくだい",
        "zygarde-10": "10%",
        "zygarde-50": "50%",
        "zygarde-complete": "パーフェクト",
    },
    ko: {
        alola: '알로라',
        galar: '가라르',
        hisui: '히스이',
        paldea: '팔데아',
        "tauros-paldea-combat-breed": "컴뱃",
        "tauros-paldea-blaze-breed": "블레이즈",
        "tauros-paldea-aqua-breed": "워터",
        'incarnate': '화신',
        'therian': '영물',
        "gimmighoul": "상자",
        "gimmighoul-roaming": "도보",
        "zacian": "역전의 용사",
        "zacian-crowned": "검왕",
        "zamazenta": "역전의 용사",
        "zamazenta-crowned": "방패왕",
        "toxtricity-amped": "하이",
        "toxtricity-low-key": "로우",
        "average": "보통",
        "small": "작은",
        "large": "큰",
        "super": "특대",
        "zygarde-10": "10%",
        "zygarde-50": "50%",
        "zygarde-complete": "포펙트",
    },
    en: {
        alola: 'Alola',
        galar: 'Galar',
        hisui: 'Hisui',
        paldea: 'Paldea',
        "tauros-paldea-combat-breed": "Combat",
        "tauros-paldea-blaze-breed": "Blaze",
        "tauros-paldea-aqua-breed": "Aqua",
        'incarnate': 'Incarnate',
        'therian': 'Therian',
        "gimmighoul": "Chest",
        "gimmighoul-roaming": "Roaming",
        "zacian": "Hero of Many Battles",
        "zacian-crowned": "Crowned Sword",
        "zamazenta": "Hero of Many Battles",
        "zamazenta-crowned": "Crowned Shield",
        "toxtricity-amped": "Amped",
        "toxtricity-low-key": "Low Key",
        "average": "Average",
        "small": "Small",
        "large": "Large",
        "super": "Super",
        "zygarde-10": "10%",
        "zygarde-50": "50%",
        "zygarde-complete": "Complete",
    },
    fr: {
        alola: 'Alola',
        galar: 'Galar',
        hisui: 'Hisui',
        paldea: 'Paldea',
        "tauros-paldea-combat-breed": "Combative",
        "tauros-paldea-blaze-breed": "Flamboyante",
        "tauros-paldea-aqua-breed": "Aquatique",
        'incarnate': 'Avatar',
        'therian': 'Totémique',
        "gimmighoul": "Coffre",
        "gimmighoul-roaming": "Marche",
        "zacian": "Héros Aguerri",
        "zacian-crowned": "Épée Suprême",
        "zamazenta": "Héros Aguerri",
        "zamazenta-crowned": "Bouclier Suprême",
        "toxtricity-amped": "Aigüe",
        "toxtricity-low-key": "Grave",
        "average": "Normale",
        "small": "Mini",
        "large": "Maxi",
        "super": "Ultra",
        "zygarde-10": "10%",
        "zygarde-50": "50%",
        "zygarde-complete": "Parfaite",
    },
    de: {
        alola: 'Alola',
        galar: 'Galar',
        hisui: 'Hisui',
        paldea: 'Paldea',
        "tauros-paldea-combat-breed": "Gefecht",
        "tauros-paldea-blaze-breed": "Flammen",
        "tauros-paldea-aqua-breed": "Fluten",
        'incarnate': 'Inkarnations',
        'therian': 'Tiergeist',
        "gimmighoul": "Truhen",
        "gimmighoul-roaming": "Wander",
        "zacian": "Heldenhafter Krieger",
        "zacian-crowned": "König des Schwertes",
        "zamazenta": "Heldenhafter Krieger",
        "zamazenta-crowned": "König des Schildes",
        "toxtricity-amped": "Hoch",
        "toxtricity-low-key": "Tief",
        "average": "M",
        "small": "S",
        "large": "L",
        "super": "XL",
        "zygarde-10": "10%",
        "zygarde-50": "50%",
        "zygarde-complete": "Optimum",
    },
    'zh-Hant': {
        alola: '阿羅拉',
        galar: '伽勒爾',
        hisui: '洗翠',
        paldea: '帕底亞',
        "tauros-paldea-combat-breed": "鬥戰",
        "tauros-paldea-blaze-breed": "火熾",
        "tauros-paldea-aqua-breed": "水瀾",
        'incarnate': '化身',
        'therian': '靈獸',
        "gimmighoul": "寶箱",
        "gimmighoul-roaming": "徒步",
        "zacian": "百戰勇者",
        "zacian-crowned": "劍之王",
        "zamazenta": "百戰勇者",
        "zamazenta-crowned": "盾之王",
        "toxtricity-amped": "高調",
        "toxtricity-low-key": "低調",
        "average": "普通",
        "small": "小",
        "large": "大",
        "super": "特大",
        "zygarde-10": "10%",
        "zygarde-50": "50%",
        "zygarde-complete": "完全體",
    },
    'zh-Hans': {
        alola: '阿罗拉',
        galar: '伽勒尔',
        hisui: '洗翠',
        paldea: '帕底亚',
        "tauros-paldea-combat-breed": "斗战",
        "tauros-paldea-blaze-breed": "火炽",
        "tauros-paldea-aqua-breed": "水澜",
        'incarnate': '化身',
        'therian': '灵兽',
        "gimmighoul": "宝箱",
        "gimmighoul-roaming": "徒步",
        "zacian": "百战勇者",
        "zacian-crowned": "剑之王",
        "zamazenta": "百战勇者",
        "zamazenta-crowned": "盾之王",
        "toxtricity-amped": "高调",
        "toxtricity-low-key": "低调",
        "average": "普通",
        "small": "小",
        "large": "大",
        "super": "特大",
        "zygarde-10": "10%",
        "zygarde-50": "50%",
        "zygarde-complete": "完全体",
    }
}

const supportedLang = ['ja', 'ko', 'en', 'fr', 'de', 'zh-Hant', 'zh-Hans']
const regions = ['alola', 'galar', 'hisui', 'paldea']

const getRegion = (name) => {
    for (r of regions) {
        if (name.includes(`-${r}`)) return r
    }
    return undefined
}

const isExluded = (name) => {
    if (name.includes('-mega')
        || name.includes('-gmax')
        || name.includes('-totem')
        || name.includes('pikachu-')) return true
    if (['dudunsparce-three-segment', 'eternatus-eternamax', 'maushold-family-of-three', 'zygarde-10-power-construct', 'zygarde-50-power-construct'].includes(name)) return true
    return false
}


const main = async () => {
    const { data: { count: speicesCount } } = await axios.get('https://pokeapi.co/api/v2/pokemon-species')
    const { data: { results: species } } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?&limit=${speicesCount}`)
    // const { data: { results: species } } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?&limit=10&offset=120`)

    const i18n = {}
    for (l of supportedLang) {
        i18n[l] = { pokemon: {} }
    }

    // await Promise.all(species.map(async s => {
    for (const s of species) {
        const { data: { name, names, varieties } } = await axios.get(s.url)

        console.log(`${name} ${s.url}...`)
        const lang = new Set(names.map(v => v.language.name))

        varieties.forEach(v => {
            if (isExluded(v.pokemon.name)) return

            const region = getRegion(v.pokemon.name)
            for (l of supportedLang) {
                if (lang.has(l)) {
                    let pokemonI18nName = names.find(o => o.language.name === l).name
                    if (customI18n[l][v.pokemon.name]) pokemonI18nName = pokemonI18nName + `-${customI18n[l][v.pokemon.name]}`

                    // 土地雲們
                    if (v.pokemon.name.includes('-incarnate')) pokemonI18nName = pokemonI18nName + `-${customI18n[l].incarnate}`
                    if (v.pokemon.name.includes('-therian')) pokemonI18nName = pokemonI18nName + `-${customI18n[l].therian}`

                    // 南瓜精與南瓜怪人
                    if (v.pokemon.name.includes('-average')) pokemonI18nName = pokemonI18nName + `-${customI18n[l].average}`
                    if (v.pokemon.name.includes('-small')) pokemonI18nName = pokemonI18nName + `-${customI18n[l].small}`
                    if (v.pokemon.name.includes('-large')) pokemonI18nName = pokemonI18nName + `-${customI18n[l].large}`
                    if (v.pokemon.name.includes('-super')) pokemonI18nName = pokemonI18nName + `-${customI18n[l].super}`

                    if (region) pokemonI18nName = pokemonI18nName + `(${customI18n[l][region]})`

                    i18n[l].pokemon[v.pokemon.name] = pokemonI18nName
                }
            }
        })
    }
    // }))

    fs.writeFileSync('i18n/ja.json', JSON.stringify(i18n.ja), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/ko.json', JSON.stringify(i18n.ko), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/en.json', JSON.stringify(i18n.en), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/fr.json', JSON.stringify(i18n.fr), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/de.json', JSON.stringify(i18n.de), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/zh-TW.json', JSON.stringify(i18n['zh-Hant']), { encoding: 'utf8', flag: 'w' })
    fs.writeFileSync('i18n/zh-CN.json', JSON.stringify(i18n['zh-Hans']), { encoding: 'utf8', flag: 'w' })
}

main()