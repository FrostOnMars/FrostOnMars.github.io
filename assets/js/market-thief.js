// ---------- The market, built like a real Linux folder tree ----------
const F = (text, clue, news) => ({type:'file', text, clue, news});
const D = (children) => ({type:'dir', children:Object.assign(Object.create(null),children)});

const FS = D({
  'welcome.txt': F(
`Greetings, Squire!

Your first adventure awaits.
But every explorer must first find their place on the map.`),
  'wanted_poster.txt': F(
`=========  WANTED  =========
  The King's SILVER GOBLET
  has been STOLEN!

A THIEF in a GREEN HOOD snatched it this morning.
The baker opens her shop before sunrise and sees everyone.
Start your search at the BAKERY.

Reward: a real knight's sword.
============================

Follow the smell of fresh bread!
Type: \`cd bakery\``, 1),

  bakery: D({
    'baker_hilda.txt': F(
`Hilda the Baker wipes flour off her hands.

"A green hood? Yes! Someone in a green hood bumped my table and ran off with a loaf AND something shiny under their cloak.
They ran toward the sound of the hammer. Hear that CLANG! CLANG!?
That's the BLACKSMITH."

To go back out to the square, type \`cd ..\`
(Two dots mean "the room I came from.")
Then try \`cd blacksmith\``, 2,
`Hilda dusts flour from her apron and points at a peeling sign on the wall.
"Have you heard the news, dear? Here, take a loaf. And read that before your bread gets cold!"`),
    'fresh_bread.txt': F(
`Warm, crusty loaves sit in neat rows. It smells wonderful.
One loaf is missing. Somebody was hungry... and sneaky.`)
  }),

  blacksmith: D({
    'smith_bram.txt': F(
`Bram the Blacksmith stops hammering. Sparks fly from his ANVIL.
(An anvil is a heavy iron block for hammering metal on.)

"Aye, some lad in a green hood ran right past my forge, heading for the horses. Can't be him, can it? Try the STABLES. I heard a ruckus that way."

Go back with \`cd ..\` and then \`cd stables\`
Or do it in one step: \`cd ../stables\``, 3,
`Bram lowers his hammer and points at a peeling sign on the wall.

"CLANG! Heard the news, squire? They're offering a knight's sword to whoever catches that thief everyone's talking about."

He points to a soot-blackened sign on the wall.`),
    'anvil.txt': F(
`A big black anvil. It is too heavy to lift, even for a knight.`)
  }),

  fruit_stall: D({
    'farmhand_tilly.txt': F(
`Tilly the Farmhand is stacking watermelons bigger than your head.

"Looking for Farmer Odo? You JUST missed him! Selling melons all morning made him thirsty, so he's taking a break at the TAVERN."

Go find him: \`cd ..\` then \`cd tavern\``, 4,
`Tilly steadies a wobbly watermelon and points at a peeling sign on the wall.
"Have you heard the news? It's juicier than these melons! Take a look!"`),
    'apples.txt': F(
`Red apples, green apples, and one very wormy apple. Yuck.`),
    'watermelons.txt': F(
`A mountain of fat green watermelons. One of them has a big bite taken right out of it. A sneaky, thief-sized bite. Hmm...`)
  }),

  tavern: D({
    'barkeep_mags.txt': F(
`Mags the Barkeep polishes a mug. (A TAVERN is an inn where travelers eat, drink, and rest.)

"No green hoods in here today, love. But if you're after Farmer Odo, he's in the corner booth resting his feet.
And don't go poking about in my cellar!"`, undefined,
`Mags polishes a mug and points at a peeling sign on the wall.
"Have you heard the news, love? Everyone's talking about that sign!"`),
    'farmer_odo.txt': F(
`Farmer Odo sips cider in the corner booth, boots up on a stool.

"The barn? Aye, I locked it — can't have strangers spooking my horses. Wait... a THIEF might be hiding in there?! Then hurry, take my IRON KEY! It's right there on the table.

A good squire keeps treasures in a BAG. In Linux, a bag is just a directory that you make yourself!"

Step 1 - make your bag:     \`mkdir ~/inventory\`
Step 2 - pick up the key:   \`mv iron_key ~/inventory\`
         (mv means MoVe: it moves a file into a directory)
Step 3 - peek in your bag:  \`ls ~/inventory\`

Then march to the barn: \`cd ~/stables\``, 5,
`Odo wipes sweat off his brow and points at a peeling sign on the wall.
"Hello, squire! Heard the news? I've been too busy with the melons, but they say a thief's about!"`),
    'iron_key': F(
`A heavy iron key, cold and a little rusty. It must open the big barn doors at the STABLES.

Pick it up with: \`mv iron_key ~/inventory\`
(No bag yet? Make one first: \`mkdir ~/inventory\`)`),
    cellar: D({
      'barrels.txt': F(
`It's dark and cool down here. Just barrels of apple cider.
No thief here. Lost? Type \`pwd\` to see where you are.
Type \`cd ~\` to zoom all the way home to the market square.`)
    })
  }),

  stables: D({
    'stablehand_pip.txt': F(
`Pip the Stablehand looks worried.

"The horses are jumpy! They keep looking UP at the HAYLOFT.
That's that room high up under the roof where we keep the hay.
I think someone is up there!"

Type \`ls\` to look for the way up.`, 6,
`Pip twists a handful of hay and points at a peeling sign on the wall.
"Have you heard the news? Even the horses seem worried! Read that sign!"`),
    'horse.txt': F(
`A brown horse named Biscuit snorts and stares at the ceiling.`),
    hayloft: D({
      'hay.txt': F(
`Piles and piles of hay. It looks like nobody is here...

But wait. The hay just MOVED.

Sneaky things like to HIDE. In Linux, hidden files have names that start with a dot, like .secret
Plain ls won't show them. You need to ask for ALL files.

Type: \`ls -a\``, 7),
      '.thief': F('', 'win')
    })
  })
});

