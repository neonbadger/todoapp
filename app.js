var $itemTemplate = $('#templates .item');
var $list = $('#list');

var addItemToPage = function(itemData) {
	var $item = $itemTemplate.clone();
	$item.attr('data-id', itemData.id);
	$item.find('.description').text(itemData.description);
	if (itemData.completed) {
		$item.addClass('completed');
	}
	$list.append($item);
}

$.ajax({
  type: 'POST',
  url: "https://listalous.herokuapp.com/lists/neong/items",
  data: { description: 'buy an apple', completed: false }
})

// var GetData = $.ajax({
//   type: 'GET',
//   url: "https://listalous.herokuapp.com/lists/neong/"
// })

var $loadRequest = $.ajax({
	type: 'GET',
	url: "https://listalous.herokuapp.com/lists/neong/"
})

$loadRequest.done(function(dataFromServer){
	var itemsData = dataFromServer.items;
	itemsData.forEach(addItemToPage);
})

$('#add-form').on('submit', function(event) {
  var itemDescription = event.target.itemDescription.value
  event.preventDefault()
  alert('trying to create a new item with a description ' + itemDescription)

  var $creationRequest = $.ajax({
  	type: 'POST',
  	url: "https://listalous.herokuapp.com/lists/neong",
  	data: {description: itemDescription, completed: false}
  })

  $creationRequest.done(function(itemDataFromServer){
  	addItemToPage(itemDataFromServer)
  })

})
$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
  var isItemCompleted = item.hasClass('completed')
  var itemId = item.attr('data-id')

  var updateRequest = $.ajax({
    type: 'PUT',
    url: "https://listalous.herokuapp.com/lists/neong/items/" + itemId,
    data: { completed: !isItemCompleted }
  })

  updateRequest.done(function(itemData) {
    if (itemData.completed) {
      item.addClass('completed')
    } else {
      item.removeClass('completed')
    }
  })
})





// The jQuery Selector $() is an easy way to fetch an item from the page. All you need to do is specify the class, id, or tag of the element or elements you want.

// .clone() creates a copy of a selected element. It's helpful for creating elements from a template.

// .find() helps you find elements nested inside other elements.

// .text() allows you to get and alter the text of an element.

// .attr() allows you to get and alter attributes stored in your HTML. In this case, we used it store the id of an item in a data-id attribute, that is not used for styling, just for data storage.

// .addClass() allows you to add a class to an element.

// .append() takes an element and attaches it to the end of another element! That way, your element will actually show up on the page.


