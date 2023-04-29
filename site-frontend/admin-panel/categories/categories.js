$.get('http://localhost:3000/api/categories', function(data) {
        // data is the JSON response from the API
      createTable(data.data);
});


function createTable(data) {
  // get a reference to the table element in your HTML
  var table = $('#my-table');
  var headerRow = "<tr>" +
  "<th>" +"id" + "</th>" +
  "<th>" + "title" + "</th>" +
  "<th>" +"action" + "</th>" +
  "<th><a href='./create-category/create-category.html'><i class='material-icons' id='add'>add</i></a></th>" +
  "</tr>";

  table.append(headerRow);

  $.each(data, function(index, row) {
      var newRow = "<tr id='" + row._id + "'>" +
                   "<td>" + row._id + "</td>" +
                   "<td>" + row.title + "</td>" +
                   "<td><button class='deleteButton'><i class='material-icons' id='delete'>delete</i></button><button class='viewButton'><i class='material-icons' id='view'>remove_red_eye</i></button></td>" +
                   "</tr>";

      table.append(newRow);
    })};

$(document).ready(function(){
  $(".viewButton").click(function(){
  var rowId = $(this).closest("tr").attr("id");
  console.log(rowId)

  // Make an AJAX GET request
  $.get("http://localhost:3000/api/categories/" + rowId, function(result) {
    // Display the result in an alert box
    console.log(result)
  });
});
})


$(document).ready(function(){
  $(".deleteButton").click(function(){
  var rowId = $(this).closest("tr").attr("id");
  console.log(rowId)

  // Make an AJAX DELETE request
  $.ajax({
    url: "http://localhost:3000/api/categories/" + rowId,
    type: "DELETE",
    success: function(result) {
      // Remove the row from the table
      $("#" + rowId).remove();
    }
  });
})
});