// ---------- State ----------
const freshBread = FS.children.bakery.children['fresh_bread.txt'];
let cwd = [];
let clues = new Set();
let used = new Set();
const commandHistory = Terminal.createHistory();
let won = false;
let visited = new Set();
let stuck = 0;
let unlocked = false;   // the barn doors at the stables
let sawLocked = false;  // player has bumped into the locked doors
let odoOfferedKey = false;
let breadOffered = false;
let breadEaten = false;
const TRACK = ['ls','cd','cat','pwd','mkdir','mv','help','clear'];

const out = document.getElementById('out');
const input = document.getElementById('cmd');
const promptEl = document.getElementById('prompt');

// ---------- Helpers ----------
const pathStr = Terminal.pathStr;
function nodeAt(parts){ return Terminal.nodeAt(FS,parts); }
function resolve(path, options){
  return Terminal.resolve(FS,cwd,path,options);
}
function pathError(result, path){
  if(!result.error) return false;
  const messages = {
    OUTSIDE_QUEST:'The city guards gently point you back. "Your adventure is inside the market!" Try `cd ~`.',
    INVALID_HOME:'Use ~ by itself for home, or ~/ followed by a name. Try `ls ~`.',
    EMPTY_PATH:'Which scroll or room do you mean? Try `ls` to see the names.',
    NOT_DIRECTORY:`A scroll is blocking that path: ${path}. You can read files with cat; only directories hold other things.`,
    NOT_FOUND:`I couldn't find ${path}. Check the names with \`ls\`, or type \`hint\` for help.`
  };
  printLine(messages[result.error],'err');
  return true;
}
function printLine(text, cls='story'){
  if(cls==='err'){ stuck++; if(stuck>=3){ stuck=0; setTimeout(()=>printLine('Feeling stuck? Type `hint` and I will point you the right way.','hint'),0); } }
  else if(cls==='story'||cls==='dim'||cls==='win'){ stuck=0; }
  const d = Terminal.render(out, input, text, cls + ' new', {
    commandTitle:'Tap to type this',
    stopPropagation:true
  });
  setTimeout(()=>d.classList.remove('new'),300);
}
function updateLog(){
  document.getElementById('clues').textContent = clues.size + '/7';
  document.getElementById('learned').textContent = [...used].filter(c=>TRACK.includes(c)).length + '/8';
  const pips = document.getElementById('pips'); pips.innerHTML='';
  for(let i=1;i<=7;i++){ const e=document.createElement('i'); if(clues.has(i)) e.className='on'; pips.appendChild(e); }
  promptEl.textContent = 'squire@market:' + pathStr(cwd) + '$';
}

