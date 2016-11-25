Writing
=======

**Writing** is a lightweight distraction-free text editor, in the browser.

Live version: [Writing](https://josephernest.github.io/Writing/).

![screenshot]()


Installation
----
Just open `index.html` and that's it! There is no server code. Is that so simple? Yes!

Usage
----

* CTRL+M: Download the source code (.MD file)

* CTRL+P: Download the output .PDF file

* CTRL+L: Enable/disable LaTeX (for math formulas)

* `?` icon (bottom right): Show help


Why another Markdown editor?
----
There are many online editors that support Markdown but:

* most of them don't support LaTeX / MathJax (for math formulas)
* some of them do, but have a 1-sec delay between keypress and display, and I find this annoying, see for example [StackEdit](https://www.stackedit.io)
* some of them have annoying flickering each time you write new text, once math is present on the page, see for example http://markx.herokuapp.com/
* most of them are not minimalist / distraction-free enough for me

That's why I decided to make **Writing**:

* open-source
* no server needed, you can run it offline
* fast rendering (no delay when writing / no flickering of math equations)
* **just what you need: write, preview, save the code (CTRL+M), save as PDF (CTRL+P), and nothing else**
* LPWP website, a.k.a. "Landing Page=Working Page", i.e. the first page that you visit on the website is the page *where things actually happen*, that means that there is no annoying welcome page or login page, etc.

About
----
Author: Joseph Ernest ([@JosephErnest](https://twitter.com/JosephErnest))

Other projects: [BigPicture](http://bigpicture.bi), [bigpicture.js](https://github.com/josephernest/bigpicture.js), [AReallyBigPage](https://github.com/josephernest/AReallyBigPage), [SamplerBox](http://www.samplerbox.org), [Void](http://www.thisisvoid.org), [TalkTalkTalk](https://github.com/josephernest/TalkTalkTalk), [YellowNoiseAudio](http://www.yellownoiseaudio.com), etc.

License
----
MIT license

Dependencies
---
**Writing** uses [Pagedown](https://code.google.com/archive/p/pagedown/), [Pagedown Extra](https://github.com/jmcmanus/pagedown-extra), [MathJax](https://www.mathjax.org/), [jsPDF](https://github.com/MrRio/jsPDF), and StackOverflow's [editor code](https://gist.github.com/gdalgas/a652bce3a173ddc59f66).

*Note: Some of these libraries have been slightly modified (a few lines of code), to make it work all together, that's why they are included in this package.*