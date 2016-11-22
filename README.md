Writing
=============

**Writing** is a lightweight distraction-free text editor, in the browser.

[Live demo](http://185.164.138.19:7311/)

![](http://gget.it/husi2by3/screenshot1_575.jpg) ![](http://gget.it/k9oj75rs/screenshotphone_5.jpg)


Installation
----
The best way to test TalkTalkTalk is to install it locally on a Windows or Linux machine. You need to have Python installed. Just do:

    git clone https://github.com/josephernest/talktalktalk.git      # or unzip talktalktalk-master.zip
    pip install bottle bleach gevent gevent-websocket               # these Python module are required, compilation can 
    cd talktalktalk                                                 #                              take up to 3 minutes
    python talktalktalk.py start                                    # or use ./talktalktalk.py start instead to have a 
                                                                    #                     proper name when using "top"

Open your browser at the address `127.0.0.1:9000`, it works!

Now that it works locally, you probably want to install it on a web server, using an Apache server? The installation process is the same, you probably have nothing else to do, because the `.htaccess` file is already telling your web server how to redirect the traffic to the Python script, and everything should work out of the box.  If it doesn't, try to run `a2enmod proxy proxy_wstunnel ; service apache2 restart` to enable WebSocket handling by Apache.


Why another chat software?
----
There are thousands of great chat software everywhere, but I never found the one I was looking for, because:

* some of them are cool, but not open-source, and so you cannot host them on your own server (e.g. [tlk.io](http://www.tlk.io)),
* some of them are cool, but not easy to install, require a too big server, or offer too many features I don't need (e.g. [mattermost.org](http://www.mattermost.org)),
* some of them are interesting tutorials about how to program a chat in PHP, node.js, but are not ready-to-use for everyday discussion inside a small team, because they lack some important feature (such as chat history, disconnection/reconnection handling, usable user interface, etc.)

That's why I decided to make TalkTalkTalk, that has the following features:

* open-source
* easy to install
* persistent database, i.e. if you come back to the chat room tomorrow you can read all past messages, and you can see what happened when you were offline (very useful for team work)
* mobile devices support (it's not as easy as it may sound to detect accurately connection/disconnection)
* LPWP website, a.k.a. "Landing Page=Working Page", i.e. the first page that you visit on the website is the page *where things actually happen*, that means that there is no annoying welcome page or login page, etc.



About
----
Author: Joseph Ernest ([@JosephErnest](http:/twitter.com/JosephErnest))

Other projects: [BigPicture](http://bigpicture.bi), [bigpicture.js](http://github.com/josephernest/bigpicture.js), [SamplerBox](http://www.samplerbox.org), [Void](http://www.thisisvoid.org), [YellowNoiseAudio](http://www.yellownoiseaudio.com), etc.


License
----
MIT license


Uses
----

