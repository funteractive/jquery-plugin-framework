/**
 * plugin name
 *
 * @version    0.1.0-beta
 * @author     Keisuke Imura <keisuke@keisuke-imura.com>
 * @license    The MIT License
 * @link       http://funteractive.jp/
 */
;(function($){

  $.fn.extend({
    pluginName: function(options){
      return $(this).each(function() {
        $.pluginName.init(options, $(this));
      });
    }
  });

  $.pluginName = {
    //デフォルト値
    defaultOptions: {
    },

    //初期設定
    init: function(options, $el){
      //オプションの統合
      this.setOptions(options);

      this.$el = $el;

    },

    //オプションのセット
    setOptions: function(options){
      var that = this;
      this.options = $.extend(true, {}, that.defaultOptions, options);
    }
  };

})(jQuery);