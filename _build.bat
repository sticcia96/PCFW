@echo off
rm PCFW.min.js
java -jar system/compiler.jar --charset UTF-8 --compilation_level ADVANCED_OPTIMIZATIONS --jscomp_off=externsValidation --language_in ECMASCRIPT5 --externs system/compile/custom.js --externs system/compile/jquery-1.8.3.min.js --externs system/lib/avatars.js --externs system/lib/plug.js --externs system/lib/room.js --js src/core.js --js src/events.js --js src/commands.js --js src/instance.js --js_output_file=compiled.js
set HOUR=%TIME:~0,2%
IF %HOUR% LSS 12 set HOUR=0%TIME:~1,1%
echo //Generated at %DATE% %HOUR%:%TIME:~3,5% >> PCFW.min.js
type compiled.js >> PCFW.min.js
rm compiled.js
echo.
pause