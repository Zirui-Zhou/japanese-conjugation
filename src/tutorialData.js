import { CONJUGATION_TYPES } from "./constants.js";

// Key helper: generates lookup key from word properties
export function getTutorialKey(wordType, conjugationType, affirmative, polite) {
	return `${wordType}-${conjugationType}-${affirmative}-${polite}`;
}

// Comprehensive tutorial sections (for rendering the full tutorial view)
export const tutorialSections = [
	{
		title: "五段动词（う动词）",
		description:
			"五段动词的词尾在あ、い、う、え、お五个段上变化。变形时，词尾假名在对应的段之间切换。",
		groups: [
			{
				title: "现在时",
				rules: [
					{
						key: "u-present-true-false",
						title: "现在时 · 肯定 · 简体",
						formula: "字典形（原形）",
						explanation:
							"五段动词的现在时肯定简体即为字典形本身，无需任何变化。",
						example: "書く → 書く",
					},
					{
						key: "u-present-true-true",
						title: "现在时 · 肯定 · 敬体",
						formula: "い段 + ます",
						explanation:
							"将词尾的う段假名变为对应的い段假名，然后接「ます」。",
						example: "書く → 書きます",
					},
					{
						key: "u-present-false-false",
						title: "现在时 · 否定 · 简体",
						formula: "あ段 + ない",
						explanation:
							"将词尾的う段假名变为对应的あ段假名，然后接「ない」。注意：う变为わ。",
						example: "書く → 書かない",
					},
					{
						key: "u-present-false-true",
						title: "现在时 · 否定 · 敬体",
						formula: "い段 + ません　或　あ段 + ないです",
						explanation:
							"方式一：将词尾变为い段 + ません。方式二：ない形 + です。",
						example: "書く → 書けません / 書かないです",
					},
				],
			},
			{
				title: "过去时",
				rules: [
					{
						key: "u-past-true-false",
						title: "过去时 · 肯定 · 简体",
						formula: "た形（音变）",
						explanation:
							"根据词尾假名发生音变：す→した、く→いた、ぐ→いだ、む/ぶ/ぬ→んだ、る/う/つ→った。",
						example: "書く→書いた、話す→話した、読む→読んだ",
					},
					{
						key: "u-past-true-true",
						title: "过去时 · 肯定 · 敬体",
						formula: "い段 + ました",
						explanation:
							"将词尾变为い段假名，然后接「ました」。",
						example: "書く → 書きました",
					},
					{
						key: "u-past-false-false",
						title: "过去时 · 否定 · 简体",
						formula: "あ段 + なかった",
						explanation:
							"在ない形的基础上，将「ない」变为「なかった」。",
						example: "書く → 書かなかった",
					},
					{
						key: "u-past-false-true",
						title: "过去时 · 否定 · 敬体",
						formula: "い段 + ませんでした　或　あ段 + なかったです",
						explanation:
							"方式一：い段 + ませんでした。方式二：なかった形 + です。",
						example: "書く → 書けませんでした / 書かなかったです",
					},
				],
			},
			{
				title: "て形",
				rules: [
					{
						key: "u-te-null-null",
						title: "て形",
						formula: "て形（音变）",
						explanation:
							"根据词尾发生音变：う/つ/る→って、む/ぶ/ぬ→んで、く→いて、ぐ→いで、す→して。",
						example: "書く→書いて、話す→話して、読む→読んで、待つ→待って",
					},
				],
			},
			{
				title: "意志形",
				rules: [
					{
						key: "u-volitional-null-false",
						title: "意志形 · 简体",
						formula: "お段 + う",
						explanation:
							"将词尾的う段假名变为对应的お段假名，然后接「う」。",
						example: "書く → 書こう",
					},
					{
						key: "u-volitional-null-true",
						title: "意志形 · 敬体",
						formula: "い段 + ましょう",
						explanation:
							"将词尾变为い段假名，然后接「ましょう」。",
						example: "書く → 書きましょう",
					},
				],
			},
			{
				title: "被动形",
				rules: [
					{
						key: "u-passive-true-false",
						title: "被动形 · 肯定 · 简体",
						formula: "あ段 + れる",
						explanation:
							"将词尾变为あ段假名，然后接「れる」。",
						example: "書く → 書かれる",
					},
					{
						key: "u-passive-true-true",
						title: "被动形 · 肯定 · 敬体",
						formula: "あ段 + れます",
						explanation:
							"将词尾变为あ段假名，然后接「れます」。",
						example: "書く → 書かれます",
					},
					{
						key: "u-passive-false-false",
						title: "被动形 · 否定 · 简体",
						formula: "あ段 + れない",
						explanation:
							"将词尾变为あ段假名，然后接「れない」。",
						example: "書く → 書かれない",
					},
					{
						key: "u-passive-false-true",
						title: "被动形 · 否定 · 敬体",
						formula: "あ段 + れません",
						explanation:
							"将词尾变为あ段假名，然后接「れません」。",
						example: "書く → 書かれません",
					},
				],
			},
			{
				title: "使役形",
				rules: [
					{
						key: "u-causative-true-false",
						title: "使役形 · 肯定 · 简体",
						formula: "あ段 + せる",
						explanation:
							"将词尾变为あ段假名，然后接「せる」。",
						example: "書く → 書かせる",
					},
					{
						key: "u-causative-true-true",
						title: "使役形 · 肯定 · 敬体",
						formula: "あ段 + せます",
						explanation:
							"将词尾变为あ段假名，然后接「せます」。",
						example: "書く → 書かせます",
					},
					{
						key: "u-causative-false-false",
						title: "使役形 · 否定 · 简体",
						formula: "あ段 + せない",
						explanation:
							"将词尾变为あ段假名，然后接「せない」。",
						example: "書く → 書かせない",
					},
					{
						key: "u-causative-false-true",
						title: "使役形 · 否定 · 敬体",
						formula: "あ段 + せません",
						explanation:
							"将词尾变为あ段假名，然后接「せません」。",
						example: "書く → 書かせません",
					},
				],
			},
			{
				title: "使役被动形",
				rules: [
					{
						key: "u-causativePassive-true-false",
						title: "使役被动形 · 肯定 · 简体",
						formula: "あ段 + せられる（/される）",
						explanation:
							"将词尾变为あ段假名，接「せられる」。非す结尾的动词也可用省略形「される」。",
						example: "書く → 書かせられる / 書かされる",
					},
					{
						key: "u-causativePassive-true-true",
						title: "使役被动形 · 肯定 · 敬体",
						formula: "あ段 + せられます（/されます）",
						explanation:
							"将词尾变为あ段假名，接「せられます」或「されます」。",
						example: "書く → 書かせられます / 書かされます",
					},
					{
						key: "u-causativePassive-false-false",
						title: "使役被动形 · 否定 · 简体",
						formula: "あ段 + せられない（/されない）",
						explanation:
							"将词尾变为あ段假名，接「せられない」或「されない」。",
						example: "書く → 書かせられない / 書かされない",
					},
					{
						key: "u-causativePassive-false-true",
						title: "使役被动形 · 否定 · 敬体",
						formula: "あ段 + せられません（/されません）",
						explanation:
							"将词尾变为あ段假名，接「せられません」或「されません」。",
						example: "書く → 書かせられません / 書かされません",
					},
				],
			},
			{
				title: "可能形",
				rules: [
					{
						key: "u-potential-true-false",
						title: "可能形 · 肯定 · 简体",
						formula: "え段 + る",
						explanation:
							"将词尾的う段假名变为对应的え段假名，然后接「る」。",
						example: "書く → 書ける",
					},
					{
						key: "u-potential-true-true",
						title: "可能形 · 肯定 · 敬体",
						formula: "え段 + ます",
						explanation:
							"将词尾变为え段假名，然后接「ます」。",
						example: "書く → 書けます",
					},
					{
						key: "u-potential-false-false",
						title: "可能形 · 否定 · 简体",
						formula: "え段 + ない",
						explanation:
							"将词尾变为え段假名，然后接「ない」。",
						example: "書く → 書けない",
					},
					{
						key: "u-potential-false-true",
						title: "可能形 · 否定 · 敬体",
						formula: "え段 + ません",
						explanation:
							"将词尾变为え段假名，然后接「ません」。",
						example: "書く → 書けません",
					},
				],
			},
			{
				title: "命令形",
				rules: [
					{
						key: "u-imperative-null-null",
						title: "命令形",
						formula: "え段",
						explanation:
							"将词尾的う段假名变为对应的え段假名即可。命令形没有肯定/否定和简体/敬体的区分。",
						example: "書く → 書け",
					},
				],
			},
		],
	},
	{
		title: "一段动词（る动词）",
		description:
			"一段动词的词尾均为「る」，且倒数第二个假名在い段或え段。变形时只需去掉「る」再加各种词尾。",
		groups: [
			{
				title: "现在时",
				rules: [
					{
						key: "ru-present-true-false",
						title: "现在时 · 肯定 · 简体",
						formula: "字典形（原形）",
						explanation:
							"一段动词的现在时肯定简体即为字典形本身（以る结尾）。",
						example: "食べる → 食べる",
					},
					{
						key: "ru-present-true-true",
						title: "现在时 · 肯定 · 敬体",
						formula: "去る + ます",
						explanation: "去掉词尾的「る」，然后接「ます」。",
						example: "食べる → 食べます",
					},
					{
						key: "ru-present-false-false",
						title: "现在时 · 否定 · 简体",
						formula: "去る + ない",
						explanation: "去掉词尾的「る」，然后接「ない」。",
						example: "食べる → 食べない",
					},
					{
						key: "ru-present-false-true",
						title: "现在时 · 否定 · 敬体",
						formula: "去る + ません　或　去る + ないです",
						explanation:
							"方式一：去る + ません。方式二：去る + ないです。",
						example: "食べる → 食べません / 食べないです",
					},
				],
			},
			{
				title: "过去时",
				rules: [
					{
						key: "ru-past-true-false",
						title: "过去时 · 肯定 · 简体",
						formula: "去る + た",
						explanation: "去掉词尾的「る」，然后接「た」。",
						example: "食べる → 食べた",
					},
					{
						key: "ru-past-true-true",
						title: "过去时 · 肯定 · 敬体",
						formula: "去る + ました",
						explanation: "去掉词尾的「る」，然后接「ました」。",
						example: "食べる → 食べました",
					},
					{
						key: "ru-past-false-false",
						title: "过去时 · 否定 · 简体",
						formula: "去る + なかった",
						explanation:
							"去掉词尾的「る」，然后接「なかった」。",
						example: "食べる → 食べなかった",
					},
					{
						key: "ru-past-false-true",
						title: "过去时 · 否定 · 敬体",
						formula: "去る + ませんでした　或　去る + なかったです",
						explanation:
							"方式一：去る + ませんでした。方式二：去る + なかったです。",
						example: "食べる → 食べませんでした / 食べなかったです",
					},
				],
			},
			{
				title: "て形",
				rules: [
					{
						key: "ru-te-null-null",
						title: "て形",
						formula: "去る + て",
						explanation:
							"去掉词尾的「る」，然后接「て」。一段动词的て形没有音变。",
						example: "食べる → 食べて",
					},
				],
			},
			{
				title: "意志形",
				rules: [
					{
						key: "ru-volitional-null-false",
						title: "意志形 · 简体",
						formula: "去る + よう",
						explanation: "去掉词尾的「る」，然后接「よう」。",
						example: "食べる → 食べよう",
					},
					{
						key: "ru-volitional-null-true",
						title: "意志形 · 敬体",
						formula: "去る + ましょう",
						explanation: "去掉词尾的「る」，然后接「ましょう」。",
						example: "食べる → 食べましょう",
					},
				],
			},
			{
				title: "被动形",
				rules: [
					{
						key: "ru-passive-true-false",
						title: "被动形 · 肯定 · 简体",
						formula: "去る + られる",
						explanation: "去掉词尾的「る」，然后接「られる」。",
						example: "食べる → 食べられる",
					},
					{
						key: "ru-passive-true-true",
						title: "被动形 · 肯定 · 敬体",
						formula: "去る + られます",
						explanation: "去掉词尾的「る」，然后接「られます」。",
						example: "食べる → 食べられます",
					},
					{
						key: "ru-passive-false-false",
						title: "被动形 · 否定 · 简体",
						formula: "去る + られない",
						explanation: "去掉词尾的「る」，然后接「られない」。",
						example: "食べる → 食べられない",
					},
					{
						key: "ru-passive-false-true",
						title: "被动形 · 否定 · 敬体",
						formula: "去る + られません",
						explanation:
							"去掉词尾的「る」，然后接「られません」。",
						example: "食べる → 食べられません",
					},
				],
			},
			{
				title: "使役形",
				rules: [
					{
						key: "ru-causative-true-false",
						title: "使役形 · 肯定 · 简体",
						formula: "去る + させる",
						explanation: "去掉词尾的「る」，然后接「させる」。",
						example: "食べる → 食べさせる",
					},
					{
						key: "ru-causative-true-true",
						title: "使役形 · 肯定 · 敬体",
						formula: "去る + させます",
						explanation: "去掉词尾的「る」，然后接「させます」。",
						example: "食べる → 食べさせます",
					},
					{
						key: "ru-causative-false-false",
						title: "使役形 · 否定 · 简体",
						formula: "去る + させない",
						explanation: "去掉词尾的「る」，然后接「させない」。",
						example: "食べる → 食べさせない",
					},
					{
						key: "ru-causative-false-true",
						title: "使役形 · 否定 · 敬体",
						formula: "去る + させません",
						explanation:
							"去掉词尾的「る」，然后接「させません」。",
						example: "食べる → 食べさせません",
					},
				],
			},
			{
				title: "使役被动形",
				rules: [
					{
						key: "ru-causativePassive-true-false",
						title: "使役被动形 · 肯定 · 简体",
						formula: "去る + させられる",
						explanation:
							"去掉词尾的「る」，然后接「させられる」。",
						example: "食べる → 食べさせられる",
					},
					{
						key: "ru-causativePassive-true-true",
						title: "使役被动形 · 肯定 · 敬体",
						formula: "去る + させられます",
						explanation:
							"去掉词尾的「る」，然后接「させられます」。",
						example: "食べる → 食べさせられます",
					},
					{
						key: "ru-causativePassive-false-false",
						title: "使役被动形 · 否定 · 简体",
						formula: "去る + させられない",
						explanation:
							"去掉词尾的「る」，然后接「させられない」。",
						example: "食べる → 食べさせられない",
					},
					{
						key: "ru-causativePassive-false-true",
						title: "使役被动形 · 否定 · 敬体",
						formula: "去る + させられません",
						explanation:
							"去掉词尾的「る」，然后接「させられません」。",
						example: "食べる → 食べさせられません",
					},
				],
			},
			{
				title: "可能形",
				rules: [
					{
						key: "ru-potential-true-false",
						title: "可能形 · 肯定 · 简体",
						formula: "去る + られる（口语中常省略ら，变为れる）",
						explanation:
							"标准形：去る + られる。口语中常省略「ら」，变为「れる」。两者均可接受。",
						example: "食べる → 食べられる / 食べれる",
					},
					{
						key: "ru-potential-true-true",
						title: "可能形 · 肯定 · 敬体",
						formula: "去る + られます（/れます）",
						explanation:
							"标准形：去る + られます。口语省略形：去る + れます。",
						example: "食べる → 食べられます / 食べれます",
					},
					{
						key: "ru-potential-false-false",
						title: "可能形 · 否定 · 简体",
						formula: "去る + られない（/れない）",
						explanation:
							"标准形：去る + られない。口语省略形：去る + れない。",
						example: "食べる → 食べられない / 食べれない",
					},
					{
						key: "ru-potential-false-true",
						title: "可能形 · 否定 · 敬体",
						formula: "去る + られません（/れません）",
						explanation:
							"标准形：去る + られません。口语省略形：去る + れません。",
						example: "食べる → 食べられません / 食べれません",
					},
				],
			},
			{
				title: "命令形",
				rules: [
					{
						key: "ru-imperative-null-null",
						title: "命令形",
						formula: "去る + ろ / よ",
						explanation:
							"去掉词尾的「る」，然后接「ろ」或「よ」。口语中多用「ろ」，书面语中多用「よ」。",
						example: "食べる → 食べろ / 食べよ",
					},
				],
			},
		],
	},
	{
		title: "不规则动词",
		description:
			"不规则动词的变形不遵循五段或一段的规律，需要单独记忆。主要有：する（做）、来る（来）、行く（去）、ある（有/存在）。",
		groups: [
			{
				title: "する（做）— 核心变形",
				rules: [
					{
						key: "irv-suru-present",
						title: "现在时",
						formula: "する / します / しない / しません",
						explanation:
							"肯定简体：する / 肯定敬体：します / 否定简体：しない / 否定敬体：しません（或しないです）。",
						example: "勉強する → 勉強します",
					},
					{
						key: "irv-suru-past",
						title: "过去时",
						formula: "した / しました / しなかった / しませんでした",
						explanation:
							"肯定简体：した / 肯定敬体：しました / 否定简体：しなかった / 否定敬体：しませんでした。",
						example: "勉強する → 勉強した",
					},
					{
						key: "irv-suru-te",
						title: "て形",
						formula: "して",
						explanation: "する的て形为「して」。",
						example: "勉強する → 勉強して",
					},
					{
						key: "irv-suru-volitional",
						title: "意志形",
						formula: "しよう / しましょう",
						explanation:
							"简体：しよう / 敬体：しましょう。",
						example: "勉強する → 勉強しよう",
					},
					{
						key: "irv-suru-passive",
						title: "被动形",
						formula: "される / されます / されない / されません",
						explanation: "する的被动形以「される」为基本形。",
						example: "勉強する → 勉強される",
					},
					{
						key: "irv-suru-causative",
						title: "使役形",
						formula: "させる / させます / させない / させません",
						explanation: "する的使役形以「させる」为基本形。",
						example: "勉強する → 勉強させる",
					},
					{
						key: "irv-suru-causativePassive",
						title: "使役被动形",
						formula: "させられる / させられます",
						explanation:
							"する的使役被动形以「させられる」为基本形。",
						example: "勉強する → 勉強させられる",
					},
					{
						key: "irv-suru-potential",
						title: "可能形",
						formula: "できる / できます / できない / できません",
						explanation:
							"する的可能形为「できる」（也可写作「出来る」）。",
						example: "勉強する → 勉強できる",
					},
					{
						key: "irv-suru-imperative",
						title: "命令形",
						formula: "しろ / せよ",
						explanation:
							"する的命令形为「しろ」（口语）或「せよ」（书面语）。",
						example: "勉強する → 勉強しろ",
					},
				],
			},
			{
				title: "来る（来）— 核心变形",
				rules: [
					{
						key: "irv-kuru-present",
						title: "现在时",
						formula:
							"くる / きます / こない / きません（/こないです）",
						explanation:
							"くる的变形涉及く/き/こ/来等不同读音。肯定简体：くる / 肯定敬体：きます / 否定简体：こない / 否定敬体：きません。",
						example: "来る → きます",
					},
					{
						key: "irv-kuru-past",
						title: "过去时",
						formula:
							"きた / きました / こなかった / きませんでした",
						explanation:
							"肯定简体：きた / 肯定敬体：きました / 否定简体：こなかった / 否定敬体：きませんでした。",
						example: "来る → きました",
					},
					{
						key: "irv-kuru-te",
						title: "て形",
						formula: "きて",
						explanation: "来る的て形为「きて」。",
						example: "来る → きて",
					},
					{
						key: "irv-kuru-volitional",
						title: "意志形",
						formula: "こよう / きましょう",
						explanation: "简体：こよう / 敬体：きましょう。",
						example: "来る → こよう",
					},
					{
						key: "irv-kuru-passive",
						title: "被动形",
						formula: "こられる / こられます",
						explanation: "来る的被动形为「こられる」。",
						example: "来る → こられる",
					},
					{
						key: "irv-kuru-causative",
						title: "使役形",
						formula: "こさせる / こさせます",
						explanation: "来る的使役形为「こさせる」。",
						example: "来る → こさせる",
					},
					{
						key: "irv-kuru-potential",
						title: "可能形",
						formula: "こられる（/これる）",
						explanation:
							"来る的可能形标准形为「こられる」，口语中也可说「これる」。",
						example: "来る → こられる / これる",
					},
					{
						key: "irv-kuru-imperative",
						title: "命令形",
						formula: "こい",
						explanation: "来る的命令形为「こい」。",
						example: "来る → こい",
					},
				],
			},
			{
				title: "行く（去）— 特殊点",
				rules: [
					{
						key: "irv-iku-te",
						title: "て形 / 过去简体（特殊）",
						formula: "行って / 行った",
						explanation:
							"行く的て形不是「行いて」而是「行って」（音变为促音），这是行く的特殊之处。过去简体同理：行った。",
						example: "行く → 行って / 行った",
					},
				],
			},
			{
				title: "ある（有/存在）— 特殊点",
				rules: [
					{
						key: "irv-aru-negative",
						title: "否定形（特殊）",
						formula: "ない（而非あらない）",
						explanation:
							"ある的否定简体是「ない」而非「あらない」，这是ある唯一的特殊之处。其他变形基本遵循五段规律。",
						example: "ある → ない（✗ あらない）",
					},
				],
			},
		],
	},
	{
		title: "い形容词",
		description:
			"い形容词以「い」结尾。变形时去掉词尾的「い」，再加上各种活用词尾。注意：いい（好）是不规则变化，使用「よい/良」作为词干。",
		groups: [
			{
				title: "现在时",
				rules: [
					{
						key: "i-present-true-false",
						title: "现在时 · 肯定 · 简体",
						formula: "字典形（原形）",
						explanation:
							"い形容词的现在时肯定简体即为字典形本身。",
						example: "高い → 高い",
					},
					{
						key: "i-present-true-true",
						title: "现在时 · 肯定 · 敬体",
						formula: "字典形 + です",
						explanation: "在字典形后直接加「です」。",
						example: "高い → 高いです",
					},
					{
						key: "i-present-false-false",
						title: "现在时 · 否定 · 简体",
						formula: "去い + くない",
						explanation: "去掉词尾「い」，加「くない」。",
						example: "高い → 高くない",
					},
					{
						key: "i-present-false-true",
						title: "现在时 · 否定 · 敬体",
						formula: "去い + くないです　或　去い + くありません",
						explanation:
							"方式一：去い + くないです。方式二：去い + くありません（更正式）。",
						example: "高い → 高くないです / 高くありません",
					},
				],
			},
			{
				title: "过去时",
				rules: [
					{
						key: "i-past-true-false",
						title: "过去时 · 肯定 · 简体",
						formula: "去い + かった",
						explanation: "去掉词尾「い」，加「かった」。",
						example: "高い → 高かった",
					},
					{
						key: "i-past-true-true",
						title: "过去时 · 肯定 · 敬体",
						formula: "去い + かったです",
						explanation: "去掉词尾「い」，加「かったです」。",
						example: "高い → 高かったです",
					},
					{
						key: "i-past-false-false",
						title: "过去时 · 否定 · 简体",
						formula: "去い + くなかった",
						explanation:
							"去掉词尾「い」，加「くなかった」。",
						example: "高い → 高くなかった",
					},
					{
						key: "i-past-false-true",
						title: "过去时 · 否定 · 敬体",
						formula:
							"去い + くなかったです　或　去い + くありませんでした",
						explanation:
							"方式一：去い + くなかったです。方式二：去い + くありませんでした（更正式）。",
						example:
							"高い → 高くなかったです / 高くありませんでした",
					},
				],
			},
			{
				title: "副词形",
				rules: [
					{
						key: "i-adverb-null-null",
						title: "副词形",
						formula: "去い + く",
						explanation:
							"去掉词尾「い」，加「く」。用于修饰动词。",
						example: "高い → 高く（飛ぶ）",
					},
				],
			},
		],
	},
	{
		title: "な形容词",
		description:
			"な形容词（形容动词）不以「い」结尾。变形时在词干后加各种活用词尾，词干本身不变。",
		groups: [
			{
				title: "现在时",
				rules: [
					{
						key: "na-present-true-false",
						title: "现在时 · 肯定 · 简体",
						formula: "词干 + だ",
						explanation:
							"な形容词的简体肯定需要加「だ」。注意：字典形通常不写だ。",
						example: "静か → 静かだ",
					},
					{
						key: "na-present-true-true",
						title: "现在时 · 肯定 · 敬体",
						formula: "词干 + です",
						explanation: "在词干后直接加「です」。",
						example: "静か → 静かです",
					},
					{
						key: "na-present-false-false",
						title: "现在时 · 否定 · 简体",
						formula: "词干 + じゃない / ではない",
						explanation:
							"口语：词干 + じゃない。书面/正式：词干 + ではない。",
						example: "静か → 静かじゃない / 静かではない",
					},
					{
						key: "na-present-false-true",
						title: "现在时 · 否定 · 敬体",
						formula: "词干 + じゃないです / ではないです / じゃありません / ではありません",
						explanation:
							"四种表达方式，从口语到正式排列。じゃないです最口语化，ではありません最正式。",
						example: "静か → 静かじゃないです / 静かではありません",
					},
				],
			},
			{
				title: "过去时",
				rules: [
					{
						key: "na-past-true-false",
						title: "过去时 · 肯定 · 简体",
						formula: "词干 + だった",
						explanation: "在词干后加「だった」。",
						example: "静か → 静かだった",
					},
					{
						key: "na-past-true-true",
						title: "过去时 · 肯定 · 敬体",
						formula: "词干 + でした",
						explanation: "在词干后加「でした」。",
						example: "静か → 静かでした",
					},
					{
						key: "na-past-false-false",
						title: "过去时 · 否定 · 简体",
						formula: "词干 + じゃなかった / ではなかった",
						explanation:
							"在词干后加「じゃなかった」或更正式的「ではなかった」。",
						example: "静か → 静かじゃなかった / 静かではなかった",
					},
					{
						key: "na-past-false-true",
						title: "过去时 · 否定 · 敬体",
						formula: "词干 + じゃなかったです / ではなかったです / じゃありませんでした / ではありませんでした",
						explanation:
							"四种表达方式，从口语到正式排列。",
						example: "静か → 静かじゃなかったです / 静かではありませんでした",
					},
				],
			},
			{
				title: "副词形",
				rules: [
					{
						key: "na-adverb-null-null",
						title: "副词形",
						formula: "词干 + に",
						explanation:
							"在词干后加「に」。用于修饰动词。",
						example: "静か → 静かに（話す）",
					},
				],
			},
		],
	},
	{
		title: "不规则形容词",
		description:
			"少数形容词变形不遵循常规规律，最典型的是「いい」（好）。",
		groups: [
			{
				title: "いい（好）",
				rules: [
					{
						key: "ira-ii-present",
						title: "现在时",
						formula: "いい / よい（良い）/ よくない / よくありません",
						explanation:
							"いい的变形基于古语词干「よい/良」。肯定：いい或良い。否定：よくない或良くない。",
						example: "いい → よくない",
					},
					{
						key: "ira-ii-past",
						title: "过去时",
						formula: "よかった / よくなかった",
						explanation:
							"过去时完全基于「よい」的词干变形。肯定：よかった。否定：よくなかった。",
						example: "いい → よかった",
					},
					{
						key: "ira-ii-adverb",
						title: "副词形",
						formula: "よく（良く）",
						explanation:
							"いい的副词形为「よく」（基于よい的词干）。",
						example: "いい → よく（できた）",
					},
				],
			},
		],
	},
];

// Build a flat lookup map from the tutorial sections
export const tutorialRuleMap = {};
for (const section of tutorialSections) {
	for (const group of section.groups) {
		for (const rule of group.rules) {
			tutorialRuleMap[rule.key] = rule;
		}
	}
}
