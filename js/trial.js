var collection = 
[
	{
		result: "Scortching!",
		value: "5",
	},
	{
		result: "Hot!",
		value: "10",
	},
	{
		result: "Warm.",
		value: "25",
	},
	{
		result: "Lukewarm.",
		value: "50",
	},
	{
		result: "Cold.",
		value: "80",
	},
	{
		result: "Ice Cold!",
		value: "100",
	},
]

var result = _.find(collection, function(result)
{
	return Math.abs(ran_num - int_Input) < 5;
	return Math.abs(ran_num - int_Input) < 10;
	return Math.abs(ran_num - int_Input) < 25;
	return Math.abs(ran_num - int_Input) < 50;
	return Math.abs(ran_num - int_Input) < 80;
	return Math.abs(ran_num - int_Input) < 100;
});