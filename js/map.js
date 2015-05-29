var bh = bh || {};

window.addEventListener('load', function () {

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

  populateList('rooms', bh.rooms);
  populateList('areas', bh.areas);
});