// ---------- Room flavor ----------
const FLAVOR = {
  square:{
    first:`You stand in the heart of the MARKET SQUARE. Carts rattle over the cobblestones, a juggler drops his pins, pigeons scatter, and merchants shout about bread, apples, and horseshoes. Somewhere out there, a thief in a green hood is hiding with the King's goblet.`,
    back:'You weave through the crowd, back in the busy MARKET SQUARE.',
    nudge:'Look around with `ls`.'},
  bakery:{
    first:`You step into the BAKERY. Warm air hugs you like a blanket, and the smell of fresh bread makes your tummy growl. Flour dusts the floor like snow — and wait... are those floury FOOTPRINTS running out the door?`,
    back:'Back in the warm bakery. Hilda gives you a floury wave.',
    nudge:'Someone in here may have seen the thief. Type `ls` to see who is around.'},
  blacksmith:{
    first:`You duck into the BLACKSMITH's shop. CLANG! CLANG! Sparks leap like tiny orange fireflies, and the air is hot enough to toast bread.
Swords and horseshoes glitter on the walls in the firelight.`,
    back:'Back in the hot, noisy blacksmith\'s shop. CLANG! CLANG!',
    nudge:'Type `ls` to see who is here.'},
  fruit_stall:{
    first:`You reach the FRUIT STALL. Apples are stacked in wobbly red-and-green pyramids, and watermelons sit in a pile like sleeping cannonballs.
Tilly the Farmhand is heaving them about, puffing and sweating.`,
    back:'Back at the fruit stall. Tilly waves between watermelon lifts.',
    nudge:'Type `ls` to see who is here.'},
  tavern:{
    first:`You push open the creaky TAVERN door. Inside it is dim and cozy:
a crackling fire, long wooden tables, and the clink of heavy mugs.
In the corner booth, a farmer with muddy boots sips a mug of cider.`,
    back:'Back in the cozy tavern. The fire pops and crackles.',
    nudge:'Type `ls` to see who is here.'},
  cellar:{
    first:`You creep down the stone steps into the dark CELLAR (a room under the ground). It is cool and quiet, and your footsteps echo. Big round barrels line the walls like a row of sleeping giants.`,
    back:'Down in the dark, echoey cellar again. Drip... drip...',
    nudge:'Type `ls` to look around.'},
  stables:{
    first:`You walk into the STABLES. It smells of hay and horses. Hooves stamp, tails swish — and every single horse is staring nervously at the ceiling. Something up there has spooked them.`,
    back:'Back in the stables. The horses are STILL staring at the ceiling.',
    nudge:'Type `ls` to see who is here.'},
  hayloft:{
    first:`You climb the wooden ladder up, up, up into the HAYLOFT. Golden dust floats in the sunbeams, and hay is piled higher than your head.
It is very quiet up here... almost TOO quiet. Was that a tiny sneeze?`,
    back:'Up in the dusty hayloft again. Something rustles in the hay.',
    nudge:'Search the hay: type `ls` to look around.'},
  inventory:{
    first:`You open the flap of your INVENTORY bag and peek inside. It smells of new leather. Anything you \`mv\` in here goes with you everywhere.`,
    back:'You rummage around inside your inventory bag.',
    nudge:'Type `ls` to see what you are carrying, and `cd ~` to climb back out.'}
};
function enterRoom(){
  updateLog();
  const here = cwd[cwd.length-1] || 'square';
  const f = Object.hasOwn(FLAVOR,here) ? FLAVOR[here] : {
    first:`You step into ${here} — a brand-new place that YOU built with mkdir!`,
    back:`Back inside ${here}.`,
    nudge:'Type `ls` to look around.'};
  const firstTime = !visited.has(here);
  visited.add(here);
  printLine(firstTime ? f.first : f.back, firstTime ? 'story' : 'dim');
  if(!used.has('cd-taught')){
    used.add('cd-taught');
    printLine('cd means Change Directory. It moves you into another folder, like entering a new place.','hint');
    printLine(f.nudge,'hint');
  }
  else if(firstTime && f.nudge) printLine(f.nudge,'hint');
}
// ---------- The locked barn ----------
function lockedPath(parts){ return !unlocked && parts && parts[0]==='stables'; }
function findKey(node=FS, path=[]){
  for(const n of Object.keys(node.children||{})){
    const c = node.children[n];
    if(n==='iron_key' && c.type==='file') return path.concat(n);
    if(c.type==='dir'){ const r = findKey(c, path.concat(n)); if(r) return r; }
  }
  return null;
}
function tryUnlock(){
  const inv = FS.children['inventory'];
  if(inv && inv.type==='dir' && inv.children['iron_key']){
    unlocked = true;
    printLine(`You pull the heavy IRON KEY out of your inventory bag and slide it into the lock. CLUNK! The big barn doors creak open.`,'story');
    return true;
  }
  sawLocked = true;
  if(!clues.has(5)){
    printLine(`The big BARN DOORS are locked tight. A wooden sign hangs on the handle:

   "Gone to sell watermelons at the FRUIT STALL.
    Back later!              — Farmer Odo"`,'story');
    printLine('Farmer Odo must have the key. Find him: type `cd ~` then `cd fruit_stall`','hint');
  } else {
    printLine('You rattle the handle, but the big barn doors are still LOCKED tight.','story');
    printLine('You need the IRON KEY inside your inventory bag. Type `hint` if you forget the steps.','hint');
  }
  return false;
}

