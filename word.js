var text = '{"employees":[' +
    '{ "en" : "apple",  "jp" : "リンゴ",  "check" : "0" },' +
    '{ "en" : "lemon",  "jp" : "レモン",  "check" : "0" },' +
    '{ "en" : "strawberry",  "jp" : "イチゴ",  "check" : "0" },' +
    '{ "en" : "orange",  "jp" : "オレンジ",  "check" : "0" },' +
    '{ "en" : "cherry",  "jp" : "サクランボ",  "check" : "0" },' +
    '{ "en" : "pear",  "jp" : "梨",  "check" : "0" },' +
    '{ "en" : "grape",  "jp" : "ブドウ",  "check" : "0" },' +
    '{ "en" : "pineapple",  "jp" : "パイナップル",  "check" : "0" },' +
    '{ "en" : "kiwi",  "jp" : "キウイ",  "check" : "0" },' +
    '{ "en" : "raspberry",  "jp" : "ラズベリー",  "check" : "0" },' +
    '{ "en" : "banana",  "jp" : "バナナ",  "check" : "0" }]}';

var test1='{"employees":['+
 	  '{  "en" : "buck",  "jp" : "大部分/容積",  "check" : "0" },'+
	  '{  "en" : "deposit",  "jp" : "預金する",  "check" : "0" },'+
	  '{  "en" : "deserve",  "jp" : "～にふさわしい",  "check" : "0" },'+
	  '{  "en" : "geology",  "jp" : "地質学",  "check" : "0"  },'+
	  '{  "en" : "justice",  "jp" : "正義",  "check" : "0"  },'+
    '{  "en" : "refine",  "jp" : "精製する",  "check" : "0"  },'+
    '{  "en" : "seismic",  "jp" : "地震の",  "check" : "0" },'+
    '{  "en" : "shed",  "jp" : "涙などを流す",  "check" : "0"  },'+
    '{  "en" : "universal",  "jp" : "普遍的な",  "check" : "0"  },'+
    '{  "en" : "weave",  "jp" : "編む",  "check" : "0"  },'+
    '{  "en" : "obey",  "jp" : "従う",  "check" : "0" },'+
    '{  "en" : "optimistic",  "jp" : "楽観的な",  "check" : "0"  },'+
    '{  "en" : "phrase",  "jp" : "語句",  "check" : "0"  },'+
    '{  "en" : "provoke",  "jp" : "誘発する",  "check" : "0" },'+
    '{  "en" : "withdraw",  "jp" : "撤退する",  "check" : "0"  },'+
    '{  "en" : "engage",  "jp" : "参加する",  "check" : "0"  },'+
    '{  "en" : "illuminate",  "jp" : "照らす",  "check" : "0"  },'+
    '{  "en" : "inevitable",  "jp" : "避けられない",  "check" : "0"  },'+
    '{  "en" : "momentum",  "jp" : "運動量",  "check" : "0"  },'+
    '{  "en" : "obscure",  "jp" : "不明瞭な",  "check" : "0"  }]}';

var test2='{"employees":['+
    '{  "en" : "emotion",  "jp" : "感情",  "check" : "0"  },'+
	  '{  "en" : "breakdown",  "jp" : "故障",  "check" : "0"  },'+
    '{  "en" : "carrier",  "jp" : "運び役",  "check" : "0"  },'+
    '{  "en" : "childhood",  "jp" : "子供時代",  "check" : "0"  },'+
    '{  "en" : "detergent",  "jp" : "洗剤",  "check" : "0"  },'+
    '{  "en" : "distort",  "jp" : "ゆがめる",  "check" : "0"  },'+
    '{  "en" : "heritage",  "jp" : "遺産",  "check" : "0"  },'+
    '{  "en" : "participate",  "jp" : "参加する",  "check" : "0"  },'+
    '{  "en" : "session",  "jp" : "会議（の期間）",  "check" : "0"  },'+
    '{  "en" : "harbor",  "jp" : "港",  "check" : "0"  },'+
    '{  "en" : "artery",  "jp" : "動脈",  "check" : "0"  },'+
    '{  "en" : "canal",  "jp" : "運河",  "check" : "0"  },'+
    '{  "en" : "partial",  "jp" : "部分的な" , "check" : "0" },'+
    '{  "en" : "persist",  "jp" : "固執する",  "check" : "0"  },'+
    '{  "en" : "pitch",  "jp" : "（音の）高さ、強さ",  "check" : "0"  },'+
	  '{  "en" : "anxiety",  "jp" : "不安",  "check" : "0"  },'+
	  '{  "en" : "entertain",  "jp" : "楽しませる",  "check" : "0"  },'+
	  '{  "en" : "latitude",  "jp" : "緯度",  "check" : "0" },'+
	  '{  "en" : "machinery",  "jp" : "機械装置",  "check" : "0"  },'+
	  '{  "en" : "witness",  "jp" : "目撃者",  "check" : "0" }]}';

