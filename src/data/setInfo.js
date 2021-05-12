import stx_logo from '../images/setLogos/stx_logo.png';
import khm_logo from '../images/setLogos/khm_logo.png';
import znr_logo from '../images/setLogos/znr_logo.png';
import akr_logo from '../images/setLogos/akr_logo.png';
import m21_logo from '../images/setLogos/m21_logo.png';
import iko_logo from '../images/setLogos/iko_logo.png';
import thb_logo from '../images/setLogos/thb_logo.png';
import eld_logo from '../images/setLogos/eld_logo.png';
import m20_logo from '../images/setLogos/m20_logo.png';
import war_logo from '../images/setLogos/war_logo.png';

/**
 * The set codes of the current standard sets
 */
export const standardSets = ["stx", "khm", "znr", "m21", "iko", "thb", "eld"];

/**
 * setInfo contains keys of the set ids which contain objects with:
 *    [setId].name - full set name
 *    [setId].mythic_upgrade - mythic upgrade rate
 *    [setId].collationId - booster "collationId"
 * Most recent sets at the top
 */
export const setInfo = {
    stx: {
        name: "Strixhaven: School of Mages",
        mythic_upgrade: (1/8),
        collationId: 100023,
        logo: stx_logo
    },
    khm: {
        name: "Kaldheim",
        mythic_upgrade: (1/7.4),
        collationId: 100022,
        logo: khm_logo
    },
    klr: {
        name: "Kaladesh Remastered",
        mythic_upgrade: (1/7),
        collationId: 100021
    },
    znr: {
        name: "Zendikar Rising",
        mythic_upgrade: (1/7.4),
        collationId: 100020,
        logo: znr_logo
    },
    akr: {
        name: "Amonkhet Remastered",
        mythic_upgrade: (1/6),
        collationId: 100019,
        logo: akr_logo
    },
    m21: {
        name: "Core Set 2021",
        mythic_upgrade: (1/8),
        collationId: 100018,
        logo: m21_logo
    },
    iko: {
        name: "Ikoria: Lair of Behemoths",
        mythic_upgrade: (1/8),
        collationId: 100017,
        logo: iko_logo
    },
    thb: {
        name: "Theros Beyond Death",
        mythic_upgrade: (1/8),
        collationId: 100016,
        logo: thb_logo
    },
    eld: {
        name:"Throne of Eldraine",
        mythic_upgrade: (1/8),
        collationId: 100015,
        logo: eld_logo
    },
    m20: {
        name: "Core Set 2020",
        mythic_upgrade: (1/8),
        collationId: 100014,
        logo: m20_logo
    },
    war: {
        name: "War of the Spark",
        mythic_upgrade: (1/8),
        collationId: 100013,
        logo: war_logo
    },
    rna: {
        name: "Ravnica Allegiance",
        mythic_upgrade: (1/8),
        collationId: 100010
    },
    grn: {
        name: "Guilds of Ravnica",
        mythic_upgrade: (1/8),
        collationId: 100009
    },
    m19: {
        name: "Core Set 2019",
        mythic_upgrade: (1/8),
        collationId: 100008
    },
    // "dom" also uses set code "dar"
    dom: {
        name: "Dominaria",
        mythic_upgrade: (1/8),
        collationId: 100007
    },
    rix: {
        name: "Rivals of Ixalan",
        mythic_upgrade: (1/8),
        collationId: 100006
    },
    xln: {
        name: "Ixalan",
        mythic_upgrade: (1/8),
        collationId: 100005
    }
}

/**
 * The set codes of historic sets in MTG Arena
 */
export const historicSets = Object.keys(setInfo);