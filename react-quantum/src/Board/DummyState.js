// Random 4x4 state
//bit val
export const BoardState = [
{id:"s1",bitstate:0},{id:"s2",bitstate:0},{id:"s3",bitstate:0},{id:"s4",bitstate:0},
{id:"s5",bitstate:0},{id:"s6",bitstate:1},{id:"s7",bitstate:0},{id:"s8",bitstate:0},
{id:"s9",bitstate:0},{id:"s10",bitstate:0},{id:"s11",bitstate:0},{id:"s12",bitstate:0},
{id:"s13",bitstate:0},{id:"s14",bitstate:1},{id:"s15",bitstate:0},{id:"s16",bitstate:0},
];
//0 -> empty 1-> from:to -1: to:from , 2: bidrectional
//edge connections
export const tunnelState = [
{id:"t12",from:1,to:2,bitstate:0},
{id:"t23",from:2,to:3,bitstate:0},
{id:"t34",from:3,to:4,bitstate:0},
{id:"t56",from:5,to:6,bitstate:0},
{id:"t67",from:6,to:7,bitstate:0},
{id:"t78",from:7,to:8,bitstate:0},
{id:"t910",from:9,to:10,bitstate:0},
{id:"t1011",from:10,to:11,bitstate:0},
{id:"t1112",from:11,to:12,bitstate:0},
{id:"t1314",from:13,to:14,bitstate:2},
{id:"t1415",from:14,to:15,bitstate:0},
{id:"t1516",from:15,to:16,bitstate:0},
{id:"t15",from:1,to:5,bitstate:-1},
{id:"t26",from:2,to:6,bitstate:0},
{id:"t37",from:3,to:7,bitstate:0},
{id:"t48",from:4,to:8,bitstate:1},
{id:"t59",from:5,to:9,bitstate:0},
{id:"t610",from:6,to:10,bitstate:0},
{id:"t711",from:7,to:11,bitstate:0},
{id:"t812",from:8,to:12,bitstate:0},
{id:"t913",from:9,to:13,bitstate:0},
{id:"t1014",from:10,to:14,bitstate:0},
{id:"t1115",from:11,to:15,bitstate:0},
{id:"t1216",from:12,to:16,bitstate:0}
];