// ---------- Commands ----------
function pointToPoster(node){
  if(clues.has(1) || !node.news) return false;
  if(node.clue===2){
    if(!breadOffered){
      breadOffered = true;
      printLine(node.news,'story');
      printLine('Hilda hands you a warm loaf.','story');
    } else {
      printLine('Hilda smiles and points at the peeling sign. "Have you read the news yet, dear?"','story');
    }
    if(!breadEaten){
      printLine('Read about your treat: `cat ~/bakery/fresh_bread.txt`','hint');
    } else {
      printLine('Read the wanted poster: `cat ~/wanted_poster.txt`','hint');
    }
    return true;
  }
  printLine(node.news,'story');
  printLine('Read the wanted poster: `cat ~/wanted_poster.txt`','hint');
  return true;
}

function canTakeKey(parts){
  if(parts[parts.length-1]!=='iron_key' || odoOfferedKey) return true;
  printLine('"Careful, squire!" Odo says. "Taking my key without asking would be stealing."','story');
  if(!clues.has(1)){
    printLine('Odo points at a peeling sign on the wall. "Have you heard the news, squire?"','story');
    printLine('Read the wanted poster: `cat ~/wanted_poster.txt`','hint');
    return false;
  }
  if(clues.has(3)){
    printLine('Tell Odo about the thief: `cat ~/tavern/farmer_odo.txt`','hint');
  } else {
    printLine('Find out where the thief went. Ask Bram the blacksmith: `cat ~/blacksmith/smith_bram.txt`','hint');
  }
  return false;
}

