
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }
	var paramNames = Object.keys(invocationParameters);
	var paramValues = Object.values(invocationParameters);
	var completeUrl = url + "?";
	for(i in paramNames)
	{
		completeUrl += (paramNames[i] + "=" + paramValues[i]);
		if(i != paramNames.length-1)
			completeUrl += "&";
	}
	var response = null;
	var json = null;
	const request = async () => {
		response = await fetch(completeUrl);
		json = await response.json();
		checkResult.urlChecked = url;
		checkResult.resultData = json;
		checkResult.resultStatus = response.status;
		if(response.status == expectedResultStatus)
		{
			checkResult.statusTestPassed = true;
		}
		else
		{
			checkResult.statusTestPassed = false;
		}
		if(compareResults(expectedResultData, response.json))
		{
			checkResult.resultDataAsExpected = true;
		}
		else
		{
			checkResult.resultDataAsExpected = false;
		}
		console.log(checkResult);
		return checkResult;
	}
	request();
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check