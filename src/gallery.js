const PhotoSwipe = require('photoswipe');
const photoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');

function closest(element, fn) {
  return element && (fn(element) ? element : closest(element.parentNode, fn));
}

function parseGalleryHash(hash) {
  if (hash.length < 5) {
    return {};
  }

  const params = hash.split('&').reduce((memo, item) => {
    const pair = item.split('=');

    if (pair.length > 1) {
      memo[pair[0]] = pair[1];
    }

    return memo;
  }, {});

  if (params.gid) {
    params.gid = parseInt(params.gid, 10) || 1;
  }

  return params;
}

function parseThumbnailElements(element) {
  const thumbElements = element.childNodes;

  return Array.prototype.reduce.call(thumbElements, (memo, figureElement) => {
    if (figureElement.nodeType !== 1) {
      return memo;
    }

    const linkElement = figureElement.children[0];
    const size = (linkElement.getAttribute('data-size') || '').split('x');

    const item = {
      src: linkElement.getAttribute('href'),
      w: parseInt(size[0], 10),
      h: parseInt(size[1], 10),
    };

    if (figureElement.children.length > 1) {
      // <figcaption> content
      item.title = figureElement.children[1].innerHTML;
    }

    if (linkElement.children.length > 0) {
      // <img> thumbnail element, retrieving thumbnail url
      item.msrc = linkElement.children[0].getAttribute('src');
    }

    item.el = figureElement; // save link to element for getThumbBoundsFn
    memo.push(item);

    return memo;
  }, []);
}

function openPhotoSwipe(pid, galleryElement, disableAnimation, isFromURL) {
  const items = parseThumbnailElements(galleryElement);

  const options = {
    galleryUID: 1,
    getThumbBoundsFn(index) {
      const thumbnail = items[index].el.getElementsByTagName('img')[0];
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      const rect = thumbnail.getBoundingClientRect();

      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    },
  };

  if (isFromURL) {
    options.index = options.galleryPIDs ?
      items.findIndex((item) => item.pid === pid) :
      parseInt(pid, 10) - 1;
  } else {
    options.index = parseInt(pid, 10);
  }

  // exit if index not found
  if (isNaN(options.index)) {
    return;
  }

  if (disableAnimation) {
    options.showAnimationDuration = 0;
  }

  // Pass data to PhotoSwipe and initialize it
  const pswpElement = document.querySelector('.pswp');
  const gallery = new PhotoSwipe(pswpElement, photoSwipeUiDefault, items, options);
  gallery.init();
}

function onThumbnailsClick(eventArg) {
  const event = eventArg || window.event;
  const target = event.target || event.srcElement;

  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }

  const clickedListItem = closest(target, (element) => (
    element.tagName && element.tagName.toLowerCase() === 'figure'
  ));

  if (!clickedListItem) {
    return null;
  }

  const clickedGallery = clickedListItem.parentNode;
  const index = Array.prototype.findIndex.call(
    clickedListItem.parentNode.childNodes,
    (node) => node === clickedListItem
  );

  if (index >= 0) {
    openPhotoSwipe(index, clickedGallery);
  }
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const params = parseGalleryHash(window.location.hash.substring(1));
  const galleryElement = document.querySelector('.gallery');
  galleryElement.onclick = onThumbnailsClick;

  if (params.pid && params.gid) {
    openPhotoSwipe(params.pid, galleryElement, true, true);
  }
});
