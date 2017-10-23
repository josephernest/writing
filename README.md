Writing
=======

**Writing** is a lightweight distraction-free text editor, in the browser.

Live version: [Writing](https://josephernest.github.io/writing/).

<img src="http://i.imgur.com/c56hDwi.gif" />


Installation
----
Just open `index.html` and that's it! There is no server code. Is that so simple? Yes!

Usage
----

* CTRL + D: Toggle display mode

* CTRL + P: Print or export as PDF

* CTRL + S: Save source code as .MD file

and a few other commands (change font, etc.) that can be found in:

* CTRL+SHIFT+H or `?` bottom-left icon: Show help


Why another Markdown editor? Why not just use StackEdit?
----
There are many online editors that support Markdown but:

* half of them don't support LaTeX / MathJax (for math formulas)
* some of them do, but have a **1-sec delay between keypress and display**, and I find this annoying, see e.g. [StackEdit](https://stackedit.io)
* some of them have annoying flickering each time you write new text, once math is present on the page
* most of them are not minimalist / distraction-free enough for me

That's why I decided to make **Writing**:

* open-source
* no server needed, you can run it offline
* fast rendering (no delay when writing / no flickering of math equations)
* **just what you need: write, preview, save the code, print or save as PDF, and nothing else**
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
**Writing** uses [Pagedown](https://code.google.com/archive/p/pagedown/), [Pagedown Extra](https://github.com/jmcmanus/pagedown-extra), [MathJax](https://www.mathjax.org/), StackOverflow's [editor code](https://gist.github.com/gdalgas/a652bce3a173ddc59f66), and the [Computer Modern](http://cm-unicode.sourceforge.net/) font.

*Note: Some of these libraries have been slightly modified (a few lines of code), to make it work all together, that's why they are included in this package.*
