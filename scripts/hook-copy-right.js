/* global hexo */

"use strict"

hexo.extend.filter.register(
  "theme_inject",
  function(injects) {
    injects.postBodyEnd.file(
      "creative-commons",
      "source/_data/post-copyright.swig"
    )
    injects.style.push("source/_data/post-copyright.styl")
  },
  100
)