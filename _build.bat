@ECHO OFF

:: Files in /src in the order of execution
SET FILE_LIST=(core console commands events gui override instance)

SETLOCAL ENABLEDELAYEDEXPANSION
SET PROGRESS=0
SET RETURN=STEP1
GOTO SHOWPROGRESS
:STEP1
rm PCFW.js
rm PCFW.min.js
SET PROGRESS=1
SET RETURN=STEP2
GOTO SHOWPROGRESS
:STEP2
SET HOUR=%TIME:~0,2%
IF %HOUR% LSS 12 SET HOUR=0%TIME:~1,1%
SET FIRST=1
ECHO //Generated at %DATE% %HOUR%:%TIME:~3,5% > PCFW.js
FOR %%i in %FILE_LIST% do (
    IF !FIRST! LEQ 0 ECHO. >> PCFW.js
    CAT src/%%i.js >> PCFW.js
    SET FIRST=0
)
SET PROGRESS=2
SET RETURN=STEP3
GOTO SHOWPROGRESS
:STEP3
CD system/lib
git pull --quiet origin master
CD ../..
SET PROGRESS=3
SET RETURN=STEP4
GOTO SHOWPROGRESS
:STEP4
java -jar system/compiler.jar --charset UTF-8 --compilation_level ADVANCED_OPTIMIZATIONS --jscomp_off=externsValidation --language_in ECMASCRIPT5 --externs system/compile/custom.js --externs system/compile/jquery-1.8.3.min.js --externs system/lib/avatars.js --externs system/lib/plug.js --externs system/lib/room.js --js PCFW.js --js_output_file=compiled.js 2> build.log
echo //Generated at %DATE% %HOUR%:%TIME:~3,5% > PCFW.min.js
type compiled.js >> PCFW.min.js
SET PROGRESS=4
SET RETURN=STEP5
GOTO SHOWPROGRESS
:STEP5
rm compiled.js
SET PROGRESS=5
SET RETURN=STEP6
GOTO SHOWPROGRESS
:STEP6
ECHO.
FOR /F "usebackq" %%A IN ('build.log') DO SET LOGSIZE=%%~zA
IF %LOGSIZE% GTR 0 ECHO Build status: Errors and/or warnings, read build.log for more details
IF %LOGSIZE%==0 (
    ECHO Build status: No errors
    RM build.log
)
ECHO.
ECHO ==== DONE ====
GOTO END

:SHOWPROGRESS
CLS
ECHO ####################################################
ECHO #             Plug.dj Coding FrameWork             #
ECHO #                                                  #
ECHO #     _/_/_/      _/_/_/  _/_/_/_/  _/          _/ #
ECHO #    _/    _/  _/        _/        _/          _/  #
ECHO #   _/_/_/    _/        _/_/_/    _/    _/    _/   #
ECHO #  _/        _/        _/          _/  _/  _/      #
ECHO # _/          _/_/_/  _/            _/  _/         #
ECHO #                                                  #
ECHO #                    Build tool                    #
ECHO ####################################################
ECHO.
IF !PROGRESS!==0    ECHO REMOVE OLD BUILDS    : IN PROGRESS
IF !PROGRESS! GEQ 1 ECHO REMOVE OLD BUILDS    : DONE
IF !PROGRESS! LSS 1 ECHO COMBINE SOURCE FILES :
IF !PROGRESS!==1    ECHO COMBINE SOURCE FILES : IN PROGRESS
IF !PROGRESS! GEQ 2 ECHO COMBINE SOURCE FILES : DONE
IF !PROGRESS! LSS 2 ECHO UPDATING PLUG.DJ LIB :
IF !PROGRESS!==2    ECHO UPDATING PLUG.DJ LIB : IN PROGRESS
IF !PROGRESS! GEQ 3 ECHO UPDATING PLUG.DJ LIB : DONE
IF !PROGRESS! LSS 3 ECHO MINIFY SOURCE        :
IF !PROGRESS!==3    ECHO MINIFY SOURCE        : IN PROGRESS
IF !PROGRESS! GEQ 4 ECHO MINIFY SOURCE        : DONE
IF !PROGRESS! LSS 4 ECHO CLEAN UP             :
IF !PROGRESS!==4    ECHO CLEAN UP             : IN PROGRESS
IF !PROGRESS! GEQ 5 ECHO CLEAN UP             : DONE
GOTO %RETURN%

:END
PAUSE