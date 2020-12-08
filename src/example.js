const fetch = require("node-fetch");
const { darkThemeCss, lightThemeCss } = require("./inlineCss");

function callFormatApi(body) 
{
  return fetch("https://m-formatter.azurewebsites.net/api/v2", { 
    method: "post", 
    body: JSON.stringify(body),
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

  
//1) retrieve formatted HTML.

//Adjust these configuration parameters if you desire
var exampleConfig = {
  code: exampleCode,                                    //required
  resultType: "html",                                   //required
  // indentationLength: 2,                              //optional, number of whitespaces used to indent
  // lineEnd: "<br/>",                                  //optional, newline character
  // ws: "&nbsp;",                                      //optional, whitespace character
  // lineWidth: 100,                                    //optional, line Width
  // numBrackets: 3,                                    //optional, number of different bracket classes that you can style (with class bracket-{n})
  // alignPairedLetExpressionsByEqual: "singleline",    //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // alignPairedRecordExpressionsByEqual: "singleline", //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // alignLineCommentsToPosition: null,                 //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // includeComments: true,                             //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // inlineCss: lightThemeCss                           //optional. You can see the styles I use for powerqueryformatter.com in ./inlineCss.js
};

console.log("retrieving html");
callFormatApi(exampleConfig).then(res => {
  res.json().then(j => {
    if(j.success == false)
    {
      //some errors occurred
      j.errors.forEach(error => {
        console.log(`Encountered error of kind ${error.kind}\nMessage: ${error.message}\nInnerError: ${error.innerError != null ? error.innerError.message : ''}\nmeta: ${JSON.stringify(error.meta)}`);
      });
      return;
    }
    let html = j.result;
    console.log(`HTML successfull`)
  });
});

//2) retrieve formatted CODEBLOCK.

//Adjust these configuration parameters if you desire
exampleConfig = {
  code: exampleCode,                                    //required
  resultType: "codeblock",                              //required
  // indentationLength: 2,                              //optional, number of whitespaces used to indent
  // lineEnd: "<br/>",                                  //optional, newline character
  // ws: "&nbsp;",                                      //optional, whitespace character
  // lineWidth: 100,                                    //optional, line Width
  // numBrackets: 3,                                    //optional, number of different bracket classes that you can style (with class bracket-{n})
  // alignPairedLetExpressionsByEqual: "singleline",    //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // alignPairedRecordExpressionsByEqual: "singleline", //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // alignLineCommentsToPosition: null,                 //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // includeComments: true,                             //optional, strategy to align paired expressions under a let expression ("never"|"always"|"singleline")
  // inlineCss: lightThemeCss                           //optional. You can see the styles I use for powerqueryformatter.com in ./inlineCss.js
};
console.log("retrieving codeblock");
callFormatApi(exampleConfig).then(res => {
  res.json().then(j => {
    if(j.success == false)
    {
      //some errors occurred
      j.errors.forEach(error => {
        console.log(`Encountered error of kind ${error.kind}\nMessage: ${error.message}\nInnerError: ${error.innerError != null ? error.innerError.message : ''}\nmeta: ${JSON.stringify(error.meta)}`);
      });
      return;
    }
    
    //note that the codeblock structure around the formatted html is NOT styled. You cann apply styles yourself by using the classes of the emmitted HTML. The styles we use for the IFrame codeblock can be seen in ./codeblock.sass or ./codeblock.css.
    let codeblock = j.result;
    
    console.log("CODEBLOCK successful")
  });
});

//3 retrieve IFRAME.

//Adjust these configuration parameters if you desire
exampleConfig = {
  code: exampleCode,                                    //required
  resultType: "iframe",                                 //required
  // indentationLength: 2,                              //optional
  // lineEnd: "\n",                                     //optional
  // ws: " ",                                           //optional
  // lineWidth: 100,                                    //optional
  // alignPairedLetExpressionsByEqual: "singleline",    //optional
  // alignPairedRecordExpressionsByEqual: "singleline", //optional
  // alignLineCommentsToPosition: null,                 //optional
  // includeComments: true,                             //optional
};

console.log("retrieving iframe");
callFormatApi(exampleConfig).then(res => {
  res.text().then(j => {
    let iframe = j.result;
    
    //IFrame returns content type text/html. To check if errors occurred check the http response status code
    if(res.status != 200)
    {
      console.log("IFRAME: an error occurred");
      return;
    }
    console.log(`IFRAME successfull`)
  });
});


//4) retrieve formatted TEXT.

//Adjust these configuration parameters if you desire
exampleConfig = {
  code: exampleCode,                                    //required
  resultType: "text",                              //required
  // indentationKind: "spaces",                         //optional, ("spaces"|"tabs")
  // indentationLength: 2,                              //optional, irrelevant if indentationKind is "spaces"
  // lineEnd: "\n",                                     //optional
  // ws: " ",                                           //optional
  // lineWidth: 100,                                    //optional
  // numBrackets: 3,                                    //optional, number of different bracket classes that you can style (with class bracket-{n})
  // alignPairedLetExpressionsByEqual: "singleline",    //optional
  // alignPairedRecordExpressionsByEqual: "singleline", //optional
  // alignLineCommentsToPosition: null,                 //optional
  // includeComments: true,                             //optional
};

console.log("retrieving text");
callFormatApi(exampleConfig).then(res => {
  res.json().then(j => {
    if(j.success == false)
    {
      //some errors occurred
      j.errors.forEach(error => {
        console.log(`Encountered error of kind ${error.kind}\nMessage: ${error.message}\nInnerError: ${error.innerError != null ? error.innerError.message : ''}\nmeta: ${JSON.stringify(error.meta)}`);
      });
      return;
    }
    let txt = j.result;
    console.log("TEXT successfull")
  });
});

