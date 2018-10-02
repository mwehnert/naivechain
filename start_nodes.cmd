@echo off

start powershell .\start_node.ps1 -PortOffset 1
REM timeout 4
REM start /min powershell .\start_node.ps1 -PortOffset 2 -ConnectToNode1
