var express = require('express')
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {

  const randchar = {
      total: 0,
      rollTotals: [],
      rolls: []
  }

  for(let i=0;i<=5;i++) {

    let d6s = [];

    for(let a=0;a<=3;a++) {

       d6s.push(Math.ceil(Math.random() * 6))

    }
    
    d6s = d6s.sort();
    const d6sOrig = JSON.parse(JSON.stringify(d6s))

    d6s.splice(0, 1);
    const rollTotal = d6s.reduce((a, b) => a + b, 0)
    randchar.rollTotals.push(rollTotal);
    randchar.total += rollTotal

    randchar.rolls.push({
        value: rollTotal,
        rolls: d6s,
        orignalRolls: d6sOrig
    })
  }

  res.json({
    response_type: "in_channel",
    text: `Total: *${randchar.total}*
Roll Totals: *${randchar.rollTotals.join('*, *')}*`
  })
})

app.listen(3000, () => console.log('Randchar listening on port 3000!'))