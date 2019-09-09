const fetch = require("node-fetch");

function format(code, config) 
{
  return fetch("https://m-formatter.azurewebsites.net/api/format", { 
    method: "post", 
    body: JSON.stringify({
      code,
      config //is optional
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

var exampleCode = `
let 
  GetParameterImpl=(tableName as any, keyName) as any => 
    let
      value = Table.SelectRows(tableData, each ([Key] = keyName)){0}[Value],
      tableData = Excel.CurrentWorkbook(){[Name=tableName]}[Content]
    in 
      value,
  GetParameterImpl=(t) as null => testtttttttttt,
  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = @test,
  Test=Number.Add
in 
  GetParameterImpl`;

var exampleConfig = {
  indentation: "&nbsp;&nbsp;",
  indentationLength: 2,
  lineEnd: "<br/>",
  ws: "&nbsp;",
  lineWidth: 100,
  numBrackets: "3",
  escapeHtmlText: true,
  alignPairedExpressionsByEqual: false,
  inlineCss: `
.constant.keyword {
color: #c586c0;
}

.constant {
color: #d4d4d4;
}

.identifier {
color: #9cdcfe;
}

.operator {
color: #d4d4d4;
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

.literal.string {
color: #ce9178;
}

.literal {
color: #dcdcaa;
}

body {
font-family: monospace;
background-color: #1e1e1e;
}
`
};

format(exampleCode, exampleConfig).then(res => {
  if(res.ok)
  {
    res.text().then(html => console.log(`Formatted html:\n${html}`));
  }
  else
  {
    res.json().then(error => {
      console.log(`Encountered error of kind ${error.kind}\nMessage: ${error.message}\nInnerError: ${error.innerError.message}\nmeta: ${JSON.stringify(error.meta)}`);
    });
  }
});