/*
 * jquery.scrollSync
 * Synchronize scroll between multiple containers with varying size
 * Date: 20151201
 * 
 * Thomas Frost
 * http://xtf.dk/
 *
 * Required:
 * jQuery
 *  http://jquery.com/
 * 
 * Usage:
 * $('.scrollable').scrollSync();
 */
(function ($) {
    $.fn.scrollSync = function () {
        var $this = $(this);
        $this.on('scroll', function (e) {
            var $sender = $(e.currentTarget);
            if ($sender.is(":hover")) {
                var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
                $this.not($sender).each(function (i, other) {
                    other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);
                });
            }
        });
    };
})(jQuery);