!define APPNAME "Nyx"
!define EXE_NAME "nyx.exe"

Outfile "${APPNAME}-Setup.exe"
InstallDir "$PROGRAMFILES\${APPNAME}"  ; Default directory
ShowInstDetails show
RequestExecutionLevel admin

Page directory  ; Allows user to change install location
Page instfiles  ;

Section "Install"
  SetOutPath "$INSTDIR"
  File "..\build\bin\${EXE_NAME}"
  CreateShortcut "$DESKTOP\${APPNAME}.lnk" "$INSTDIR\${EXE_NAME}"

  ; Save the installation directory in the registry
  WriteRegStr HKCU "Software\${APPNAME}" "InstallDir" "$INSTDIR"
SectionEnd
