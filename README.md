# Squires of the Linux Realm
Teach Linux to kids by hunting down a thief in the market. 

## 🗡️ Play now

**[▶ Play The Market Thief](https://frostonmars.github.io/market-thief.html)** — a terminal adventure for young squires.
Learn real Linux commands (`ls`, `cd`, `cat`, `pwd`, `mkdir`, `mv`) by tracking a
green-hooded thief through a medieval market. Works on desktop and mobile.

**[Play Bird of the Belltower](https://frostonmars.github.io/bird-of-the-belltower.html)**
— Quest II. Announce the King's tournament by recovering a bell clapper from a
pie-hatted bird. Starts with `~/inventory/knights_sword`; no previous save needed.

Four new concepts arrive through the story: searching matching lines with `grep`,
case-insensitive searching with `grep -i`, executable permission with `chmod +x`,
and running a trusted script with `./script.sh`. The terminal and scripts are
simulated and support the command forms described by `help`; no real shell runs.

### Quest II walkthrough

1. `cat assignment.txt`, then `cd belltower`, `ls`, and `./ring_bell.sh`.
2. `cd ~/courtyard`, `ls`, and `cat guard.txt` introduce Nessa's enormous log.
   `cat sightings_log.txt` displays 300 reports, then Nessa offers a secret
   shortcut. `cat secret.txt` teaches `grep bird sightings_log.txt`, which
   narrows them to the kitchen trail.
3. `cd ~/kitchen`, `ls`, and `cat cook.txt` introduce case-insensitive search.
   `grep -i bird report.txt` reveals the garden trail.
4. `cd ~/garden`, `ls`, `cat mage_moss.txt`, `cat offer_seed.sh`, `chmod +x offer_seed.sh`,
   then `./offer_seed.sh`. The bird drops the clapper.
5. `mv clapper ~/inventory`, then `mv ~/inventory/clapper ~/belltower`.
6. `cd ~/belltower` and `./ring_bell.sh` complete the quest and award a
   `tournament_ribbon`. `hint` provides recovery guidance throughout.

Listings invite players to meet characters rather than reveal their solutions.
Displayed command chips shorten home-based paths to filenames when the target
is in the player's current directory. Remote targets retain `~/...`; local
script execution retains `./`. Dialogue uses home-based paths as its source so
reading a character's message remotely still offers valid commands.
Mage Moss teaches script inspection before executable permission and casting.
The inspection requirement is a story safety rule, not a Linux restriction:
`chmod +x` allows execution but does not prove a script is safe.

Refresh or `restart` resets Quest II, including its ribbon; the sword is always
part of its default inventory.

The optional `tournament` directory shows preparations before the bell and
celebrations afterward. Read `Squire_Benson.txt` to receive permission to drink
`fizzy_zinger.txt`. Reading the drink then grants magical jumping for this game.
After the bird drops the clapper, drinkers can use `jump` in the garden to leap
over a low fence. This is explicitly a fictional action, not a Linux command;
walking and collecting the clapper normally still works without the bonus.

## Quest reward

Before the wanted poster is read, all six NPCs point players to
`cat ~/wanted_poster.txt` instead of giving their usual dialogue or clues.
Hilda also offers one loaf: reading `cat ~/bakery/fresh_bread.txt` after her
offer describes eating it. Later reads describe crumbs; the file is not deleted.

Farmer Odo offers his key only after the player reads Bram's clue about the
stables and then talks to Odo. Moving or copying the key before his permission
is blocked with guidance on what to do next.

Catching the thief adds `knights_sword` to `~/inventory`, alongside anything
already in the bag. Read its description with `cat ~/inventory/knights_sword`.
The reward lasts for the current game only; refreshing or restarting resets it.
Future quests can include `knights_sword` as a default file in their starting
`inventory` directory. No cross-quest saving is implemented yet.