const CMDS = {
  help(){
    printLine(
`Here are the magic words you can type. Press Enter after each one.

  \`ls\`          LiSt what is in this room (files and doorways)
  \`ls -a\`       list ALL things, even hidden ones
  \`cd bakery\`   Change Directory: walk into a room called bakery
  \`cd ..\`       go back to the room you came from
  \`cd ~\`        go all the way home to the market square
  \`cat name\`    read a scroll (a file) out loud
  \`mkdir name\`  MaKe a DIRectory: build a new room or bag
  \`mv a b\`      MoVe file a into directory b (pick things up!)
  \`pwd\`         Print Working Directory: "where am I?"
  \`hint\`        a friendly nudge if you don't know what to do next
  \`clear\`       wipe the screen clean
  \`help\`        show this list again

Spelling matters, and so do CAPITAL letters. Bakery and bakery are different!`,'hint');
  },
  ls(args){
    const all = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const target = args.find(a=>!a.startsWith('-'));
    let node = nodeAt(cwd);
    let parts = [...cwd];
    if(target){ const r=resolve(target); if(pathError(r,target)) return; if(lockedPath(r.parts)){ sawLocked=true; printLine('The barn doors are locked tight. You cannot peek inside.','story'); return; } node=r.node; parts=r.parts; if(node.type==='file'){ printLine(target,'story'); return; } }
    if(!Terminal.renderListing({out,input,node,parts,getCwd:()=>cwd,all})) return;
    if(!used.has('ls-taught')){
      used.add('ls-taught');
      printLine('ls lists what is here: files to read and folders to explore.', 'hint');
    }

    if(node === FS && !clues.has(1)){
      used.add('square-listed');
      printLine(
`A wanted poster flutters beside a stall.
Someone needs your help!

Read it: \`cat ${parts.length===cwd.length && parts.every((part,index)=>part===cwd[index]) ? 'wanted_poster.txt' : '~/wanted_poster.txt'}\``,
        'hint'
      );
    }
    if(all && parts.join('/')==='stables/hayloft' && !won){ printLine(`A file named .thief! It was hidden because its name starts with a dot.\nRead it to catch the thief: \`cat ${cwd.join('/')==='stables/hayloft' ? '.thief' : '~/stables/hayloft/.thief'}\``,'hint'); }
  },
  cd(args){
    const arg = args[0];
    if(!arg || arg==='~'){ cwd=[]; enterRoom(); return; }
    const r = resolve(arg);
    if(pathError(r,arg)){ if(r.error==='NOT_FOUND') suggest(arg); return; }
    if(r.node.type==='file'){ printLine(`bash: cd: ${arg}: Not a directory\nThat's a scroll, not a room. Read it with \`cat ${arg}\``,'err'); return; }
    if(lockedPath(r.parts) && !tryUnlock()) return;
    cwd = r.parts; enterRoom();
  },
  cat(args){
    if(!args.length){ printLine('cat needs to know which scroll to read. Example: `cat welcome.txt`','err'); return; }
    for(const a of args){
      const r = resolve(a);
      if(pathError(r,a)){ if(r.error==='NOT_FOUND') suggest(a); continue; }
      if(lockedPath(r.parts)){ sawLocked=true; printLine('The barn doors are locked tight. You cannot reach inside.','story'); continue; }
      if(r.node.type==='dir'){ printLine(`cat: ${a}: Is a directory\nThat's a room, not a scroll. Walk in with \`cd ${a}\``,'err'); continue; }
      if(r.node.clue==='win'){ winGame(); continue; }
      if(pointToPoster(r.node)) continue;
      if(r.node===freshBread && breadOffered){
        if(breadEaten){
          printLine('Only a few crumbs remain. That was delicious!','story');
        } else {
          breadEaten = true;
          printLine('You bite into the warm bread. CRUNCH! The crust crackles, and the soft middle tastes buttery and delicious.','story');
          printLine("With a full tummy, you're ready for adventure!",'story');
        }
        if(!clues.has(1)) printLine('Read the news: `cat ~/wanted_poster.txt`','hint');
        continue;
      }
      if(r.node.clue===5){
        if(!clues.has(3)){
          printLine('Farmer Odo waves hello and wipes sweat off his brow.\n"Hot work selling watermelons! What brings you here, squire?"','story');
          printLine('Find out where the thief went. Ask Bram the blacksmith: `cat ~/blacksmith/smith_bram.txt`','hint');
          continue;
        }
        odoOfferedKey = true;
      }
      if(r.parts[r.parts.length-1]==='iron_key' && !odoOfferedKey){
        printLine('A heavy iron key rests on the table. It belongs to Farmer Odo.','story');
        printLine('Ask its owner before taking it: `cat ~/tavern/farmer_odo.txt`','hint');
        continue;
      }
      printLine(r.node.text,'story');
            if(r.node === FS.children['welcome.txt']){
        if(!used.has('welcome-read')){
          used.add('welcome-read');
          printLine(
            '`cat` shows the words inside a file. Imagine a cat pawing open a scroll!',
            'hint'
          );
        }

        printLine('Find your place on the map: `pwd`', 'hint');
      }
      if(typeof r.node.clue==='number' && !clues.has(r.node.clue)){ clues.add(r.node.clue); updateLog(); printLine(`✦ Clue found! (${clues.size} of 7)`,'hint'); }
    }
  },
  hint(){
    if(won){ printLine('You already caught the thief! Type `restart` to play again.','hint'); return; }
    const here = cwd.join('/');
       if(!clues.has(1)){
      if(here !== ''){
        printLine('Return to the market square: `cd ~`', 'hint');
      } else if(!used.has('welcome-read')){
        printLine('Your scroll is waiting. Open it: `cat welcome.txt`', 'hint');
      } else if(!used.has('pwd-taught')){
        printLine('Find your place on the map: `pwd`', 'hint');
      } else if(!used.has('square-listed')){
        printLine('See what is nearby: `ls`', 'hint');
      } else {
        printLine('Find out who needs help: `cat wanted_poster.txt`', 'hint');
      }
    } else if(!clues.has(2)){
      if(here==='bakery') printLine('Hilda the baker sees everyone. Talk to her: type `cat baker_hilda.txt`','hint');
      else printLine('The poster said to start at the BAKERY.\nType `cd ~` to go home, then `cd bakery`','hint');
    } else if(!clues.has(3)){
      if(here==='blacksmith') printLine('Ask the blacksmith what he saw: type `cat smith_bram.txt`','hint');
      else printLine('Hilda heard the thief run toward the hammering. CLANG! CLANG!\nType `cd ~` then `cd blacksmith`','hint');
    } else if(!unlocked){
      const inv = FS.children['inventory'];
      const hasKey = inv && inv.type==='dir' && inv.children['iron_key'];
      if(hasKey) printLine('You have the key in your bag! Open the barn: type `cd ~/stables`','hint');
      else if(clues.has(5)){
        if(!inv || inv.type!=='dir') printLine('Farmer Odo told you the plan! First make your bag:\ntype `mkdir ~/inventory`','hint');
        else {
          const kp = findKey();
          if(kp && kp.length===1) printLine('The iron key is lying at home in the square! Put it in your bag:\ntype `cd ~` then `mv iron_key ~/inventory`','hint');
          else if(kp) printLine(`The iron key is in the ${kp.slice(0,-1).join('/')}. Go there, then type:\n\`mv iron_key ~/inventory\``,'hint');
          else printLine('Pick up the key at the tavern: type `cd ~/tavern` then `mv iron_key ~/inventory`','hint');
        }
      }
      else if(clues.has(4)){
        if(here==='tavern') printLine('Farmer Odo is in the corner booth. Talk to him: type `cat farmer_odo.txt`','hint');
        else printLine('Farmer Odo is taking a break at the TAVERN.\nType `cd ~` then `cd tavern`','hint');
      }
      else if(sawLocked){
        if(here==='fruit_stall') printLine('Ask the farmhand where Odo went: type `cat farmhand_tilly.txt`','hint');
        else printLine('The sign said Farmer Odo went to the FRUIT STALL.\nType `cd ~` then `cd fruit_stall`','hint');
      }
      else printLine('Bram saw the thief run toward the horses.\nType `cd ~` then `cd stables`','hint');
    } else if(!clues.has(6)){
      if(here==='stables') printLine('The stablehand looks worried. Ask him: type `cat stablehand_pip.txt`','hint');
      else printLine('Back to the barn! Type `cd ~/stables`','hint');
    } else if(!clues.has(7)){
      if(here==='stables/hayloft') printLine('Take a close look at the hay: type `cat hay.txt`','hint');
      else if(here==='stables') printLine('The horses keep looking UP. Climb up: type `cd hayloft`','hint');
      else printLine('Someone is hiding above the stables!\nType `cd ~/stables` then `cd hayloft`','hint');
    } else {
      if(here==='stables/hayloft') printLine('Hidden files start with a dot, and plain `ls` will not show them.\nType `ls -a` to see EVERYTHING, then read what you find with `cat`','hint');
      else printLine('Hurry back to the hayloft! Type `cd ~/stables/hayloft`\nThen type `ls -a` to find what is hiding.','hint');
    }
  },
  mkdir(args){
    if(!args.length){ printLine('mkdir needs a name for the new directory.\nExample: `mkdir ~/inventory` makes a bag at home called inventory.','err'); return; }
    for(const a of args){
      if(a.startsWith('-')) continue;
      const r = resolve(a,{allowMissing:true});
      if(pathError(r,a)) continue;
      if(lockedPath(r.parts)){ sawLocked=true; printLine('The barn doors are locked tight. You cannot build in there.','story'); continue; }
      if(r.node){ printLine(`mkdir: cannot create directory '${a}': File exists`,'err'); continue; }
      const name = r.parts[r.parts.length-1];
      const parent = nodeAt(r.parts.slice(0,-1));
      if(!parent || parent.type!=='dir'){ printLine(`mkdir: cannot create directory '${a}': No such file or directory`,'err'); continue; }
      parent.children[name] = D({});
      if(name==='inventory' && r.parts.length===1){
        printLine(`You stitch together a sturdy leather INVENTORY bag and hang it
from your belt. (You just made a brand-new directory at home!)`,'story');
        printLine('Now you can `mv` things into it, like this: `mv iron_key ~/inventory`','hint');
      } else {
        printLine(`You build a brand-new directory called ${name}. (mkdir = MaKe DIRectory)`,'story');
        if(name==='inventory'){
          printLine(
`Uh oh! In this adventure, an inventory folder here stays here.
Only the bag at home, \`~/inventory\`, travels with you.
The ~ means home, so it works wherever you are.`,
            'hint');
          const homeBag = FS.children['inventory'];
          if(!homeBag){
            printLine("Let's make your travelling bag at home instead: `mkdir ~/inventory`",'hint');
          } else if(homeBag.type==='dir'){
            printLine('Your travelling bag is already at home! Peek inside: `ls ~/inventory`','hint');
          } else {
            printLine('There is a file called inventory at home, but a bag must be a directory. Move that file into another directory first, then make your bag: `mkdir ~/inventory`','hint');
          }
        }
      }
    }
  },
  mv(args){
    if(args.length<2){ printLine('mv needs two parts: the thing to move, then where it goes.\nExample: `mv iron_key ~/inventory`','err'); return; }
    const src = resolve(args[0]);
    if(pathError(src,args[0])) return;
    if(lockedPath(src.parts)){ sawLocked=true; printLine('The barn doors are locked tight. You cannot reach inside.','story'); return; }
    if(src.node.type==='dir'){ printLine(`mv: '${args[0]}' is a whole room! A squire can only carry files, not rooms.`,'err'); return; }
    if(!canTakeKey(src.parts)) return;
    const dst = resolve(args[1]);
    if(pathError(dst,args[1])) return;
    if(lockedPath(dst.parts)){ sawLocked=true; printLine('The barn doors are locked tight. You cannot put things inside.','story'); return; }
    if(dst.node.type!=='dir'){ printLine(`mv: '${args[1]}' is a file, not a directory.\nYou can only put things INSIDE a directory (a room or a bag).`,'err'); return; }
    const name = src.parts[src.parts.length-1];
    const parent = nodeAt(src.parts.slice(0,-1));
    delete parent.children[name];
    dst.node.children[name] = src.node;
    printLine(`You pick up ${name} and tuck it into ${args[1].replace(/\/+$/,'')}.`,'story');
    if(name==='iron_key' && dst.parts.length===1 && dst.parts[0]==='inventory'){
      printLine('The IRON KEY jingles safely in your bag. To the barn! Type `cd ~/stables`','hint');
    } else if(name==='iron_key' && dst.parts[dst.parts.length-1]==='inventory'){
      printLine('Uh oh! That inventory folder stays here. Your travelling bag belongs at home, at ~/inventory.','hint');
      if(!FS.children['inventory']) printLine('Make your travelling bag first: `mkdir ~/inventory`','hint');
      printLine(`Then move the key into your travelling bag: \`mv ${pathStr(dst.parts)}/iron_key ~/inventory\``,'hint');
    }
  },
  cp(args){
    if(args.length<2){ printLine('cp needs two parts: the thing to copy, then where the copy goes.\nExample: `cp apples.txt ~/inventory`','err'); return; }
    const src = resolve(args[0]);
    if(pathError(src,args[0])) return;
    if(lockedPath(src.parts)){ sawLocked=true; printLine('The barn doors are locked tight. You cannot reach inside.','story'); return; }
    if(src.node.type==='dir'){ printLine(`cp: '${args[0]}' is a directory. In this game you can only copy files.`,'err'); return; }
    if(!canTakeKey(src.parts)) return;
    const dst = resolve(args[1]);
    if(pathError(dst,args[1])) return;
    if(dst.node.type!=='dir' || lockedPath(dst.parts)){ printLine(`cp: cannot copy to '${args[1]}': No such directory`,'err'); return; }
    const name = src.parts[src.parts.length-1];
    dst.node.children[name] = {type:'file', text:src.node.text, news:src.node.news};
    printLine(`You make a perfect copy of ${name}. Now there are two! (Bonus command: cp means CoPy.)`,'story');
  },
  touch(args){
    if(!args.length){ printLine('touch needs a name. Example: `touch note.txt` makes a new empty scroll.','err'); return; }
    for(const a of args){
      const r = resolve(a,{allowMissing:true});
      if(pathError(r,a)) continue;
      if(lockedPath(r.parts)){ printLine(`touch: cannot touch '${a}'`,'err'); continue; }
      if(r.node) continue; // real touch just updates the time — nothing to show here
      const parent = nodeAt(r.parts.slice(0,-1));
      if(!parent || parent.type!=='dir'){ printLine(`touch: cannot touch '${a}': No such file or directory`,'err'); continue; }
      parent.children[r.parts[r.parts.length-1]] = F('(a blank scroll — you made it yourself with touch!)');
      printLine(`You unroll a fresh blank scroll called ${r.parts[r.parts.length-1]}. (Bonus command: touch makes new empty files.)`,'story');
    }
  },
  rm(){ printLine('Whoa there, squire! rm REMOVES things FOREVER — far too dangerous\nfor today\'s quest. Nothing in this market may be destroyed.\n(In a real terminal, be VERY careful with rm.)','hint'); },
  pwd(){
    const firstUse = !used.has('pwd-taught');
    printLine(
`The map shows your current location:

/home/squire/market${cwd.length ? '/' + cwd.join('/') : ''}`,
      'story'
    );

    if(firstUse){
      used.add('pwd-taught');
      printLine(
`In Linux, a location is called a DIRECTORY or FOLDER, which can hold other locations or things to interact with. You can use \`pwd\` to check your map.`,
        'story'
      );
    }

    if(firstUse || (cwd.length === 0 && !clues.has(1))){
      printLine(
`What is nearby? Look around: \`ls\`. (That's a little L and a little S.)`,
        'story'
      );
    }
  },
  clear(){ out.innerHTML=''; },
  restart(){ location.reload(); },
  whoami(){ printLine('squire','story'); printLine('(Bonus command! whoami tells you your user name.)','hint'); },
  sudo(){ printLine('Nice try! sudo means "do this as the boss." Even squires must ask the King first.','hint'); },
  exit(){ printLine('A true squire never quits a quest! (In a real terminal, exit closes the window.)','hint'); }
};

