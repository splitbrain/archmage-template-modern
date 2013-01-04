Modern arCHMage template
========================

This is a more modern template for the use with the arCHMage CHM to HTML converter. It creates simpler markup
and supports live filtering of the TOC.

Usage
-----

First install [arCHMage](http://archmage.sourceforge.net/) and get it working, then edit your
```etc/archmage/arch.conf``` to point the ```templates_dir``` and ```icons_dir``` to where you downloaded the template
to:

    templates_dir = '/home/andi/projects/archmage-template-modern/'

    icons_dir = '/home/andi/projects/archmage-template-modern/icons/'

Limitations
-----------

* The table of contents currently does not reflect the current page
* Color variables from the config are ignored
* ```restore_framing``` support is missing/broken