const F = (text, action=null, executable=false) => ({type:'file', text, action, executable});
const D = children => ({type:'dir', children:Object.assign(Object.create(null),children)});
const sword = F("Your knight's sword from the Market Thief quest. Your name shines on the hilt.\nIt stays safely sheathed. This adventure calls for brains, not blades!");
const clapper = F('The CLAPPER: the metal piece that swings inside a bell to make it ring.\nReturn it to the bell: `mv ~/inventory/clapper ~/belltower`');
const watchReports = [
  'A missing pie is found inside the judge\'s hat. The judge denies everything.',
  'Children replace a tournament flag with an enormous pair of underpants.',
  'A suspicious barrel rolls uphill. Three giggling children climb out.',
  'Someone steals six silver spoons and leaves six wooden carrots.',
  'A hooded stranger is questioned. It is two goats in a cloak.',
  'A baker reports stolen buns. The suspect has icing on his moustache.',
  'A knight challenges his own reflection to a staring contest.',
  'The royal laundry vanishes. It is discovered decorating a pony.',
  'Children tie tiny bells to the guard captain\'s boots. Sneaking is postponed.',
  'A mysterious purple footprint belongs to a goose that stepped in jam.',
  'A merchant reports a missing purse. It is returned by an apologetic juggler.',
  'Someone draws a moustache on every turnip at the vegetable stall.'
];
const sightingsLog = Array.from({length:300},(_,index)=>{
  const day = Math.floor(index/12)+1;
  const hour = String(8+index%12).padStart(2,'0');
  const report = index===291 ?
    'A bird carries shiny metal toward the KITCHEN.' :
    watchReports[index%watchReports.length];
  return `Day ${day}, ${hour}:03 - Report ${index+1}: ${report}`;
}).join('\n');
const FS = D({
  'assignment.txt': F(
`=========  QUEST  =========
Today is the 100th anniversary of Linux, and the KING is holding a TOURNAMENT. I need you to climb to the top of the BELLTOWER and ring the bell to start the festivities.

And please, no repeat of the Royal Kazoo Incident.

 - Sir Godfrey, Knight of the Realm
============================

Look around:\`ls\`
Or climb to the bell: \`cd ~/belltower\``),
  'royal_kazoo_incident.txt': F(
`Sir Godfrey leans close. His voice drops to a whisper as he places a hand on your shoulder:
"The goose had a permit. That is all I can say."

"Now, off you go. We need you to get the TOURNAMENT started."

Back to your assignment: \`cat ~/assignment.txt\``),
  inventory: D({'knights_sword':sword}),
  belltower: D({
    'bell.txt': F(
`A magnificent bell hangs above the tournament field.
Its CLAPPER, the metal piece that makes the clang, is MISSING!
A feather floats past. Somewhere below: "KRAAA! Finders keepers!"

The watch keeps a sightings log in the courtyard.
Find the bird's trail: \`cd ~/courtyard\` then \`ls\`.`),
    'ring_bell.sh': F(
`#!/bin/sh
echo "Pulling the tournament bell rope!"
# The game simulates the bell mechanism after this script runs.`,
      'ring', true)
  }),
  courtyard: D({
    'guard.txt': F(
`Guard Nessa shields her eyes from the sun. You notice her badge is missing, the one that usually gleams on her chest.

"Stole from you too, hon?" She sighs, then juts a thumb at a giant scroll on the desk.
"We keep track of odd sightings here. Someone must have seen your bird.
Have a read. I'll hold this end so it doesn't roll into the moat."

Read the log: \`cat ~/courtyard/sightings_log.txt\``),
    'sightings_log.txt': F(sightingsLog),
    'secret.txt': F(
`Nessa leans close. "My secret shortcut? grep!
cat shows the whole file. grep filters it, showing only lines
that match what you are looking for."

"Here's how: grep, then your search word, then the filename.
Let's look for bird in the sightings log:
\`grep bird ~/courtyard/sightings_log.txt\`

Go ahead, try it. No more reading about three hundred stolen spoons!"`)
  }),
  kitchen: D({
    'cook.txt': F(
`Cook Crumble has custard on BOTH eyebrows.
"Didn't you see my report? That nuisance... it landed in my pie!"

Cook Crumble pinches his eyebrows and takes a calming breath.

"I know that report's a mile long. I wrote BIRD in my report. In VERY BIG LETTERS."

Search without worrying about capitals:
\`grep -i bird ~/kitchen/report.txt\`
The -i option ignores differences between big and little letters.`),
    'report.txt': F(
`A pie cools on the windowsill.
A knight orders seventeen sandwiches.
A BIRD wearing a pie-crust hat flies into the GARDEN.
A spoon falls into the soup.
The soup complains. Nobody knows why.`)
  }),
  tournament: D({
    'knights.txt': F(
`Knights practise measured sword strokes beneath their house banners.
Steel rings against steel. Between drills, they glance toward the belltower.
"Ready positions!" calls the marshal. "We begin when the bell sounds."`),
    'horses.txt': F(
`Grooms tighten saddle straps and brush the horses' shining coats.
Bright cloth covers the jousting saddles. A chestnut horse stamps eagerly.
The riders wait for the bell before taking their places on the field.`),
    'Squire_Benson.txt': F(
`Squire Benson stands in front of a drinks stand, arranging cups in neat rows.
"You're ringing the bell? Then everyone is counting on you!
The knights are ready, but the townsfolk won't come until they hear it."

He offers you a cup of Mage Moss's Fizzy Zinger.
"Moss brewed it for the squires. It lets you jump twice as high!
One cup each. Save those springy legs for your important errand."

Read about your drink: \`cat ~/tournament/fizzy_zinger.txt\``),
    'fizzy_zinger.txt': F(
`A cool cup of berry-coloured Fizzy Zinger sparkles in the sunlight.
Tiny bubbles rise like golden sparks.`),
    'empty_stands.txt': F(
`Rows of empty benches face the tournament field.
Flags snap above them, and workers hurry to set out the last cushions.
Beyond the gates, townsfolk go about their day, listening for the bell.
Until you ring it, these seats will stay empty.`)
  }),
  garden: D({
    'mage_moss.txt': F(
`Mage Moss sits on a floating cabbage, watching birds through enormous spectacles.
"I've spent all day summoning sunflower seeds. Excellent birdwatching!
The bird in the pie hat LOVES them. Shall I teach you my seed spell?"

"Spells can have a light side or a dark side. A friendly name is no
guarantee! Inspect a spell before deciding whether to cast it.
Scripts are like spells: read their instructions first."

"Here is mine. Read it, and tell me what it does:
\`cat ~/garden/offer_seed.sh\`
If you don't understand a script, ask a trusted grown-up before running it!"`),
    'offer_seed.sh': F(
`#!/bin/sh
echo "Summoning a pile of sunflower seeds beside the cabbage!"
# This practice script prints a message.
# The game supplies the pretend magic and the bird's response.`,
      'feed')
  })
});
let cwd = [];
let assignmentRead = false;
let birdTrail = 0;
let birdFed = false;
let bellExamined = false;
let guardMet = false;
let sightingsRead = false;
let secretRead = false;
let cookMet = false;
let mageMet = false;
let seedInspected = false;
let drinkOffered = false;
let zingerDrunk = false;
let gardenJumped = false;
let won = false;
const commandHistory = Terminal.createHistory();
const out = document.getElementById('out');
const input = document.getElementById('cmd');
const prompt = document.getElementById('prompt');