var test3='{"employees":['+
   	'{  "en" : "alike",  "jp" : "似ている",  "check" : "0" },'+
  	'{  "en" : "apparatus",  "jp" : "装置、器具",  "check" : "0" },'+
  	'{  "en" : "charter",  "jp" : "借り上げる/貸切、特権",  "check" : "0" },'+
  	'{  "en" : "dip",  "jp" : "(液体に)つける、浸す",  "check" : "0"  },'+
  	'{  "en" : "dispose",  "jp" : "処理する/配置する",  "check" : "0"  },'+
  	'{  "en" : "hormone",  "jp" : "ホルモン",  "check" : "0"  },'+
  	'{  "en" : "module",  "jp" : "モジュール(構成単位)",  "check" : "0" },'+
  	'{  "en" : "outline",  "jp" : "概要、輪郭/輪郭を描く",  "check" : "0"  },'+
    '{  "en" : "overwhelm",  "jp" : "圧倒する、制圧する",  "check" : "0"  },'+
    '{  "en" : "tin",  "jp" : "錫、ブリキ",  "check" : "0"  },'+
  	'{  "en" : "feather",  "jp" : "羽、羽毛",  "check" : "0" },'+
    '{  "en" : "leap",  "jp" : "跳ぶ/跳躍",  "check" : "0"  },'+
    '{  "en" : "mantle",  "jp" : "マントル",  "check" : "0"  },'+
  	'{  "en" : "residue",  "jp" : "残留(物)",  "check" : "0" },'+
  	'{  "en" : "steer",  "jp" : "運転する、操縦する",  "check" : "0"  },'+
  	'{  "en" : "alloy",  "jp" : "合金",  "check" : "0"  },'+
  	'{  "en" : "authorize",  "jp" : "認可する、権限を与える",  "check" : "0"  },'+
  	'{  "en" : "orientation",  "jp" : "方向(性)",  "check" : "0"  },'+
  	'{  "en" : "saturate",  "jp" : "飽和させる",  "check" : "0"  },'+
  	'{  "en" : "theater",  "jp" : "劇場",  "check" : "0"  }]}';

var test4='{"employees":['+
   	'{  "en" : "ash",  "jp" : "灰",  "check" : "0"  },'+
  	'{  "en" : "brick",  "jp" : "煉瓦",  "check" : "0"  },'+
  	'{  "en" : "convection",  "jp" : "対流、伝達",  "check" : "0"  },'+
  	'{  "en" : "impulse",  "jp" : "刺激、衝動",  "check" : "0"  },'+
    '{  "en" : "hormone",  "jp" : "ホルモン",  "check" : "0"  },'+
	  '{  "en" : "insulin",  "jp" : "インシュリン",  "check" : "0"  },'+
    '{  "en" : "oscillation",  "jp" : "振動",  "check" : "0"  },'+
    '{  "en" : "portion",  "jp" : "一部",  "check" : "0"  },'+
    '{  "en" : "province",  "jp" : "地方",  "check" : "0"  },'+
    '{  "en" : "thrust",  "jp" : "推力",  "check" : "0"  },'+
    '{  "en" : "urine",  "jp" : "尿",  "check" : "0"  },'+
    '{  "en" : "aggressive",  "jp" : "強引な",  "check" : "0"  },'+
    '{  "en" : "contrary",  "jp" : "～に反する、反対の",  "check" : "0"  },'+
    '{  "en" : "district",  "jp" : "地区",  "check" : "0"  },'+
    '{  "en" : "innocent",  "jp" : "無実の、無垢の",  "check" : "0"  },'+
    '{  "en" : "wisdom",  "jp" : "知恵",  "check" : "0"  },'+
    '{  "en" : "fragile",  "jp" : "もろい/壊れやすい",  "check" : "0"  },'+
    '{  "en" : "objection",  "jp" : "反対(意見)、異論",  "check" : "0"  },'+
    '{  "en" : "prefecture",  "jp" : "県",  "check" : "0"  },'+
    '{  "en" : "resonance",  "jp" : "共振/共鳴",  "check" : "0"  },'+
    '{  "en" : "tender",  "jp" : "やわらかい",  "check" : "0"  }]}';