function suggest(arg){
  const node = nodeAt(cwd);
  const names = Object.keys(node.children).filter(n=>!n.startsWith('.'));
  const low = arg.toLowerCase().replace(/\/$/,'');
  const hit = names.find(n=>n.toLowerCase()===low) || names.find(n=>n.toLowerCase().startsWith(low.slice(0,3)));
  if(hit) printLine(`Did you mean ${hit}? Check the spelling and the capital letters. Type \`ls\` to see what's here.`,'hint');
  else printLine('Type `ls` to see what is in this room.','hint');
}

function winGame(){
  if(won){
    printLine('You already caught the thief and earned your sword! Check your bag: `ls ~/inventory`','hint');
    return;
  }
  if(!FS.children['inventory']) FS.children['inventory'] = D({});
  const inventory = FS.children['inventory'];
  if(inventory.type!=='dir'){
    printLine('Your reward needs an inventory bag, but ~/inventory is a file. Move it into another directory with `mv inventory bakery`, then try reading the thief file again.','err');
    return;
  }
  inventory.children['knights_sword'] = F(
`A real knight's sword, awarded for catching the Market Thief.
Its polished blade gleams, and your name is engraved on the hilt.
A reminder to be brave, kind, and protect those who need your help.`);
  won = true;
  printLine(
`You pull back the hay...

There, curled up with a loaf of bread, is a skinny kid in a GREEN HOOD, holding the King's SILVER GOBLET!

"Aw, rats," says Wren the Pickpocket. "Nobody EVER finds the hidden files."

Wren hands back the goblet and promises to work at the bakery to pay Hilda back for the bread.`,'story');
  printLine('★  QUEST COMPLETE!  You caught the Market Thief!  ★','win');
  printLine(
`The King smiles. "A promise is a promise, brave squire!"
He presents you with a real KNIGHT'S SWORD.
You tuck your reward safely into your inventory bag.`,
    'story');
  printLine('See your reward: `ls ~/inventory`\nTake a closer look: `cat ~/inventory/knights_sword`','hint');
  printLine(
`You used real Linux commands to solve this quest:
  ls, ls -a, cd, cat, pwd, mkdir, and mv.
They work the exact same way in a real terminal.

Your next assignment awaits: Bird of the Belltower.
Choose Quest II on the quest board, or type \`restart\` to play again.`,'hint');
  const nextQuest = document.createElement('div');
  const link = document.createElement('a');
  link.href = './bird-of-the-belltower.html';
  link.textContent = 'Continue to Quest II: Bird of the Belltower';
  nextQuest.appendChild(link);
  out.appendChild(nextQuest);
  out.scrollTop = out.scrollHeight;
}

