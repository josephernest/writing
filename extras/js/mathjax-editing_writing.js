// Comes from: http://dev.stackoverflow.com/content/js/mathjax-editing.js     (MIT-License)
// Version downloaded 2016-11-21
//
// Two things modified:
//
// - StackExchange.mathjaxEditing = (function () {            
// + function mjpd() {  this.mathjaxEditing = (function () {
// - converterObject.hooks.chain("preSafe", replaceMath);
// + converterObject.hooks.chain("postConversion", replaceMath);
// - return { prepareWmdForMathJax: prepareWmdForMathJax };})();
// + return { prepareWmdForMathJax: prepareWmdForMathJax } })(); }


"use strict";

function mjpd() {
  this.mathjaxEditing = (function () {
    var ready = false;   // true after initial typeset is complete
    var pending = null;  // non-null when typesetting has been queued
    var inline = "$";    // the inline math delimiter
    var blocks, start, end, last, braces, indent; // used in searching for math
    var math;            // stores math until markdone is done
    var HUB = MathJax.Hub, TEX, NOERRORS;

    //
    //  Runs after initial typeset
    //
    HUB.Queue(function () {
        TEX = MathJax.InputJax.TeX;
        NOERRORS = TEX.config.noErrors;
        ready = true;
        HUB.processUpdateTime = 50;   // reduce update time so that we can cancel easier
        HUB.processSectionDelay = 0;  // don't pause between input and output phases
        MathJax.Extension["fast-preview"].Disable();  // disable fast-preview
        HUB.Config({
            // reduce chunk for more frequent updates
            "HTML-CSS": {
                EqnChunk: 10,
                EqnChunkFactor: 1
            },
            CommonHTML: {
                EqnChunk: 10,
                EqnChunkFactor: 1
            },
            SVG: {
                EqnChunk: 10,
                EqnChunkFactor: 1
            }
        });
        if (pending) return RestartMJ(pending, "Typeset");
    });

    //
    //  These get called before and after typsetting
    //
    function preTypeset() {
        NOERRORS.disabled = true;    // disable noErrors (error will be shown)
        TEX.resetEquationNumbers();  // reset labels
    }
    function postTypeset() {
        NOERRORS.disabled = false;   // don't show errors when not editing
    }

    //
    //  The pattern for math delimiters and special symbols
    //    needed for searching for math in the page.
    //
    var SPLIT = /(\$\$?|\\(?:begin|end)\{[a-z]*\*?\}|\\[\\{}$]|[{}]|(?:\n\s*)+|@@\d+@@|`+)/i;

    //
    //  The math is in blocks i through j, so
    //    collect it into one block and clear the others.
    //  Replace &, <, and > by named entities.
    //  For IE, put <br> at the ends of comments since IE removes \n.
    //  Clear the current math positions and store the index of the
    //    math, then push the math string onto the storage array.
    //
    function processMath(i, j) {
        var block = blocks.slice(i, j + 1).join("")
            .replace(/&/g, "&amp;") // use HTML entity for &
            .replace(/</g, "&lt;")  // use HTML entity for <
            .replace(/>/g, "&gt;")  // use HTML entity for >
        ;
        if (indent) block = block.replace(/\n    /g, "\n");
        if (HUB.Browser.isMSIE) {
            block = block.replace(/(%[^\n]*)\n/g, "$1<br/>\n");
        }
        while (j > i) blocks[j--] = "";
        blocks[i] = "@@" + math.length + "@@";
        math.push(block);
        start = end = last = null;
    }


    var capturingStringSplit;
    if ("aba".split(/(b)/).length === 3) {
        capturingStringSplit = function (str, regex) { return str.split(regex); };
    }
    else { // IE8
        capturingStringSplit = function (str, regex) {
            var result = [], match;
            if (!regex.global) {
                var source = regex.toString(),
                    flags = "";
                source = source.replace(/^\/(.*)\/([im]*)$/, function (wholematch, re, fl) { flags = fl; return re; });
                regex = new RegExp(source, flags + "g");
            }
            regex.lastIndex = 0;
            var lastPos = 0;
            while ((match = regex.exec(str))) {
                result.push(str.substring(lastPos, match.index));
                result.push.apply(result, match.slice(1));
                lastPos = match.index + match[0].length;
            }
            result.push(str.substring(lastPos));
            return result;
        };
    }


    //
    //  Break up the text into its component parts and search
    //    through them for math delimiters, braces, linebreaks, etc.
    //  Math delimiters must match and braces must balance.
    //  Don't allow math to pass through a double linebreak
    //    (which will be a paragraph).
    //  Handle backticks (don't do math inside them)
    //
    function removeMath(text) {
        start = end = last = indent = null; // for tracking math delimiters
        math = []; // stores math strings for latter

        blocks = capturingStringSplit(text.replace(/\r\n?/g, "\n"), SPLIT);

        for (var i = 1, m = blocks.length; i < m; i += 2) {
            var block = blocks[i];
            if (block.charAt(0) === "@") {
                //
                //  Things that look like our math markers will get
                //  stored and then retrieved along with the math.
                //
                blocks[i] = "@@" + math.length + "@@";
                math.push(block);
            }
            else if (start) {
                //
                //  If we are in math or backticks,
                //    look for the end delimiter,
                //    but don't go past double line breaks,
                //    and balance braces within the math,
                //    but don't process math inside backticks.
                //
                if (block === end) {
                    if (braces > 0) {
                        last = i;
                    }
                    else if (braces === 0) {
                        processMath(start, i);
                    }
                    else {
                        start = end = last = null;
                    }
                }
                else if (block.match(/\n.*\n/) || i + 2 >= m) {
                    if (last) {
                        i = last;
                        if (braces >= 0) processMath(start, i);
                    }
                    start = end = last = null;
                    braces = 0;
                }
                else if (block === "{" && braces >= 0) {
                    braces++;
                }
                else if (block === "}" && braces > 0) {
                    braces--;
                }
            }
            else {
                //
                //  Look for math start delimiters and when
                //    found, set up the end delimiter.
                //
                if (block === inline || block === "$$") {
                    start = i;
                    end = block;
                    braces = 0;
                }
                else if (block.substr(1, 5) === "begin") {
                    start = i;
                    end = "\\end" + block.substr(6);
                    braces = 0;
                }
                else if (block.charAt(0) === "`") {
                    start = last = i;
                    end = block;
                    braces = -1;  //  no brace balancing
                }
                else if (block.charAt(0) === "\n") {
                    if (block.match(/    $/)) indent = true;
                }
            }
        }
        if (last) processMath(start, last);
        return blocks.join("");
    }

    //
    //  Put back the math strings that were saved,
    //    and clear the math array (no need to keep it around).
    //
    function replaceMath(text) {
        text = text.replace(/@@(\d+)@@/g, function (match, n) {
            return math[n];
        });
        math = null;
        return text;
    }

    //
    //  This is run to restart MathJax after it has finished
    //    the previous run (that may have been canceled)
    //
    function RestartMJ(preview, method) {
        pending = false;
        HUB.cancelTypeset = false; // won't need to do this in the future
        HUB.Queue(
            preTypeset,
            [method, HUB, preview],
            postTypeset
        );
    }

    //
    //  When the preview changes, cancel MathJax and restart,
    //    if we haven't done that already.
    //
    function UpdateMJ(preview, method) {
        if (!pending) {
            pending = preview;
            if (ready) {
                HUB.Cancel();
                HUB.Queue([RestartMJ, preview, method]);
            }
        }
    }

    //
    //  Save the preview ID and the inline math delimiter.
    //  Create a converter for the editor and register a preConversion hook
    //   to handle escaping the math.
    //  Create a preview refresh hook to handle starting MathJax.
    //  Check if any errors are being displayed (in case there were
    //    errors in the initial display, which doesn't go through
    //    onPreviewRefresh), and reprocess if there are.
    //
    function prepareWmdForMathJax(editorObject, wmdId, delimiters) {
        var preview = document.getElementById("wmd-preview" + wmdId);
        inline = delimiters[0][0];

        var converterObject = editorObject.getConverter();
        converterObject.hooks.chain("preConversion", removeMath);
        converterObject.hooks.chain("postConversion", replaceMath);
        editorObject.hooks.chain("onPreviewRefresh", function () {
            UpdateMJ(preview, "Typeset");
        });

        HUB.Queue(function () {
            if (preview && preview.querySelector(".mjx-noError")) {
                RestartMJ(preview, "Reprocess");
            }
        });
    }

        return {
            prepareWmdForMathJax: prepareWmdForMathJax
        }
    })();
}
//
//  Set up MathJax to allow canceling of typesetting, if it
//    doesn't already have that.
//
(function () {
    var HUB = MathJax.Hub;

    if (!HUB.Cancel) {

        HUB.cancelTypeset = false;
        var CANCELMESSAGE = "MathJax Canceled";

        HUB.Register.StartupHook("HTML-CSS Jax Config", function () {
            var HTMLCSS = MathJax.OutputJax["HTML-CSS"],
                TRANSLATE = HTMLCSS.Translate;
            HTMLCSS.Augment({
                Translate: function (script, state) {
                    if (HUB.cancelTypeset || state.cancelled) {
                        throw Error(CANCELMESSAGE)
                    }
                    return TRANSLATE.call(HTMLCSS, script, state);
                }
            });
        });

        HUB.Register.StartupHook("SVG Jax Config", function () {
            var SVG = MathJax.OutputJax["SVG"],
                TRANSLATE = SVG.Translate;
            SVG.Augment({
                Translate: function (script, state) {
                    if (HUB.cancelTypeset || state.cancelled) {
                        throw Error(CANCELMESSAGE)
                    }
                    return TRANSLATE.call(SVG, script, state);
                }
            });
        });

        HUB.Register.StartupHook("CommonHTML Jax Config", function () {
            var CHTML = MathJax.OutputJax.CommonHTML,
                TRANSLATE = CHTML.Translate;
            CHTML.Augment({
                Translate: function (script, state) {
                    if (HUB.cancelTypeset || state.cancelled) {
                        throw Error(CANCELMESSAGE);
                    }
                    return TRANSLATE.call(CHTML, script, state);
                }
            });
        });

        HUB.Register.StartupHook("PreviewHTML Jax Config", function () {
            var PHTML = MathJax.OutputJax.PreviewHTML,
                TRANSLATE = PHTML.Translate;
            PHTML.Augment({
                Translate: function (script, state) {
                    if (HUB.cancelTypeset || state.cancelled) {
                        throw Error(CANCELMESSAGE);
                    }
                    return TRANSLATE.call(PHTML, script, state);
                }
            });
        });

        HUB.Register.StartupHook("TeX Jax Config", function () {
            var TEX = MathJax.InputJax.TeX,
                TRANSLATE = TEX.Translate;
            TEX.Augment({
                Translate: function (script, state) {
                    if (HUB.cancelTypeset || state.cancelled) {
                        throw Error(CANCELMESSAGE)
                    }
                    return TRANSLATE.call(TEX, script, state);
                }
            });
        });

        var PROCESSERROR = HUB.processError;
        HUB.processError = function (error, state, type) {
            if (error.message !== CANCELMESSAGE) {
                return PROCESSERROR.call(HUB, error, state, type)
            }
            MathJax.Message.Clear(0, 0);
            state.jaxIDs = [];
            state.jax = {};
            state.scripts = [];
            state.i = state.j = 0;
            state.cancelled = true;
            return null;
        };

        HUB.Cancel = function () {
            this.cancelTypeset = true;
        };
    }
})();