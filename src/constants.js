export const PARTS_OF_SPEECH = Object.freeze({
	verb: "verb",
	adjective: "adjective",
});

export const CONJUGATION_TYPES = Object.freeze({
	present: "现在时",
	past: "过去时",
	te: "て形",
	adverb: "副词形",
	volitional: "意志形",
	passive: "被动形",
	causative: "使役形",
	potential: "可能形",
	imperative: "命令形",
	causativePassive: "使役被动形",
});

// Used to calculate maxScoreObjectsV2.
// When new conjugation types are added, they should be appended to the bottom of this list.
export const orderedMaxScoreSettings = Object.freeze([
	// OG settings
	"verbu",
	"verbru",
	"verbirregular",
	"verbirregulargodan",
	"verbpresent",
	"verbpast",
	"verbte",
	"verbaffirmative",
	"verbnegative",
	"verbplain",
	"verbpolite",
	"adjectivei",
	"adjectivena",
	"adjectiveirregular",
	"adjectivepresent",
	"adjectivepast",
	"adjectiveadverb",
	"adjectiveaffirmative",
	"adjectivenegative",
	"adjectiveplain",
	"adjectivepolite",
	// 7/27/24
	"verbvolitional",
	// 8/9/24
	"verbpassive",
	"verbcausative",
	"verbpotential",
	"verbimperative",
	// 11/29/25
	"verbcausativepassive",
	// JLPT level filters
	"jlptn5",
	"jlptn4",
	"jlptn3",
	"jlptn2",
	"jlptn1",
]);
