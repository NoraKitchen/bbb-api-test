
var https = require('https');
var city=process.argv[2];
var state=process.argv[3];
var rating=process.argv[4]
var html=""

    var postheaders = {
    'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13',
       'Authorization': 'Bearer D_RbtdSJMnFFCzehDeC5AtGFYtCXrW_nTeK1atEc2uc5oRGSKRjCoZ9SkOT3F-8aW2ibbKahPezyHnIygzpYthrOgbAd9eaDLX7mVK-URPwMUijg58boMg60SWofDK00fsKKJPrSfPHFdCZZ72yFsiuqp-MmEPiPC33BE39k6Ry80Du-JNpUCgr0f8OyomzTsJaK8PaZ0_uDe192sBLTCCR0omtQMpkYCUfVSC1oQPDT9KKY1vR6smAq2cDWip60xaBeMbRVrJn4u4Ax_3CmjYTwG8EyXa8rn--4aaJwk_dGmFNqIAAR9zVci1n4GwEDJla5HkWrX6Z5X_Uoe8vouNVzySlzEoEmUfZf2o7tShQUeU5FYvzf2jNtWWJgArkLNOkcaSpFVpNYY1K9yOhkItsAOWZmdzvdJuvCPqmxBrqkqhVgs5XCbCTP2XozP1RyZYube583Uru3QdAnJWrORDuWCEPQZuWkiQGyhBHItR583nTx3BVeYoDmyx8auVoZLfsIvv-DvOmAwsGNm51Q1QqRAGSaBIfRbVSooV0mmOs2gHhjPklPMjPQQp2WLE7vex0b4UgzqlnrfS2tue2cKZiZZ9YoouQm961Yt-qKKIe0vLqHZqhqeZNeqF-q76mmcEN06GeMccxsjulSnON6BiAFmv8'}; 
    
    // post options
var options ={
    host: 'api.bbb.org',
    port: 443,
    path: '/api/orgs/search?PageSize=250&PrimaryCategory=Restaurants&City=' + city +'&StateProvince=' + state + '&BBBRating=' + rating,
    method: 'GET',
    headers: postheaders
};

    
var request = https.request(options, function(response){
 console.log('Status: ' + response.statusCode);
 console.log('Headers: ' + JSON.stringify(response.headers));
 response.setEncoding('utf8');
 
 var body = "";
 
 
 response.on("data", function(chunk){
    body += chunk;
 });
 

response.on("end", function () {
         var nodes = JSON.parse(body);
        if(nodes.TotalResults){
             console.log("Total Results: " + nodes.TotalResults);
            }
        
        console.log(nodes);
        
        for(results in nodes.SearchResults){
            
           html = html + "<p><div><ul><li>" + results + ": " + nodes.SearchResults[results].OrganizationName +"</li>";
           html = html + "<li>" + "Biz ID: " + nodes.SearchResults[results].BusinessId + "</li>";
           html = html + "<li>" + "Category: " + nodes.SearchResults[results].PrimaryCategory+ "</li>";
           html = html + "<li>" + "Address: " + nodes.SearchResults[results].Address+ "</li>";
           html = html + "<li>" + "City: " + nodes.SearchResults[results].City + "</li>";
           html = html + "<li>" + "Zip: " + nodes.SearchResults[results].PostalCode+ "</li></ul></div></p>";
           
       }
 });
});

request.on('error', function(error) {
console.log('problem with request: ' + error.message);
});

// write data to request body
request.end();
console.log(html);
delete body;