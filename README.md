# Squires of the Linux Realm
Teach Linux to kids by hunting down a thief in the market. 

## 🗡️ Play now

**[▶ Play The Market Thief](https://frostonmars.github.io/market-thief.html)** — a terminal adventure for young squires.
Learn real Linux commands (`ls`, `cd`, `cat`, `pwd`, `mkdir`, `mv`) by tracking a
green-hooded thief through a medieval market. Works on desktop and mobile.

## Quest reward

Before the wanted poster is read, all six NPCs point players to
`cat ~/wanted_poster.txt` instead of giving their usual dialogue or clues.

Farmer Odo offers his key only after the player reads Bram's clue about the
stables and then talks to Odo. Moving or copying the key before his permission
is blocked with guidance on what to do next.

Catching the thief adds `knights_sword` to `~/inventory`, alongside anything
already in the bag. Read its description with `cat ~/inventory/knights_sword`.
The reward lasts for the current game only; refreshing or restarting resets it.
Future quests can include `knights_sword` as a default file in their starting
`inventory` directory. No cross-quest saving is implemented yet.
