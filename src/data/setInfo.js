import dmu_logo from '../images/setLogos/dmu_logo.png';
import snc_logo from '../images/setLogos/snc_logo.png';
import neo_logo from '../images/setLogos/neo_logo.png';
import vow_logo from '../images/setLogos/vow_logo.png';
import mid_logo from '../images/setLogos/mid_logo.png';
import j21_logo from '../images/setLogos/j21_logo.png';
import afr_logo from '../images/setLogos/afr_logo.png';
import stx_logo from '../images/setLogos/stx_logo.png';
import khm_logo from '../images/setLogos/khm_logo.png';
import klr_logo from '../images/setLogos/klr_logo.png';
import znr_logo from '../images/setLogos/znr_logo.png';
import akr_logo from '../images/setLogos/akr_logo.png';
import m21_logo from '../images/setLogos/m21_logo.png';
import iko_logo from '../images/setLogos/iko_logo.png';
import thb_logo from '../images/setLogos/thb_logo.png';
import eld_logo from '../images/setLogos/eld_logo.png';
import m20_logo from '../images/setLogos/m20_logo.png';
import war_logo from '../images/setLogos/war_logo.png';
import rna_logo from '../images/setLogos/rna_logo.png';
import grn_logo from '../images/setLogos/grn_logo.png';
import m19_logo from '../images/setLogos/m19_logo.png';
import dom_logo from '../images/setLogos/dom_logo.png';
import rix_logo from '../images/setLogos/rix_logo.png';
import xln_logo from '../images/setLogos/xln_logo.png';
import jmp_logo from '../images/setLogos/jmp_logo.png';

/**
 * The set codes of the current standard sets
 */
export const standardSets = [ "dmu", "snc", "neo", "vow", "mid" ];

/**
 * setInfo contains keys of the set ids which contain objects with:
 *    [setId].name - full set name
 *    [setId].mythic_upgrade - mythic upgrade rate
 *    [setId].collationId - booster "collationId"
    set: {
        name: "",
        mythic_upgrade: (1/7),
        collationId: X000XX,
        logo: null,
        booster: true
    },
 * Most recent sets at the top
 */
