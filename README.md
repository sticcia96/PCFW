PCFW
====

## Status
The code isn't ready for use yet, please wait until v.1.0.0 is out!

## What is Plug.dj Coding FrameWork?
PCFW is a framework that can be used to easily write powerful and featureful scripts for the music sharing website <a href="http://plug.dj">plug.dj</a>

## Who is behind PCFW?
PCFW is currently being developed by <a href="https://github.com/TATDK" class="user-mention">@TATDK</a> and <a href="https://github.com/Colgate" class="user-mention">@Colgate</a>.<br />
You may know them from <a href="http://plugpony.net">Plug.Pony</a>, <a href="http://tatdk.github.com/plugCubed/">plug³</a> and SweetieBOT from <a href="http://plug.dj/friendshipismagic/">the Friendship is Magic room</a> on plug.dj.

## How can I help?
If you have any changes to PCFW, simply fork the project, commit to your fork and send a pull request with the changes.<br />
To test your changes, simply build it to get the PCFW.min.js file.

## How to build?
If you are making any changings and want to test it, simply run _build.bat to make the PCFW.min.js file.<br />
It's using [Closure Compiler](https://code.google.com/p/closure-compiler/) (included) to build.<br />
If you make another file in the src folder, add it to the build file. (Please note that the list is in execution order)<br />
``SET FILE_LIST=(core console commands events instance)``