define([
  '../api/selection',
  '../api/simple-command'
], function (
  Selection,
  SimpleCommand
) {

  /**
   * This plugin adds a command for creating links, including a basic prompt.
   */

  'use strict';

  return function () {
    return function (scribe) {
      var nodeName = 'A';

      var linkPromptCommand = new SimpleCommand(scribe, 'createLink', nodeName);

      linkPromptCommand.execute = function () {
        var selection = new Selection();
        var anchorNode = selection.getContaining(function (node) {
          return node.nodeName === nodeName;
        });
        var initialUrl = anchorNode ? anchorNode.href : 'http://';
        var url = window.prompt('Enter a URL.', initialUrl);
        SimpleCommand.prototype.execute.call(this, url);
      };

      scribe.commands.linkPrompt = linkPromptCommand;
    };
  };

});