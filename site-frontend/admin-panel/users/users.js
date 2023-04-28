// $(document).ready(  function(){
//     $("#usersButton").click(function(){
    $.get('http://localhost:3000/api/users', function(data) {
        // data is the JSON response from the API
        // call the function to create the table with this data
        createTable(data);
      });
//   });
// })



function createTable(data) {
  // get a reference to the table element in your HTML
  var table = $('#my-table');

  // create a header row for the table
  var headerRow = $('<tr>');
  headerRow.append($('<th>').text('id'));
  headerRow.append($('<th>').text('name'));
  headerRow.append($('<th>').text('email'));
  headerRow.append($('<th>').text('phone'));
  headerRow.append($('<th>').text('isAdmin'));

  table.append(headerRow);

  // loop through each item in the data array and create a row for it
  $.each(data, function(index, item) {
    var row = $('<tr>');
    row.append($('<td>').text(item._id));
    row.append($('<td>').text(item.name));
    row.append($('<td>').text(item.email));
    row.append($('<td>').text(item.phone));
    row.append($('<td>').text(item.isAdmin));

    table.append(row);
  });
}