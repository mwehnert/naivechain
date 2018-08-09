# Script für das Webinar

## Wer sind wir?

- Viktor Reinholt
- Matthias Wehnert

## Was sind wir?

- Entwickler
- SharePoint Entwickler
- Web-Entwickler
- Technikinteressierte
- WIE IHR!!!
- und und und ...

## Was sind wir NICHT?

- Blockchain-Experten
- Menschen, die Erfahrung mit Blockchain in Business-Szenarien haben
- Alleswisser

## Agenda

- Wie implentiert man eine Blockchain? – Naivechain & Features
- Wie benutze ich die Naivechain? – Steuerung
- Wie funktioniert die Naivechain? – Kommunikation
- Was macht die Naivechain sicher? – Angriffsszenarien & Validierung
- Was fehlt in dieser Chain? – Proof-of-Work, Nonce, Difficulty & Co.
- Wie geht es weiter? - Ausblick

## Naivechain & Features

- [Naivechain GitHub-Repository](https://github.com/lhartikk/naivechain/)
  - Lauri Hartikka's [Blogpost](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54#.dttbm9afr5)
  - Unser [GitHub-Repository](https://github.com/mwehnert/naivechain)
- Extrem simple Beispiel-Implementierung
  - Javascript
  - Node.js
    - Express
    - Websockets
  - Crypto.js
- Bestandteile

  - Blöcke

    - **LIVE-CODING Block Struktur**
    - Javascript Class
    - ```
      constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
      }
      ```

  - Chain
    - In-Memory Javascript Array
  - Steuerung
    - Http-Server: express.js
    - (Abrufen der Chain und Peers)
    - (Hinzufügen von Blöcken und Peers)
  - Kommunikation zwischen den Knoten
    - Peer2Peer: Websockets

## Steuerung

- Jede Node wird über einen eigenen Http-Server kontrolliert
  - Abrufen der Chain und Peers
  - Hinzufügen von Blöcken und Peers
- **Demonstration der Blockchain**
  - Routen über Curl/Postman ansprechen
  - Ergebnisse zeigen

## Kommunikation

- Keine automatische Peer-Discovery: Händisch hinzufügen
- Aufgaben
  - Verhandlung über die gültige Chain
  - Bekanntmachung neuer Blöcke
- Die Nodes untereinander kommunizieren Peer2Peer über Websockets:
  - beim Erstellen eines neuen Blocks (**Broadcast**)
  - beim connecten zu einer neuen Peer-Node
    1. Erfrage neuesten Block (-> Hinzufügen zur eigenen Chain)
    2. Erfrage komplette Chain (-> Ersetze eigene Chain)
- **Demonstration der Blockchain**
  - Demonstriere Broadcast
  - Demonstriere das Hinzufügen eines neuen Peers

## Angriffsszenarien & Validierung

- Manipulation einmal abgelegter Daten
  - Durch Blockchain Architektur verhindert
  - **Demonstration der Validierung im Code**
    - isValidNewBlock(newBlock, previousBlock)
    - isValidChain(blockchainToValidate)
- 50+1% Angriff
  - Mehr als 50% der Rechenleistung aller Teilnehmer
  - Forks
  - Double-Spending etc.

## Proof-of-Work, Nonce, Difficulty & Co.

- Keine Difficulty/Nonce
  - Erstellen valider Blöcke ist trivial
  - Kein Glückspiel / Kein Aufwand
  -
- Kein Proof-of-Work
  - Anreitz für das Erstellen neuer Blöcke
  - Problem: Energieverschwendung!
  - Alternative: Proof-of-Stake
    - Kein finanzieller Anreiz
    - Deterministisch -> Auswahl des nächsten Blockerstellers nach Algorithmus
- Keine Verschlüsselung
- Keine Signatur
- und, und, und...

## Ausblick
