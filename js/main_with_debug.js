
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

//Having done all of that I was still a little unsure 
window.onload = function() {
	createTable();
	addColumns(cityPop);
	addEvents();
}