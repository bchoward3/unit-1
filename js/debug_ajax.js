
////////////ACTIVITY 3////////////////////


// cityPop variable created to hold array of cities with corresponding populations.
var cityPop = [
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];

//This was one of the biggest obstacles I found - I didn't realize that a function to create a table is missing. I had
//to backpedal a bit on the lessons (Example 2.3) and documentation.
function createTable() {
	//table variable created with createElement.
	var table = document.createElement("table");

	//header row created.
    var headerRow = document.createElement("tr");

	//City colum addition
	var cityHeader = document.createElement("th");
	cityHeader.innerHTML = "City";
	headerRow.appendChild(cityHeader);

	//adding population column
	var popHeader = document.createElement("th");
	popHeader.innerHTML = "Population";
	headerRow.appendChild(popHeader);

	//appending row to the table
	table.appendChild(headerRow);

	//loop to add a new row for each city - I leaned heavily on example 2.3 and subsituted my variable.
    for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population;
        tr.appendChild(pop);

        table.appendChild(tr);
    };
	
	//This part eluded me for a long time and I finally found some similar examples in documentation. 
	document.body.appendChild(table);
}

//The below function creates the column for city sizes (small, medium and large).
function addColumns(cityPop){
    //Selects all table rows ('tr'). The forEach loop is one thing I am still having trouble understanding.
    document.querySelectorAll("tr").forEach(function(row, i){
		//The below conditional statement is selecting the first row (the header row = 0).
    	if (i == 0){
			//The title for the column is inserted ('City Size'). Additionally, 'insertAdjacntHTML' changed to 'insertAdjacentHTML'.
    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
    	} else {
			//citySize variable created with conditional statements to classify the cities by their corresponding population values. 
    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			//I spotted this misspelling below for citySize during my first lookthrough. 
				citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			//'insertAdjacntHTML' changed to 'insertAdjacentHTML' and also changed back to the method shown earlier in the 'if' statement. This took me alot longer than it should have. 
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');

    	};
    });
};

//This function is being used to generate the random colors of the table.
function addEvents(){
	//Selects the table and adds the event for the mouse hover.
	document.querySelector("table").addEventListener("mouseover", function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);
			//Changed 'random' from string to value.
			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
			} // This drove me nuts until I remembered to check the console from the broweser which pointed me to brackets.
		} //This was missing and took a while to realize why the loop didn't close. 

		//I spotted this one pretty quickly and was able to change it to the appropriate method. 
		document.querySelector("table").style.backgroundColor = color;
	});
	//Sub-function so that alert is generated when the table is clicked (?)
	function clickme(){
		alert('Hey, you clicked me!');
	};

	document.querySelector("table").addEventListener('click', clickme)
};





//////////////ACTIVITY 4/////////////////////////////

//Having the variable inside the function made it confusing to use outside of it so I moved it outside as the first line and left it undefined for
//assignment later. 
var myData;
//function debugAjax is defined
function debugAjax(){
	//fetch invoked to retrieve the data (I looked to the examples in 3-2 and 3.3 for the basic structure).
	fetch('data/MegaCities.geojson')
		//I turned to Examples 2.7 and 2.8 for guidance in structuring my then statements to make sure the response follows the fetch.
		//I didn't bother with the conversion method since the JSON.stringify(myData) method is used later on.
		.then(function(response){
			return response.json();
		})
		//It took longer than it should have for me to realize that callback was being defined in the function below so I just substituted 'callback' with
		//the function. Example 2.4 helped out here to use .then to push the debugCallback until the next function.
		.then(debugCallback);	
};

//Again, I leaned heavily on Example 2.4 to understand this and put the data tasks with the callback function.
//I hit some roadblocks with this and couldn't figure out why until I realized the I needed to insert myData so it was defined.
function debugCallback(response){
	//This is how I could think of using myData by assigning it the value of the response. This allowed me the ability to move the querySelector
	//inside of the debugCallback function. 
	myData = response;
	//I added this console.log so that I could view the object in the console at this step. 
	console.log(myData);
	//querySelector to selct the <mydiv> element and add the HTML text for 'GeoJSON data: '.
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
};

//I copied my window.onload from the previous script and added the debugAjax function call.
// I initially added a call for debugCallback before forgetting I had already invoked it in debugAjax. 
window.onload = function() {
	createTable();
	addColumns(cityPop);
	addEvents();
	debugAjax();
}