// ---------- Input handling ----------
document.getElementById('f').addEventListener('submit', e=>{
  e.preventDefault();
  const raw = input.value; input.value='';
  const line = raw.trim();
  const echo = document.createElement('div'); echo.className='cmd';
  const p = document.createElement('span'); p.className='p'; p.textContent = promptEl.textContent + ' ';
  echo.appendChild(p); echo.appendChild(document.createTextNode(raw)); out.appendChild(echo);
  if(!line){ out.scrollTop=out.scrollHeight; return; }
  commandHistory.add(line);
  const [c, ...args] = line.split(/\s+/);
  if(CMDS[c]){ used.add(c); CMDS[c](args); updateLog(); }
  else if(c==='cd..' || c==='cd~'){ printLine(`Almost! Put a space after cd, like this: \`${c.slice(0,2)} ${c.slice(2)}\``,'hint'); }
  else if(c==='ls-a' || c==='ls-la' || c==='ls-al'){ printLine('Almost! Put a space after ls, like this: `ls -a`','hint'); }
  else if(CMDS[c.toLowerCase()]) printLine(`bash: ${c}: command not found\nCommands are lowercase. Try \`${c.toLowerCase()}\``,'err');
  else printLine(`bash: ${c}: command not found\nType \`help\` to see the commands you can use.`,'err');
  out.scrollTop = out.scrollHeight;
});

