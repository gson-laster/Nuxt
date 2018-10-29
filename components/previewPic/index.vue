<template>
<div class="gallery-warrp">
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe.min'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.min'
export default {
  props: {
    container: {
      type: String,
      default: '.container'
    },
    isArticle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    initPhotoSwipeFromDOM (gallerySelector) {
      const self = this
      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      const parseThumbnailElements = function (el) {
        let items = []
        let size
        let item

        // 获取所有的img
        let imgs = document.querySelectorAll(gallerySelector)[0].querySelectorAll('img')

        for (var i = self.isArticle ? 1 : 0; i < imgs.length; i++) {
          setDataSize(imgs[i])  // 设置宽高
          size = imgs[i].getAttribute('data-size').split('x')
          item = {
            src: imgs[i].getAttribute('src'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          }
          item.el = imgs[i] // save link to element for getThumbBoundsFn
          items.push(item)
        }

        return items
      }
      // find nearest parent element
      const closest = function closest (el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn))
      }
      const setDataSize = function (imgObj) {
        imgObj.setAttribute('data-size', imgObj.width+'x'+imgObj.height)
      }
      // triggers when user clicks on thumbnail
      const onThumbnailsClick = function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : e.returnValue = false
        let eTarget = e.target || e.srcElement
        // find root element of slide
        let clickedListItem = closest(eTarget, function (el) {
          return (el.tagName && el.tagName.toUpperCase() === 'IMG')
        })
        // setDataSize(clickedListItem)
        if (!clickedListItem) {
          return
        }
        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        let clickedGallery = clickedListItem.parentNode
        let childNodes = document.querySelectorAll(gallerySelector)[0].querySelectorAll('img')
        let numChildNodes = childNodes.length
        let nodeIndex = 0
        let index
        for (var i = self.isArticle ? 1 : 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue
          }
          if (childNodes[i] === clickedListItem) {
            index = nodeIndex
            break
          }
          nodeIndex++
        }
        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery)
        }
        return false
      }
      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      const photoSwipeParseHash = function () {
        let hash = window.location.hash.substring(1)
        let params = {}
        if (hash.length < 5) {
          return params
        }
        let vars = hash.split('&')
        for (let i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue
          }
          let pair = vars[i].split('=')
          if (pair.length < 2) {
            continue
          }
          params[pair[0]] = pair[1]
        }
        if (params.gid) {
          params.gid = parseInt(params.gid, 10)
        }
        return params
      }
      const openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        let pswpElement = document.querySelectorAll('.pswp')[0]
        let gallery
        let photoSwipeOptions
        let items
        items = parseThumbnailElements(galleryElement)
        // define photoSwipeOptions (if needed)
        photoSwipeOptions = {
          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),
          getThumbBoundsFn: function (index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            let thumbnail = items[index].el //.getElementsByTagName('img')[0] // find thumbnail
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          },
          shareEl: false
          // ...options
        }
        // PhotoSwipe opened from URL
        if (fromURL) {
          if (photoSwipeOptions.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (let j = 0; j < items.length; j++) {
              if (items[j].pid === index) {
                photoSwipeOptions.index = j
                break
              }
            }
          } else {
            // in URL indexes start from 1
            photoSwipeOptions.index = parseInt(index, 10) - 1
          }
        } else {
          photoSwipeOptions.index = parseInt(index, 10)
        }
        // exit if index not found
        if (isNaN(photoSwipeOptions.index)) {
          return
        }
        if (disableAnimation) {
          photoSwipeOptions.showAnimationDuration = 0
        }
        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, photoSwipeOptions)
        gallery.init()
        // Gallery starts closing
        gallery.listen('close', function () {
          self.$emit('close')
        })
      }
      // loop through all gallery elements and bind events
      const galleryElements = document.querySelectorAll(gallerySelector)
      for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1)
        galleryElements[i].onclick = onThumbnailsClick
      }
      // Parse URL and open gallery if it contains #&pid=3&gid=1
      const hashData = photoSwipeParseHash()
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true)
      }
    }
  },
  mounted () {
    this.initPhotoSwipeFromDOM(this.container)
  }
}
</script>

<style>
@import "../../static/css/photoswipe.css";
@import "../../static/css/default-skin/default-skin.css";
</style>
