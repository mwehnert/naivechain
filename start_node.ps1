[CmdletBinding()]
Param (
    [int] $PortOffset = 1,

    [Switch] $ConnectToNode1
)

$env:HTTP_PORT = (3000 + $PortOffset)
$env:P2P_PORT = (6000 + $PortOffset)

Remove-Item Env:\PEERS -ErrorAction SilentlyContinue

if ($ConnectToNode1) {
    $env:PEERS = "ws://localhost:6001"
}

if ($PortOffset -eq 1) {
    npm run debug
} else {
    npm start
}