export const setInfo = {
    // ydmu: {
    //     name: "Alchemy: Dominaria",
    //     mythic_upgrade: (1/7),
    //     collationId: 400030,
    //     logo: null,
    //     booster: false
    // },
    dmu: {
        name: "Dominaria United",
        mythic_upgrade: (1/7),
        collationId: 100030,
        logo: dmu_logo,
        booster: true
    },
    hbg: {
        name: "Alchemy Horizons: Baldur's Gate",
        mythic_upgrade: (1/7),
        collationId: 100029,
        logo: null,
        booster: true
    },
    ysnc: {
        name: "Alchemy: New Capenna",
        mythic_upgrade: (1/7),
        collationId: 400028,
        logo: null,
        booster: false
    },
    snc: {
        name: "Streets of New Capenna",
        mythic_upgrade: (1/7),
        collationId: 100028,
        logo: snc_logo,
        booster: true
    },
    yneo: {
        name: "Alchemy: Kamigawa",
        mythic_upgrade: (1/9),
        collationId: 400027,
        logo: null,
        booster: false
    },
    neo: {
        name: "Kamigawa: Neon Dynasty",
        mythic_upgrade: (1/8),
        collationId: 100027,
        logo: neo_logo,
        booster: true
    },
    ymid: {
        name: "Alchemy: Innistrad",
        mythic_upgrade: (1/9.4),
        collationId: 400026,
        logo: null,
        booster: false
    },
    vow: {
        name: "Innistrad: Crimson Vow",
        mythic_upgrade: (1/7.4),
        collationId: 100026,
        logo: vow_logo,
        booster: true
    },
    mid: {
        name: "Innistrad: Midnight Hunt",
        mythic_upgrade: (1/7.4),
        collationId: 100025,
        logo: mid_logo,
        booster: true
    },
    afr: {
        name: "Adventures in the Forgotton Realms",
        mythic_upgrade: (1/7),
        collationId: 100024,
        logo: afr_logo,
        booster: true
    },
    stx: {
        name: "Strixhaven: School of Mages",
        mythic_upgrade: (1/8),
        collationId: 100023,
        logo: stx_logo,
        booster: true
    },
    sta: {
        name: "Strixhaven Mystical Archives",
        mythic_upgrade: 0.066,
        rare_rate: 0.264,
        collationId: 100023,
        logo: null,
        booster: true
    },
    khm: {
        name: "Kaldheim",
        mythic_upgrade: (1/7.4),
        collationId: 100022,
        logo: khm_logo,
        booster: true
    },
    klr: {
        name: "Kaladesh Remastered",
        mythic_upgrade: (1/7),
        collationId: 100021,
        logo: klr_logo,
        booster: true
    },
    znr: {
        name: "Zendikar Rising",
        mythic_upgrade: (1/7.4),
        collationId: 100020,
        logo: znr_logo,
        booster: true
    },
    akr: {
        name: "Amonkhet Remastered",
        mythic_upgrade: (1/6),
        collationId: 100019,
        logo: akr_logo,
        booster: true
    },
    m21: {
        name: "Core Set 2021",
        mythic_upgrade: (1/8),
        collationId: 100018,
        logo: m21_logo,
        booster: true
    },
    iko: {
        name: "Ikoria: Lair of Behemoths",
        mythic_upgrade: (1/8),
        collationId: 100017,
        logo: iko_logo,
        booster: true
    },
    thb: {
        name: "Theros Beyond Death",
        mythic_upgrade: (1/8),
        collationId: 100016,
        logo: thb_logo,
        booster: true
    },
    eld: {
        name:"Throne of Eldraine",
        mythic_upgrade: (1/8),
        collationId: 100015,
        logo: eld_logo,
        booster: true
    },
    m20: {
        name: "Core Set 2020",
        mythic_upgrade: (1/8),
        collationId: 100014,
        logo: m20_logo,
        booster: true
    },
    war: {
        name: "War of the Spark",
        mythic_upgrade: (1/8),
        collationId: 100013,
        logo: war_logo,
        booster: true
    },
    rna: {
        name: "Ravnica Allegiance",
        mythic_upgrade: (1/8),
        collationId: 100010,
        logo: rna_logo,
        booster: true
    },
    grn: {
        name: "Guilds of Ravnica",
        mythic_upgrade: (1/8),
        collationId: 100009,
        logo: grn_logo,
        booster: true
    },
    m19: {
        name: "Core Set 2019",
        mythic_upgrade: (1/8),
        collationId: 100008,
        logo: m19_logo,
        booster: true
    },
    // "dom" also uses set code "dar"
    dom: {
        name: "Dominaria",
        mythic_upgrade: (1/8),
        collationId: 100007,
        logo: dom_logo,
        booster: true
    },
    rix: {
        name: "Rivals of Ixalan",
        mythic_upgrade: (1/8),
        collationId: 100006,
        logo: rix_logo,
        booster: true
    },
    xln: {
        name: "Ixalan",
        mythic_upgrade: (1/8),
        collationId: 100005,
        logo: xln_logo,
        booster: true
    },
    ha1: {
        name: "Historic Anthology",
        mythic_upgrade: null,
        collationId: null,
        logo: null,
        booster: false
    },
    ha2: {
        name: "Historic Anthology 2",
        mythic_upgrade: null,
        collationId: null,
        logo: null,
        booster: false
    },
    ha3: {
        name: "Historic Anthology 3",
        mythic_upgrade: null,
        collationId: null,
        logo: null,
        booster: false
    },
    ha4: {
        name: "Historic Anthology 4",
        mythic_upgrade: null,
        collationId: null,
        logo: null,
        booster: false
    },
    ha5: {
        name: "Historic Anthology 5",
        mythic_upgrade: null,
        collationId: null,
        logo: null,
        booster: false
    },
    jmp: {
        name: "Jumpstart",
        mythic_upgrade: null,
        collationId: null,
        logo: jmp_logo,
        booster: true
    },
    j21: {
        name: "Jumpstart: Historic Horizons",
        mythic_upgrade: null,
        collationId: null,
        logo: j21_logo,
        booster: true
    },
}

/**
 * The set codes of historic sets in MTG Arena
 */
export const historicSets = Object.keys(setInfo);