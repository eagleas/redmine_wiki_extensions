/*
# Wiki Extensions plugin for Redmine
# Copyright (C) 2009-2010  Haruyuki Iida
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/
function add_wiki_extension_sidebar() {
    var sidebar = $('#sidebar');
    if (sidebar == null) {
        return;
    }

    var sidebar_area = $('#wiki_extentions_sidebar');
    sidebar_area.remove();
    sidebar.append(sidebar_area);
    sidebar_area.show();

}

function add_wiki_extensions_tags_form() {
    var tags_form = $('#wiki_extensions_tag_form');
    var content_comments = $('#content_comments');

    $('#wiki_extensions_tag_form').appendTo($('#content_comments').parent());
}

function set_tag_auto_complete(taglist) {
    var inputs = $j('.wikiext_tag_inputs');

    $j.each(inputs, function(index, obj){
        $(obj).autocomplete({ source: taglist })
    })
}

function setWikiAutoPreview(url) {
    $('#content_text').observe_field(2, function(){
        $.post(url, $('#wiki_form').serialize(), function(data) {
            $('#preview').html(data)
        });
    });
}

function setMessagesAutoPreview(url) {
    $('#message_content').observe_field(2, function(){
        $.post(url, $('#message-form').serialize(), function(data) {
            $('#preview').html(data)
        });
    });
}

function setBoardsAutoPreview(url) {
    $('#message_content').observe_field(2, function(){
        $.post(url, $('#message-form').serialize(), function(data) {
            $('#preview').html(data)
        });
    });
}

function setIssueAutoPreview(url) {
    $('#issue_description').observe_field(2, function(){
        $.post(url, $('#issue-form').serialize(), function(data) {
            $('#preview').html(data)
        });
    });
}

function setIssueNotesAutoPreview(url) {
    $('#notes').observe_field(2, function(){
        $.post(url, $('#issue-form').serialize(), function(data) {
            $('#preview').html(data)
        });
    });
}

function is_table_for_sort(tbody) {
    var trs = tbody.getElementsByTagName('tr');
    if (trs.length == 0) {
        return false;
    }
    var tds = trs[0].getElementsByTagName('td');
    if (tds.length != 0) {
        return false;
    }

    return true;
}
function wiki_extension_create_table_header() {

    var tbodys = $('.wiki table tbody');
    for (var i = 0; i < tbodys.length; i++) {
        var tbody = tbodys[i];
        if (!is_table_for_sort(tbody)) {
            continue;
        }
        var table = tbody.parentNode;
        var header = tbody.removeChild(tbody.firstChild);
        var thead = table.insertBefore(document.createElement('thead'), tbody);
        thead.appendChild(header);
        var ths = thead.getElementsByTagName('th');
        for (var j = 0; j < ths.length; j++) {
            ths[j].addClassName('nocase');
        }
    }

}

/*
 * Author: Dmitry Manayev
 */
var DOM;
var Opera;
var IE;
var Firefox;

function do_some(src, evt) {
  if (!Firefox) {
     cls = src.parentNode.className;
     if (cls=='list_item ExpandOpen') {
        src.parentNode.className = 'list_item ExpandClosed';
     } else {
        src.parentNode.className = 'list_item ExpandOpen';
     }
     window.event.cancelBubble = true;
  } else {
     if (evt.eventPhase!=3) {
        cls = src.parentNode.className;
        if (cls=='list_item ExpandOpen') {
            src.parentNode.className = 'list_item ExpandClosed';
        } else {
            src.parentNode.className = 'list_item ExpandOpen';
        }
     }
  }
}

function Check() {
   if (!Firefox) {
      window.event.cancelBubble = true;
   }
}

DOM = document.getElementById;
Opera = window.opera && DOM;
IE = document.all && !Opera;
Firefox = navigator.userAgent.indexOf("Gecko") >= 0;
