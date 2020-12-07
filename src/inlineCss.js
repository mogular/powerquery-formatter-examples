const lightThemeCss = `
.constant.keyword {
  color: #0000FF;
}

.constant {
  color: #000000;
}

.identifier {
  color: #000000;
}

.comment {
  color: #6A9955;
}

.operator {
  color: #000000;
}

.operator.operator-keyword {
  color: #0000FF;
}

.bracket {
  font-weight: bold;
}

.bracket-0 {
  color: Gold;
}

.bracket-1 {
  color: GoldenRod;
}

.bracket-2 {
  color: DarkGoldenRod;
}

.type {
  color: #267F99;
}

.literal.null {
  color: #569cd6;
}

.literal.boolean {
  color: #569cd6;
}

.literal.string {
  color: #A31515;
}

.literal.number {
  color: #098658;
}

.literal {
  color: #dcdcaa;
}
`;

const darkThemeCss = `
.constant.keyword {
  color: #c586c0;
}

.constant {
  color: #d4d4d4;
}

.comment {
  color: #6A9955;
}

.identifier {
  color: #9cdcfe;
}

.operator {
  color: #d4d4d4;
}

.operator.operator-dot {
  color: #D4D4D4;
}

.operator.operator-keyword {
  color: #569CD6;
}

.operator.operator-unary {
  color: #569CD6;
}

.bracket {
  font-weight: bold;
}

.bracket-0 {
  color: Gold;
}

.bracket-1 {
  color: GoldenRod;
}

.bracket-2 {
  color: DarkGoldenRod;
}

.type {
  color: #4ec9b0;
}

.literal.null {
  color: #569cd6;
}

.literal.boolean {
  color: #569cd6;
}

.literal.string {
  color: #ce9178;
}

.literal {
  color: #dcdcaa;
}
`;

exports.lightThemeCss = lightThemeCss;
exports.darkThemeCss = darkThemeCss;