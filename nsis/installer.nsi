!define APPNAME "Nyx"
!define EXE_NAME "nyx.exe"
!define UNINSTALLER "nyx-uninstall.exe"

InstallDir "$PROGRAMFILES\${APPNAME}"  

Outfile "${APPNAME}-Setup.exe"
ShowInstDetails show
RequestExecutionLevel admin

Page directory  
Page instfiles  
UninstPage uninstConfirm  
UninstPage instfiles  

Section "Install"
  SetOutPath "$INSTDIR"
  File "..\build\bin\${EXE_NAME}"
  CreateShortcut "$DESKTOP\${APPNAME}.lnk" "$INSTDIR\${EXE_NAME}"

  WriteRegStr HKCU "Software\${APPNAME}" "InstallDir" "$INSTDIR"
  CreateDirectory "$APPDATA\${APPNAME}"
  WriteRegStr HKCU "Software\${APPNAME}" "DataDir" "$APPDATA\${APPNAME}"

  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayName" "${APPNAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "UninstallString" "$INSTDIR\${UNINSTALLER}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayIcon" "$INSTDIR\${EXE_NAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "Publisher" "NormalBeans"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "InstallLocation" "$INSTDIR"
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "NoModify" "1"
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "NoRepair" "1"

  MessageBox MB_OK "${APPNAME} installed successfully!"
  WriteUninstaller "$INSTDIR\${UNINSTALLER}"
SectionEnd

Section "Uninstall"
  ReadRegStr $INSTDIR HKCU "Software\${APPNAME}" "InstallDir"
  ReadRegStr $R0 HKCU "Software\${APPNAME}" "DataDir"
  Delete "$INSTDIR\${EXE_NAME}"
  Delete "$INSTDIR\uninstall.exe"
  Delete "$DESKTOP\${APPNAME}.lnk"
  
  RMDir /r "$R0"
  RMDir "$INSTDIR"

  DeleteRegKey HKCU "Software\${APPNAME}"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}"

  MessageBox MB_OK "${APPNAME} uninstalled successfully!"
SectionEnd