function histPrev(){ input.value=commandHistory.previous(input.value); }
function histNext(){ input.value=commandHistory.next(input.value); }
function tabComplete(){
  Terminal.complete({input,root:FS,cwd,commands:CMDS,
    showMatches:matches=>Terminal.showCompletions(out,input,matches)});
}
Terminal.bindControls({
  input, out,
  keys:document.getElementById('keys'),
  complete:tabComplete,
  previous:histPrev,
  next:histNext,
  runCommand(command){
    input.value = command;
    document.getElementById('f').requestSubmit();
  }
});
document.getElementById('frame').addEventListener('click', ()=>{ if(!window.getSelection().toString()) input.focus(); });

// ---------- Start ----------
printLine('⚔  THE MARKET THIEF  ⚔', 'title');

printLine(
`Welcome to LINUX, a thriving realm of bustling markets, secret passages, and adventures waiting around every corner.

You are a SQUIRE: a young adventurer training to become a knight.
One day, you hope to earn that title. Until then, you must prove your courage, kindness, and clever thinking.
Today, your adventure begins in the market square.

A sealed scroll waits at your feet. Your name is on it!`,
'story');

printLine(
`Open the scroll: \`cat welcome.txt\`
Type it below, then press Enter.

Stuck? Type \`hint\`.`,
'hint');

updateLog();
input.focus();
