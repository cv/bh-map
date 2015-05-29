var bh = bh || {};
function addHighlighListeners(link, svg) {
  link.addEventListener('mouseover', function () {
    svg.classList.add('highlight');
  });

  link.addEventListener('mouseleave', function () {
    svg.classList.remove('highlight');
  });

  svg.addEventListener('mouseover', function () {
    link.classList.add('highlight');
    svg.classList.add('highlight');
  });

  svg.addEventListener('mouseleave', function () {
    link.classList.remove('highlight');
    svg.classList.remove('highlight');
  });
}

function populateList(listId, items) {
  var ul = document.getElementById(listId);

  items.forEach(function (item) {
    var li, a, svg;

    li = document.createElement('li');
    a = document.createElement('a');
    svg = document.getElementById(item.id);

    a.href = '#' + item.id;
    a.text = item.name;
    li.appendChild(a);
    ul.appendChild(li);
    svg.classList.add(listId);

    addHighlighListeners(a, svg);
  });
}

function clearPreviousView() {
  var roomDetails = document.getElementById('room-details');
  while (roomDetails.firstChild) {
    roomDetails.removeChild(roomDetails.firstChild);
  }
}

function populateRoomDetailData(view, data) {
  var specs;
  view.querySelector('h1').innerHTML = data.name;
  view.querySelector('section[role=note] p').innerHTML = data.description;
  specs = view.querySelector('section[role=definition]');

  data.specs.forEach(function (spec) {
    var li = document.createElement('li');
    li.innerHTML = spec;
    specs.querySelector('ul').appendChild(li);
  });
}

function addNewView(hash) {
  var view, template, roomDetails, data;
  function byId(room) { return room.id === hash; }

  roomDetails = document.getElementById('room-details');
  template = document.getElementById('room-details-template');
  view = document.importNode(template.content, true);
  data = bh.rooms.filter(byId)[0];

  if (data) {
    populateRoomDetailData(view, data);
    roomDetails.appendChild(view);
  }
}

function removeAllClasses(className) {
  Array.prototype.forEach.call(document.querySelectorAll('.' + className), function (element) {
    element.classList.remove(className);
  });
}

function changeView(hash) {
  clearPreviousView();
  if (hash) {
    addNewView(hash);
    removeAllClasses('active');
    document.querySelector('section[role=navigation] a[href="#'+hash +'"]').classList.add('active');
    document.getElementById(hash).classList.add('active');
  }
}

function listenToHashChange() {
  window.addEventListener('hashchange', function (e) {
    var hash = e.newURL.split('#')[1];
    changeView(hash);
  });
}


window.addEventListener('load', function () {
  populateList('rooms', bh.rooms);
  populateList('areas', bh.areas);
  listenToHashChange();
  changeView(window.location.hash.slice(1));
});
