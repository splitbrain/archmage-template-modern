RegExp.quote = function (str) {
    return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

var arch_menu = {
    /** @var int nodes Number of assigned nodes */
    nodes: 0,

    timer: null,

    init: function (out, content) {

        arch_menu.addFilterTool(out);

        arch_menu.addNodes(out, content, true);
    },

    /**
     * adds the input field for the filter
     *
     * @param out
     */
    addFilterTool: function (out) {
        var input = document.createElement('input');
        input.type = 'text';
        input.title = 'Filter Table of Contents';
        out.appendChild(input);
        var $in = $(input);

        $in.keyup(function () {
            if (arch_menu.timer) clearTimeout(arch_menu.timer);
            arch_menu.timer = setTimeout(function () {
                arch_menu.clearFilter();
                if ($in.val()) arch_menu.filterNodes($in.val());
            }, 500);
        });

        var clear = document.createElement('img');
        clear.src = 'icons/clear.png';
        clear.onclick = arch_menu.clearFilter;
        clear.title = 'Clear filter and close all branches';
        clear.className = 'clear';
        out.appendChild(clear);
    },

    /**
     * Creates the menu list
     *
     * @param out Output DOM Node
     * @param content Array of content
     * @param open
     */
    addNodes: function (out, content, open) {
        var list = document.createElement('ul');
        list.id = 'list' + arch_menu.nodes;
        if (!open) {
            list.style.display = 'none';
        }

        for (var i = 0; i < content.length; i++) {
            // create a new list item
            var node = document.createElement('li');
            node.id = 'node' + arch_menu.nodes;

            // add clicky for branches
            var icon = document.createElement('img');
            icon.className = 'ico';
            if (content[i].length > 3) {
                icon.src = 'icons/folder.png';
                $(icon).click(arch_menu.toggleNode);
                icon.className += ' folder';
                icon.title = 'Open/Close branch';
            } else {
                icon.src = 'icons/page.png';
            }
            node.appendChild(icon);

            // create link to page
            var link = document.createElement('a');
            link.href = content[i][1];
            link.textContent = content[i][0];
            link.title = content[i][0];
            link.target = 'content';
            node.appendChild(link);
            arch_menu.nodes++;

            // recurse for subnodes
            if (content[i].length > 3) {
                var subnodes = content[i].slice(3);
                arch_menu.addNodes(node, subnodes, false);
            }
            list.appendChild(node);
        }
        out.appendChild(list);
    },

    /**
     * Open/Closes a branch
     *
     * @param e Event
     */
    toggleNode: function (e) {
        $clicky = jQuery(this);


        console.log($clicky);

        if ($clicky[0].src.match(/open/)) {
            $clicky[0].src = 'icons/folder.png';
        } else {
            $clicky[0].src = 'icons/folder_open.png';
        }

        $clicky.parent().find('ul li').show(); //always have these open (used on filter matches on branch names)
        $clicky.parent().children('ul').toggle('fast');
    },

    clearFilter: function () {
        var $root = $('ul#list0');

        // close all folders
        $root.find('ul').hide();
        $root.find('img.folder').each(function () {
            this.src = 'icons/folder.png'
        });

        $root.find('li').show();
        $root.find('li a').each(function () {
            $(this).text(this.title);
        })
    },

    filterNodes: function (filter) {
        var $root = $('ul#list0');
        var re = new RegExp('(' + RegExp.quote(filter) + ')', 'ig');

        // hide all nodes
        $root.find('li').hide();

        // reshow matching ones
        $root.find('li').each(function () {
            var $item = $(this);
            var $link = $item.children('a');

            var matches = $link[0].title.match(re);
            if (matches) {
                $item.show(); // reshow item
                $item.parents('li').show(); // reshow parent LIs
                $item.parents('ul').show(0, function () {
                    try {
                        $(this).parent('li').find('img')[0].src = 'icons/folder_open.png';
                    } catch (e) {

                    }
                });

                $link.html($link[0].title.replace(re, '<span class="hi">$1</span>'));
            }
        });
    }
};