const pathStr = Terminal.pathStr;
function nodeAt(parts){ return Terminal.nodeAt(FS,parts); }
function resolve(path, options){ return Terminal.resolve(FS,cwd,path,options); }
function pathError(result, path){
  if(!result.error) return false;
  const messages = {
    OUTSIDE_QUEST:'Your errand is inside the castle grounds. Head home with `cd ~`, then look around with `ls`.',
    INVALID_HOME:'Use ~ for home, or ~/ followed by a name. Try `ls ~`.',
    EMPTY_PATH:'Choose a file or directory first. Try `ls` to see what is here.',
    NOT_DIRECTORY:`That path goes through a file: ${path}. Files can be read with cat, but only directories hold other things.`,
    NOT_FOUND:`I couldn't find ${path}. Check the names with \`ls\`, or type \`hint\` for your next step.`
  };
  print(messages[result.error],'err');
  return true;
}
function localCommand(command){
  return command.split(' ').map((word,index)=>{
    if(!word.startsWith('~/')) return word;
    const parts = word.slice(2).split('/');
    if(!cwd.every((name,i)=>parts[i]===name)) return word;
    if(parts.length===cwd.length && index>0) return '.';
    if(parts.length!==cwd.length+1) return word;
    return (index===0 ? './' : '') + parts[parts.length-1];
  }).join(' ');
}
function print(text, cls='story'){
  Terminal.render(out, input, text, cls, {formatCommand:localCommand});
}
function update(){
  prompt.textContent = 'squire@tower:' + pathStr(cwd) + '$';
  document.getElementById('status').textContent = won ? 'Tournament announced!' :
    birdFed ? 'Return the clapper' : birdTrail===2 ? 'A bird in a pie hat!' :
    birdTrail===1 ? 'Follow the kitchen trail' : 'Ring the tournament bell';
}
function getNode(path){
  if(!path){ print('A filename is needed. Try `ls` to see the names.','err'); return null; }
  const result = resolve(path);
  if(pathError(result,path)) return null;
  return result;
}
function nextStep(){
  if(won){ print('The tournament is underway! Explore, or type `restart` to play again.','hint'); return; }
  if(!assignmentRead){ print("Read your knight's assignment: `cat ~/assignment.txt`",'hint'); return; }
  if(!birdTrail){
    if(!bellExamined){ print('Examine the bell: `cat ~/belltower/bell.txt`','hint'); return; }
    if(!guardMet) print('Ask the courtyard guard what she saw: `cat ~/courtyard/guard.txt`','hint');
    else if(!sightingsRead) print('Read the enormous log Nessa showed you: `cat ~/courtyard/sightings_log.txt`','hint');
    else if(!secretRead) print('Nessa has a secret shortcut for you: `cat ~/courtyard/secret.txt`','hint');
    else print('Try Nessa\'s search: `grep bird ~/courtyard/sightings_log.txt`','hint');
    return;
  }
  if(birdTrail===1){
    print(cookMet ?
      'Try Crumble\'s search: `grep -i bird ~/kitchen/report.txt`' :
      'Follow the trail and read the cook\'s message: `cat ~/kitchen/cook.txt`','hint');
    return;
  }
  if(!birdFed){
    const script = FS.children.garden.children['offer_seed.sh'];
    if(!mageMet) print('A wizard is watching the bird. Read his message: `cat ~/garden/mage_moss.txt`','hint');
    else if(!seedInspected) print('Inspect Moss\'s spell before casting it: `cat ~/garden/offer_seed.sh`','hint');
    else if(!script.executable) print('Allow the inspected spell to run: `chmod +x ~/garden/offer_seed.sh`','hint');
    else print('Try the seed spell: `cd ~/garden` then `./offer_seed.sh`','hint');
    return;
  }
  if(FS.children.belltower.children.clapper===clapper){
    print('The clapper is ready! `cd ~/belltower` then `./ring_bell.sh`','hint');
  } else if(FS.children.inventory.children.clapper===clapper){
    print('Return the clapper: `mv ~/inventory/clapper ~/belltower`\nThen `cd ~/belltower` and `./ring_bell.sh`.','hint');
  } else {
    const location = findItem(FS,clapper);
    print(`Collect the clapper: \`mv ${pathStr(location)} ~/inventory\``,'hint');
  }
}
function findItem(node,item,parts=[]){
  if(node===item) return parts;
  if(node.type==='dir'){
    for(const [name,child] of Object.entries(node.children)){
      const found = findItem(child,item,parts.concat(name));
      if(found) return found;
    }
  }
  return null;
}
function offerGardenJump(){
  if(zingerDrunk && !gardenJumped && FS.children.garden.children.clapper===clapper){
    print('The clapper lies beyond a low garden fence. You can walk through the gate as usual.\nOr try your springy Zinger legs! `cd ~/garden` then `jump`.\n(jump is a pretend adventure action, not a Linux command.)','hint');
  }
}
function runScript(path){
  const result = getNode(path);
  if(!result) return;
  const script = result.node;
  if(script.type!=='file' || !script.action){ print('That is not a runnable quest script. Try `ls` or `hint`.','err'); return; }
  if(!assignmentRead){ print('First read your assignment: `cat ~/assignment.txt`','hint'); return; }
  if(script.action==='feed' && !seedInspected){
    print('Before casting an unfamiliar spell, inspect its instructions. In this adventure, read the script first: `cat ~/garden/offer_seed.sh`','hint');
    return;
  }
  if(!script.executable){
    print(`Permission denied: ${path}`,'err');
    print(`A script needs executable permission before it can run.\nGive this trusted script permission: \`chmod +x ${path}\`\nThen try \`${path}\` again.`,'hint');
    return;
  }
  if(script.action==='feed'){
    if(birdFed){ print('The bird pats its round tummy. "No seconds. I have a tournament to watch!"'); nextStep(); return; }
    if(birdTrail<2){ print('Seeds wait beside the cabbage, but no bird comes. Follow its trail first.'); nextStep(); return; }
    print('A pile of sunflower seeds appears beside the cabbage. A bird in a pie-crust hat dive-bombs it.\n"KRAAA! Five-star sorcery!" It drops the CLAPPER into the cabbage.');
    print('You ran a script! ./ means "in this directory". Reading it with cat would only show its text.');
    FS.children.garden.children.clapper = clapper;
    birdFed = true;
    nextStep();
    offerGardenJump();
  } else {
    if(FS.children.belltower.children.clapper!==clapper){
      bellExamined = true;
      print('You pull the rope. The bell goes... flump.\nA bird stole the CLAPPER, the metal piece that makes the clang!');
      nextStep();
      return;
    }
    if(won){ print('DONG! The crowd cheers. The bird bows and loses its pie hat.'); return; }
    won = true;
    FS.children.inventory.children['tournament_ribbon'] = F('A golden ribbon for ringing the tournament bell.\nAwarded for persistence, clever searching, and excellent seed service.');
    print('You fit the clapper into the bell and pull the rope.\nDING! DONG! DIIIIING!\nThe tournament begins! The crowd cheers. A knight falls off a hobbyhorse.\nThe bird joins the royal band. It knows exactly one note: KRAAA!');
    print('QUEST COMPLETE! Bird of the Belltower','win');
    print('Your knight awards you a tournament ribbon, tucked into your inventory.\nSee your reward: `ls ~/inventory`\nRead it: `cat ~/inventory/tournament_ribbon`','hint');
    print('The tournament grounds are open and filling with people. Visit: `cd ~/tournament`','hint');
  }
}
const CMDS = {
  ls(args){
    const all = args.includes('-a');
    if(args.some(a=>a.startsWith('-') && a!=='-a')){ print('This quest supports `ls` and `ls -a`.','err'); return; }
    const result = getNode(args.find(a=>!a.startsWith('-')) || '.');
    if(!result) return;
    if(result.node.type==='file'){ print(args.join(' ')); return; }
    Terminal.renderListing({out,input,node:result.node,parts:result.parts,getCwd:()=>cwd,all});
    if(result.node===FS.children.belltower){
      print('A feather rests beside the bell. Examine it: `cat ~/belltower/bell.txt`','hint');
    } else if(result.node===FS.children.courtyard){
      print('Guard Nessa leans against a wall, wearing a saucepan. She waves you over.');
      print('Read her message: `cat ~/courtyard/guard.txt`','hint');
    } else if(result.node===FS.children.kitchen){
      print('Cook Crumble corners the runaway pie with a soup ladle. She looks ready to grumble.');
      print('Read her message: `cat ~/kitchen/cook.txt`','hint');
    } else if(result.node===FS.children.garden){
      print('A wizard on a floating cabbage peers through enormous spectacles.');
      print('Meet Mage Moss: `cat ~/garden/mage_moss.txt`','hint');
    } else if(result.node===FS.children.tournament){
      print(won ? 'Cheers roll across the field. Benson waves from the drinks stand.' :
        'Banners rise over the field. Knights, grooms, and squires hurry to finish their preparations.');
      print('Read a scene with cat, or meet Benson: `cat ~/tournament/Squire_Benson.txt`','hint');
    }
  },
  cd(args){
    if(args.length>1){ print('cd takes one directory at a time.','err'); return; }
    const result = getNode(args[0] || '~');
    if(!result) return;
    if(result.node.type!=='dir'){ print('That is a file, not a place. Read it with cat.','err'); return; }
    cwd = result.parts;
    const flavor = {
      '':'Back in the castle yard. Your knight waves an enormous tournament flag.',
      belltower:'Up the spiral stairs! The bell looms overhead. You always liked it in this strange tower. The walls are tall and echo with every step. The air smells of old stone and distant rain.',
      courtyard:'A goose marches past the guard. Both salute.',
      kitchen:'A floury cook chases a rolling pie. The pie is winning.',
      garden:'A cabbage rustles suspiciously. Something above it says "KRAAA!"',
      tournament:won ? 'The stands are full! The crowd rises as the first riders enter the field.' :
        'You pass beneath bright banners into the tournament grounds. Everyone is preparing, but the stands are still empty. They need your bell.',
      inventory:'Your sword shines safely inside your bag.'
    };
    print(Object.hasOwn(flavor,cwd.join('/')) ? flavor[cwd.join('/')] : 'You enter your new directory.');
    print('Look around: `ls`','hint');
    if(result.node===FS.children.garden) offerGardenJump();
  },
  cat(args){
    if(!args.length){ print('Choose a file to read. Try `cat ~/assignment.txt`.','err'); return; }
    for(const path of args){
      const result = getNode(path);
      if(!result) continue;
      if(result.node.type!=='file'){ print('That is a directory. Look inside with ls.','err'); continue; }
      if(result.node===FS.children.tournament.children['fizzy_zinger.txt']){
        if(!drinkOffered){
          print(result.node.text);
          print('The cups belong to Benson. Ask him first: `cat ~/tournament/Squire_Benson.txt`','hint');
        } else if(zingerDrunk){
          print('Your cup is empty. Your legs still feel light and springy. One Zinger is plenty!');
        } else {
          zingerDrunk=true;
          print('You sip the Fizzy Zinger. Bright berry bubbles tingle on your tongue.\nYour heels lift in a tiny, effortless hop. You can jump twice as high!\nKeep an eye out for a chance to use your springy legs.');
          offerGardenJump();
        }
        continue;
      }
      if(result.node===FS.children.tournament.children['Squire_Benson.txt'] && drinkOffered){
        print(zingerDrunk ? 'Benson smiles. "Still springy? One cup is plenty. Good luck with your errand!"' :
          'Benson holds out your cup. "Your Fizzy Zinger is ready!"');
        if(!zingerDrunk) print('Read about your drink: `cat ~/tournament/fizzy_zinger.txt`','hint');
        if(won) print('"You did it! Hear that crowd? Your bell brought them all here."');
        continue;
      }
      const tournamentAfter = {
        'knights.txt':'The knights salute the cheering stands. Their careful practice has become the opening display, every movement precise.',
        'horses.txt':'Equipped for the joust, the horses step proudly onto the field. Grooms watch as the riders salute the King.',
        'empty_stands.txt':'The once-empty stands are packed with townsfolk. Flags wave and children lean forward eagerly.\nYour bell brought everyone together. The tournament has begun!'
      };
      if(won && result.parts[0]==='tournament' && Object.hasOwn(tournamentAfter,result.parts[1])){
        print(tournamentAfter[result.parts[1]]);
        continue;
      }
      if(result.node===FS.children.courtyard.children['sightings_log.txt']){
        print('You unroll the sightings log. It flops over the desk, down the steps, and around a startled goat.\nHundreds and hundreds of entries! Missing pies, suspicious strangers, and children playing pranks...');
      }
      print(result.node.text);
      if(result.node===FS.children.tournament.children['Squire_Benson.txt']){
        drinkOffered=true;
        if(won) print('"And thank you for ringing the bell. Look at those full stands!" Benson adds.');
      }
      if(result.node===FS.children.courtyard.children['sightings_log.txt']){
        sightingsRead=true;
        guardMet=true;
        print('Three hundred reports later, the scroll has wrapped around your boots.\nNessa leans in. "Rather a lot, isn\'t it? Want to know a secret shortcut?"');
        print('Read her secret: `cat ~/courtyard/secret.txt`','hint');
      }
      if(result.node===FS.children.courtyard.children['secret.txt']) secretRead=true;
      if(result.node===FS.children['assignment.txt']) assignmentRead=true;
      if(result.node===FS.children.belltower.children['bell.txt']){
        bellExamined=true;
        print('To try the rope yourself: `cd ~/belltower` then `./ring_bell.sh`','hint');
      }
      if(result.node===FS.children.courtyard.children['guard.txt']) guardMet=true;
      if(result.node===FS.children.kitchen.children['cook.txt']) cookMet=true;
      if(result.node===FS.children.garden.children['mage_moss.txt']) mageMet=true;
      if(result.node.action==='feed'){
        seedInspected=true;
        print('The script prints a message; this game adds the pretend seed magic.\nMoss explains: "chmod changes permissions. +x allows a script to run.\nIt does NOT make a script safe! Only allow scripts you understand and trust."');
        if(!result.node.executable) print('Allow this inspected practice spell to run: `chmod +x ~/garden/offer_seed.sh`','hint');
        else print('Try the inspected spell: `cd ~/garden` then `./offer_seed.sh`','hint');
      } else if(result.node.action==='ring'){
        print('cat reads a script; it does not run it.\nTo pull the rope: `cd ~/belltower` then `./ring_bell.sh`','hint');
      }
    }
  },
  pwd(){ print('/home/squire/castle' + (cwd.length ? '/' + cwd.join('/') : '')); },
  grep(args){
    const insensitive = args[0]==='-i';
    const words = insensitive ? args.slice(1) : args;
    if(words.length!==2 || words[0].startsWith('-')){
      print('Use grep, a search word, then a filename.\nThis quest supports one file and an optional -i. Type `hint` for your next step.','err'); return;
    }
    const [pattern,path] = words;
    const result = getNode(path);
    if(!result) return;
    if(result.node.type!=='file'){ print('grep needs a file, not a directory.','err'); return; }
    let expression;
    try { expression = new RegExp(pattern,insensitive ? 'i' : ''); }
    catch(error){
      if(!(error instanceof SyntaxError)) throw error;
      print('That search pattern is not supported. Try a word such as bird.','err'); return;
    }
    const lines = result.node.text.split('\n').filter(line=>expression.test(line));
    if(!lines.length){
      print('(No matching lines.)','dim');
      if(result.node===FS.children.kitchen.children['report.txt']){
        print(cookMet ?
          'Remember Crumble\'s BIG LETTERS? Try `grep -i bird ~/kitchen/report.txt`.' :
          'No bird in that search? Crumble might know why. Read her message: `cat ~/kitchen/cook.txt`','hint');
      } else print('Check the search word and spelling. Try reading the file with cat, or ask for a `hint`.','hint');
      return;
    }
    print(lines.join('\n'));
    if(!assignmentRead){ print('Your knight has a job for you: `cat ~/assignment.txt`','hint'); return; }
    if(result.node===FS.children.courtyard.children['sightings_log.txt'] && lines.some(line=>line.includes('KITCHEN'))){
      birdTrail = Math.max(birdTrail,1);
      print('grep found the matching line! You follow a trail of feathers and stolen napkins.\nHead to the kitchen: `cd ~/kitchen` then `ls`.');
    } else if(result.node===FS.children.kitchen.children['report.txt'] && lines.some(line=>line.includes('GARDEN'))){
      birdTrail = 2;
      print('A pie-crust hat! That bird has STYLE.\nFollow it: `cd ~/garden` then `ls`.');
    } else print('Those are the matching lines. Need your next story step? Type `hint`.','hint');
  },
  chmod(args){
    if(args.length!==2 || args[0]!=='+x'){ print('This quest supports `chmod +x filename`: allow a script to run.','err'); return; }
    const result = getNode(args[1]);
    if(!result) return;
    if(result.node.type!=='file' || !result.node.action){ print('Choose a quest script, such as ~/garden/offer_seed.sh.','err'); return; }
    result.node.executable = true;
    print('Executable permission added. chmod changes permissions; +x allows execution.');
    if(result.node.action==='feed' && !seedInspected){
      print('Permission does not guarantee safety. Inspect the spell before trying it: `cat ~/garden/offer_seed.sh`','hint');
      return;
    }
    print(`Now run the script: \`${args[1].startsWith('~') || args[1].startsWith('./') ? args[1] : './'+args[1]}\``,'hint');
  },
  mkdir(args){
    if(args.length!==1){ print('Give your directory a name: `mkdir notes`','err'); return; }
    const result = resolve(args[0],{allowMissing:true});
    if(pathError(result,args[0])) return;
    if(result.node){ print('That name already exists. Your inventory is ready at ~/inventory.','err'); return; }
    const parent = nodeAt(result.parts.slice(0,-1));
    const name = result.parts[result.parts.length-1];
    if(!parent || parent.type!=='dir' || !name){ print('The parent directory does not exist. Try `ls`.','err'); return; }
    parent.children[name] = D({});
    print(`You make a directory called ${name}.`);
    if(name==='inventory') print('Your travelling bag already lives at home: `ls ~/inventory`','hint');
  },
  mv(args){
    if(args.length!==2){ print('Use `mv item destination`, for example `mv ~/garden/clapper ~/inventory`.','err'); return; }
    const source = getNode(args[0]);
    const destination = getNode(args[1]);
    if(!source || !destination) return;
    if(source.node.type!=='file' || destination.node.type!=='dir'){
      print('In this quest, move a file into a directory.','err'); return;
    }
    if(source.node!==clapper && source.node!==sword && source.node!==FS.children.inventory.children.tournament_ribbon){
      print('Leave the shared scrolls and scripts for everyone. You can move your sword, clapper, or reward.','err'); return;
    }
    const name = source.parts[source.parts.length-1];
    if(Object.hasOwn(destination.node.children,name)){
      print('That destination already contains this name. Nothing was moved.','err'); return;
    }
    destination.node.children[name] = source.node;
    delete nodeAt(source.parts.slice(0,-1)).children[name];
    print(`You move ${name} into ${pathStr(destination.parts)}.`);
    if(source.node===clapper) nextStep();
  },
  hint(){ nextStep(); },
  jump(args){
    if(args.length){ print('Use `jump` by itself. This is a pretend adventure action, not Linux.','err'); return; }
    if(!zingerDrunk){ print('That fence needs more spring than an ordinary jump. Only Moss\'s Fizzy Zinger grants the magical leap.\nThere is always a walking route; you do not need magic to finish the quest.'); return; }
    if(cwd.join('/')!=='garden' || FS.children.garden.children.clapper!==clapper){
      print('Your legs feel springy, but there is no obstacle to leap over here. Keep exploring.'); return;
    }
    if(gardenJumped){ print('You are already across the fence. Collect the clapper: `mv ~/garden/clapper ~/inventory`'); return; }
    gardenJumped=true;
    print('You bend your knees and leap clean over the low fence, twice your usual height!\nYou land lightly beside the clapper. Benson\'s drink worked.');
    print('Collect it: `mv ~/garden/clapper ~/inventory`','hint');
  },
  help(){
    print(
`Familiar commands: ls, ls -a, cd, cat, pwd, mkdir, mv, clear.
New skills, introduced when you need them:
  \`grep bird ~/courtyard/sightings_log.txt\` searches for matching lines
  \`grep -i bird ~/kitchen/report.txt\` ignores case
  \`chmod +x ~/garden/offer_seed.sh\` allows a trusted script to run
  \`~/belltower/ring_bell.sh\` runs the bell script (use ./ring_bell.sh inside the belltower)
Use \`hint\` for your next step or \`restart\` to begin again.
This is a practice terminal: it supports only the forms taught here.
Scripts and their story effects are simulated, not run on your computer.`,
      'hint');
    if(zingerDrunk) print('Bonus adventure action (not Linux): `jump` over the low garden fence when the clapper drops.','hint');
  },
  clear(){ out.replaceChildren(); },
  restart(){ location.reload(); }
};
function submit(){
  const line = input.value.trim();
  input.value = '';
  if(!line) return;
  print(prompt.textContent + ' ' + line,'echo');
  commandHistory.add(line);
  const [command,...args] = line.split(/\s+/);
  if(command.startsWith('./') || command.startsWith('~/')){
    if(args.length) print('These quest scripts do not take arguments.','err');
    else runScript(command);
  } else if(Object.hasOwn(CMDS,command)) CMDS[command](args);
  else print(`Command not found: ${command}\nCommands are lowercase. Try \`help\` or \`hint\`.`,'err');
  update();
}
function previous(){
  input.value=commandHistory.previous(input.value);
}
function complete(){
  Terminal.complete({input,root:FS,cwd,commands:CMDS,
    showMatches:matches=>Terminal.showCompletions(out,input,matches)});
}
document.getElementById('form').addEventListener('submit',event=>{event.preventDefault();submit();});
Terminal.bindControls({
  input, out,
  keys:document.querySelector('.keys'),
  complete,
  previous,
  next(){
    input.value=commandHistory.next(input.value);
  },
  runCommand(command){
    input.value=command;
    submit();
  }
});
print('BIRD OF THE BELLTOWER','win');
print('Your sword gleams at your belt. Your knight hands you an urgent scroll.\nAbove the castle, a suspicious bird goes "KRAAA!" and drops a stolen sock.`');
print('Read your assignment: `cat ~/assignment.txt`\nNeed a nudge? Type `hint`.','hint');
update();
input.focus();
