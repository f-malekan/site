// $(document).ready(  function(){
//     $("#usersButton").click(function(){
    $.get('http://localhost:3000/api/categories', function(data) {
        // data is the JSON response from the API
        // call the function to create the table with this data
        createTable(data.data);
      });
//   });
// })


$(document).ready(  function(){
    $(".deleteButtom").click(function(){
  $.get('http://localhost:3000/api/categories', function(data) {
    // data is the JSON response from the API
    // call the function to create the table with this data
    console.log(data.data);
  });
  });
})



function createTable(data) {
  // get a reference to the table element in your HTML
  var table = $('#my-table');

  // create a header row for the table
  var headerRow = $('<tr>');
  headerRow.append($('<th>').text('id'));
  headerRow.append($('<th>').text('title'));
  headerRow.append($('<th>').text('action'));


  table.append(headerRow);

  // loop through each item in the data array and create a row for it
  $.each(data, function(index, item) {
    var row = $('<tr>');
    row.append($('<td>').text(item._id));
    row.append($('<td>').text(item.title));
    row.append("$(<td><button class='deleteButtom' type='button'>delete</button></td>");


    table.append(row);
  });
}