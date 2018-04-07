var testArr = [
    {rank: 0, option_id: "12"},
    {rank: 1, option_id: "11"},
    {rank: 2, option_id: "14"},
    {rank: 3, option_id: "13"},
    {rank: 4, option_id: "15"}
    ]


function insertScoreIntoTable (formArr) {
    let maxScore = 5
    formArr.forEach(function (item) {
        item.score = maxScore;
        maxScore--;
    })
    return formArr;
}


console.log(insertScoreIntoTable(testArr));

function insertDataIntoVotesDatabase (formArr) {
    return knex ('votes')
        .insert([{
            option_id: formArr[0].option_id,
            score: formArr[0].score
        },{
            option_id: formArr[1].option_id,
            score: formArr[1].score
        },{
            option_id: formArr[2].option_id,
            score: formArr[2].score
        },{
            option_id: formArr[3].option_id,
            score: formArr[3].score
        },{
            option_id: formArr[4].option_id,
            score: formArr[4].score
        }
    ])
}