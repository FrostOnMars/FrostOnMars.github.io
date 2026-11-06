const F = (text, action=null, executable=false) => ({type:'file', text, action, executable});
const D = children => ({type:'dir', children:Object.assign(Object.create(null),children)});
const sword = F("Your knight's sword from the Market Thief quest. Your name shines on the hilt.\nIt stays safely sheathed. This adventure calls for brains, not blades!");
const clapper = F('The CLAPPER: the metal piece that swings inside a bell to make it ring.\nReturn it to its fitting: `mv ~/inventory/clapper ~/belltower/landing/bell_chamber`');
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
Today is the 100th anniversary of Linux, and the KING is holding a TOURNAMENT. I need you to climb to the top of the BELLTOWER and ring the bell to start the festivities. Everyone is waiting for our signal!

And please, no repeat of the Royal Kazoo Incident.

 - Sir Godfrey, Knight of the Realm
============================

Look around:\`ls\`
Or enter the tower: \`cd ~/belltower\``),
  'royal_kazoo_incident.txt': F(
`Sir Godfrey leans close. His voice drops to a whisper as he places a hand on your shoulder:
"The goose had a permit. That is all I can say."

"Now, off you go. We need you to get the TOURNAMENT started."

Back to your assignment: \`cat ~/assignment.txt\``),
  inventory: D({'knights_sword':sword}),
  belltower: D({
    'bell.txt': F(
`Through the hollow centre of the spiral staircase, you can see the magnificent bell hanging far above.

At least... you think it is magnificent.

Something looks wrong.

The bell's CLAPPER, the heavy metal piece that makes it clang, is MISSING!

A black feather drifts lazily down through the tower.

Then, from somewhere outside:

"KRAAAAA! FINDERS KEEPERS!"

You stare at the feather.

"Oh, come on."

Above you, the broken staircase gives another unhappy CRRRK.

A fist-sized chunk of stone drops from the landing and shatters on the floor.

Whatever that bird stole, you aren't reaching it by climbing these stairs without help.

Luckily, the watch keeps a sightings log in the courtyard.

Find the bird's trail:
\`cd ~/courtyard\`
\`ls\`

Or, if you think the bell deserves a chance to prove itself:
\`~/belltower/ring_bell.sh\``),
    'ring_bell.sh': F(
`#!/bin/sh
echo "Pulling the tournament bell rope!"
# The game simulates the bell mechanism after this script runs.`,
      'testBell', true),
    stairs: D({up: D({})}),
    landing: D({
      'stairs.txt': F(
`The spiral stairs curl past a narrow window. Wind whistles through the slit, lifting dust from tiny bird footprints.
Ahead, a broken section interrupts the landing. An old knotted climbing rope runs beside it.
Below you, bright tournament banners look as small as handkerchiefs.

The Steady spell holds the stone and rope still. Examine your crossing: \`cat ~/belltower/landing/crossing.txt\``),
      'crossing.txt': F(
`A secure rope runs from an iron ring on this side to another beyond the broken stone.
The steadied landing no longer sheds grit. You still need to fasten the rope safely before crossing.`),
      bell_chamber: D({
        'bird.txt': F(
`The bell fills the chamber like an upside-down bronze mountain.
Beside it sits a nest woven with stolen ribbons. One ribbon has tangled around the pie-hat bird's foot and caught on a splinter.
The CLAPPER lies beside the nest. The bird flaps, but cannot get free.

"KRAAA! ...A little assistance?"

The clapper can wait. First, someone needs your help.`),
        'ring_bell.sh': F(
`#!/bin/sh
echo "Pulling the tournament bell rope!"
# The game simulates the bell mechanism after this script runs.`,
          'ring', true)
      })
    })
  }),
  courtyard: D({
    'bramble.txt': F(
`An enormous old guard dog lies across a passage between the courtyard wall and the back of the kitchen. His collar reads BRAMBLE.
The garden is behind the kitchen; you enter it through \`cd ~/kitchen/garden\`. Bramble guards that entrance from his courtyard post.
His eyes are cloudy and sightless, but his ears turn at the smallest sound.
Your sword rattles against its scabbard. Bramble rises with a low warning growl.

He cannot see who is coming. He is guarding his post, not trying to be cruel.
There may be clues in the keeper's note or the nearby alley.

This is a pretend encounter. In real life, give a growling dog space and ask its keeper for help.`),
    'keeper_note.txt': F(
`BRAMBLE'S KEEPER:
Our old boy is blind. Rattling armour sounds like trouble to him.
He knows the words "Good boy, Bramble." Keep your sword still, speak gently, and wait for HIM to approach.
If he relaxes and nudges your hand, he is asking for his favourite chin scritch.
Do not reach towards a dog who is still growling.

You have discovered a KIND solution. In the courtyard, try \`scritch\`.
(scritch is a pretend adventure action, not a Linux command.)`),
    alley: D({
      'cat_tracks.txt': F(
`Small pawprints lead behind a barrel. A cat meows, and Bramble's ears swivel towards the alley.
"Mrrp?" Bramble gets up to investigate. The cat slips over the wall.

You have discovered a CLEVER solution: make a pretend meow from this safe side alley, then slip through while Bramble checks the barrel.
Try \`meow\` here.
(meow is a pretend adventure action, not a Linux command.)`)
    }),
    'guard.txt': F(
`Guard Nessa shields her eyes from the sun. You notice her badge is missing, the one that usually gleams on her chest.

"Stole from you too, hon?" She sighs, then juts a thumb at a giant scroll on the desk.
"We keep track of odd sightings here. Someone must have seen your bird. Have a read. I'll hold this end so it doesn't roll into the moat."

Read the log: \`cat ~/courtyard/sightings_log.txt\``),
    'sightings_log.txt': F(sightingsLog),
    'secret.txt': F(
`Nessa leans close. "My secret shortcut? grep!
cat shows the whole file. grep filters it, showing only lines that match what you are looking for."

"Here's how: grep, then your search word, then the filename.
Let's look for bird in the sightings log:
\`grep bird ~/courtyard/sightings_log.txt\`

Go ahead, try it. No more reading about three hundred stolen spoons!"`),
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
"You're ringing the bell? Then everyone is counting on you! The knights are ready, but the townsfolk won't come until they hear it."

He offers you a cup of Mage Moss's Fizzy Zinger.
"Moss brewed it for the squires. It lets you jump twice as high! One cup each. Save those springy legs for your important errand."

Read about your drink: \`cat ~/courtyard/tournament/fizzy_zinger.txt\``),
    'fizzy_zinger.txt': F(
`A cool cup of berry-coloured Fizzy Zinger sparkles in the sunlight.
Tiny bubbles rise like golden sparks.`),
    'empty_stands.txt': F(
`Rows of empty benches face the tournament field.
Flags snap above them, and workers hurry to set out the last cushions.
Beyond the gates, townsfolk go about their day, listening for the bell.
Until you ring it, these seats will stay empty.`)
    })
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
A BIRD wearing a pie-crust hat flies through the GARDEN behind the KITCHEN and into an upper BELLTOWER window, carrying shiny metal.
A spoon falls into the soup.
The soup complains. Nobody knows why.`),
    garden: D({
    'mage_moss.txt': F(
`Mage Moss sits on a floating cabbage, examining a very wobbly teacup.
The tip of his crooked purple hat droops over the edge of his nose.
"The tower landing is crumbling? Then you need my Steady spell."
"It can stop a rope wobbling. Remarkable achievement. Usually mine wobble just lying in a drawer."
"It will keep the cracked landing steady as you climb, too. But it won't climb the stairs for you!"`),
    'steady.sh': F(
`#!/bin/sh
echo "Steady the tower rope and cracked landing!"
# This practice script prints a message.
# The game supplies the pretend magic, not real building repairs.`,
      'steady')
    })
  })
});
let cwd = [];
let assignmentRead = false;
let birdTrail = 0;
let birdRescued = false;
let bellExamined = false;
let guardMet = false;
let sightingsRead = false;
let secretRead = false;
let cookMet = false;
let mageMet = false;
let mageLessonStep = 0;
let steadyInspected = false;
let drinkOffered = false;
let zingerDrunk = false;
let bramblePassed = false;
let kindDiscovered = false;
let cleverDiscovered = false;
let towerSteady = false;
let landingCrossed = false;
let rescueStep = 0;
let clapperCarried = false;
let clapperInstalled = false;
let stairAttempt = 0;
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
const conversation = Terminal.createConversation({out,input,print});
function towerScene(beats,onComplete){
  conversation.cancel();
  function show(index){
    print(beats[index]);
    if(index<beats.length-1) conversation.pause({onContinue(){ show(index+1); }});
    else onComplete();
  }
  show(0);
}
function mossTopics(){
  conversation.choose({
    text:'Type 1 or 2 to choose which question to ask the wizard.',
    choices:[
      {text:'Ask about the bird in the pie hat?', onSelect(){
        print('"Flew straight back to the bell chamber, carrying a lump of metal! Now I hear rather worried squawks. You had better investigate, Squire."');
        mossTopics();
      }},
      {text:'Ask about the Steady spell?', onSelect(){
        print('"It will hold the rope and landing steady while you cross. You must still secure your rope and do the climbing. Shall I teach you?"');
        mossLesson();
      }}
    ]
  });
}
function mossLesson(){
  const decline = ()=>{
    print('Moss mumbles, "Sure, sure. You children are always in such a hurry. Come back if you need to find me."');
    print('Talk to Moss again whenever you like: `cat ~/kitchen/garden/mage_moss.txt`','hint');
    if(mageLessonStep===0) mossTopics();
  };
  if(mageLessonStep===0){
    conversation.yesNo({
      text:'Learn the Steady spell?',
      onYes(){
        mageLessonStep=1;
        print('"It\'s a tricky thing, magic. Spells can have a light side... and a dark side. A friendly-sounding name is no guarantee!"\nThe mage peers at you with one eye. "Do you want to know the difference?"');
        mossLesson();
      },
      onNo:decline
    });
  } else if(mageLessonStep===1){
    conversation.yesNo({
      text:'Ask Moss about the difference between spells?',
      onYes(){
        mageLessonStep=2;
        print('"You have to inspect a spell before deciding whether to cast it. Always, always, always read the instructions first."\nHe chuckles and stares off into space.');
        print('Moss is teaching you a special kind of spell called a script: a file of instructions a computer can follow.\nLike spells, scripts can help or cause harm. A friendly name does not prove a script is safe.\nAsk a trusted grown-up to examine unfamiliar scripts with you before running them.');
        mossLesson();
      },
      onNo:decline
    });
  } else if(mageLessonStep===2){
    conversation.pause({onContinue(){
      mageLessonStep=3;
      mossLesson();
    }});
  } else {
    print('"Go ahead, Squire. Read my spell, and tell me what it does:"\n`cat ~/kitchen/garden/steady.sh`\n"If you don\'t understand a script, ask a trusted grown-up before running it!"');
  }
}
function update(){
  prompt.textContent = 'squire@tower:' + pathStr(cwd) + '$';
  document.getElementById('status').textContent = won ? 'Tournament announced!' :
    birdRescued ? 'Restore the bell' : landingCrossed ? 'Help the stranded bird' :
    towerSteady ? 'Conquer the tower' : birdTrail===2 ? 'Find a way up the tower' :
    birdTrail===1 ? 'Follow the kitchen trail' : 'Ring the tournament bell';
}
function canAccess(parts){
  if(parts[0]==='belltower' && parts[1]==='stairs'){
    if(towerSteady){
      print('The broken stair branch ends here. Steady has secured the rope crossing instead.\nTake the safe route: `cd ~/belltower/landing`.','hint');
      return false;
    }
    if(parts.length>3 || (parts[2] && parts[2]!=='up')){
      print('There is no further way up this broken staircase. Retreat to `cd ~/belltower`, then find another plan.','hint');
      return false;
    }
    if(parts[2]==='up' && stairAttempt===0){
      print('You cannot skip the lower steps. Approach them first: `cd ~/belltower/stairs`.','hint');
      return false;
    }
  }
  if(parts[0]==='kitchen' && parts[1]==='garden' && !bramblePassed){
    print('Your sword rattles. Bramble blocks the passage behind the kitchen with a low warning growl.\nYou stop and give him space. Approach his post from the courtyard: `cd ~/courtyard` then `cat bramble.txt`.','hint');
    return false;
  }
  if(parts[0]==='belltower' && parts[1]==='landing'){
    if(!towerSteady){
      print('Grit tumbles from the cracked landing. You stay on the safe lower stairs.\nFollow the bird\'s trail and find help before climbing. Type `hint` for your next step.','hint');
      return false;
    }
    if(parts[2]==='bell_chamber' && !landingCrossed){
      print('The spell holds the stone still, but you have not crossed the broken landing.\nGo to `cd ~/belltower/landing`, then examine `cat ~/belltower/landing/crossing.txt`.','hint');
      return false;
    }
  }
  return true;
}
function getNode(path){
  if(!path){ print('A filename is needed. Try `ls` to see the names.','err'); return null; }
  const result = resolve(path);
  if(pathError(result,path)) return null;
  if(!canAccess(result.parts)) return null;
  return result;
}
function nextStep(){
  if(conversation.show()) return;
  if(cwd[0]==='belltower' && cwd[1]==='stairs'){
    print(stairAttempt===2 ?
      'There is no safe way farther up. Retreat: `cd ..`.\nReturn to solid ground: `cd ~/belltower`. Then follow the bird\'s trail or type `hint` again.' :
      'You cling to the railing above the broken step. Carefully climb back down: `cd ..`.\nOr keep climbing anyway: `cd up`.','hint');
    return;
  }
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
  if(!bramblePassed){
    print('Bramble guards the passage to the garden behind the kitchen. Look for ways past: `cat ~/courtyard/bramble.txt`, `cat ~/courtyard/keeper_note.txt`, or `ls ~/courtyard/alley`.\nBenson also offers an optional magical drink: `cat ~/courtyard/tournament/Squire_Benson.txt`.','hint');
    return;
  }
  if(!towerSteady){
    const script = FS.children.kitchen.children.garden.children['steady.sh'];
    if(!mageMet) print('Ask Moss for help with the tower: `cat ~/kitchen/garden/mage_moss.txt`','hint');
    else if(mageLessonStep<3 && !steadyInspected) print('Moss can continue your spell lesson: `cat ~/kitchen/garden/mage_moss.txt`','hint');
    else if(!steadyInspected) print('Inspect Moss\'s spell before casting it: `cat ~/kitchen/garden/steady.sh`','hint');
    else if(!script.executable) print('Allow the inspected spell to run: `chmod +x ~/kitchen/garden/steady.sh`','hint');
    else print('Cast Steady: `cd ~/kitchen/garden` then `./steady.sh`','hint');
    return;
  }
  if(!landingCrossed){
    print('Climb to the steadied landing: `cd ~/belltower/landing`.\nLook around with `ls`, then examine `cat ~/belltower/landing/crossing.txt`.','hint');
    return;
  }
  if(!birdRescued){
    print('Climb into the bell chamber: `cd ~/belltower/landing/bell_chamber`.\nSomeone needs help: `cat ~/belltower/landing/bell_chamber/bird.txt`.','hint');
    return;
  }
  if(clapperInstalled){
    print('The clapper is ready! `cd ~/belltower/landing/bell_chamber` then `./ring_bell.sh`','hint');
  } else if(FS.children.inventory.children.clapper===clapper){
    print('Return the clapper: `mv ~/inventory/clapper ~/belltower/landing/bell_chamber`\nThen `cd ~/belltower/landing/bell_chamber` and `./ring_bell.sh`.','hint');
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
function brambleOptions(){
  if(bramblePassed){ print('Bramble rests beside the open passage. His tail thumps at your footsteps.'); return; }
  if(cwd.join('/')!=='courtyard'){
    print('Visit Bramble to try your discoveries: `cd ~/courtyard` then `cat bramble.txt`.','hint');
    return;
  }
  const choices = [];
  if(kindDiscovered) choices.push({text:'KIND: keep your sword still, speak gently, and wait for Bramble.', onSelect(){ CMDS.scritch([]); }});
  if(cleverDiscovered) choices.push({text:'CLEVER: slip into the alley to try your pretend meow.', onSelect(){
    CMDS.cd(['~/courtyard/alley']);
    print('Try your distraction: `meow`','hint');
  }});
  if(zingerDrunk) choices.push({text:'SPECIAL OPTION UNLOCKED - Fizzy Zinger leap over the low wall beside Bramble.', onSelect(){ CMDS.jump([]); }});
  if(choices.length) conversation.choose({text:'Choose a discovered approach. These are pretend story actions, not Linux commands.',choices});
  else print('Explore for clues: `cat ~/courtyard/keeper_note.txt` or `ls ~/courtyard/alley`.\nYou can also visit Benson: `cat ~/courtyard/tournament/Squire_Benson.txt`.','hint');
}
function crossingOptions(){
  if(landingCrossed){ print('Your secured rope marks the safe crossing. Continue: `cd ~/belltower/landing/bell_chamber`','hint'); return; }
  if(cwd.join('/')!=='belltower/landing'){
    print('Examine the crossing in person: `cd ~/belltower/landing` then `cat crossing.txt`.','hint');
    return;
  }
  const cross = magic=>{
    landingCrossed=true;
    print(magic ?
      'SPECIAL OPTION UNLOCKED - Fizzy Zinger leap!\nYou secure the safety rope around your waist, then spring across the broken section. Steady holds the landing firm beneath your feet.' :
      'You secure the safety rope around your waist and test it. Firm!\nHolding the knotted handrope, you cross carefully. Steady keeps the cracked landing from crumbling beneath your boots.');
    print('You made it! Tiny footprints continue up the last stairs. From above comes a frightened flutter.\nClimb to the bell chamber: `cd ~/belltower/landing/bell_chamber`','hint');
    update();
  };
  const choices = [{text:'Secure the rope and carefully cross the steadied landing.',onSelect(){ cross(false); }}];
  if(zingerDrunk) choices.push({text:'SPECIAL OPTION UNLOCKED - secure the rope, then use a Fizzy Zinger leap.',onSelect(){ cross(true); }});
  conversation.choose({text:'How will you cross? These are pretend story actions, not Linux commands.',choices});
}
function rescueBird(){
  if(birdRescued){ print('The bird is safe on the landing. "Kraa. Thank you."'); nextStep(); return; }
  if(cwd.join('/')!=='belltower/landing/bell_chamber'){
    print('Reach the bird in person: `cd ~/belltower/landing/bell_chamber` then `cat bird.txt`.','hint');
    return;
  }
  const choices = rescueStep===0 ? [{
    text:'Secure your safety rope and reach the nest along the broad stone ledge.',
    onSelect(){
      rescueStep=1;
      print('You fasten the rope to an iron ring and test it. The Steady spell holds firm.\nYou edge along the broad ledge and crouch beside the bird. "Easy. I am here to help."');
      rescueBird();
    }
  }] : rescueStep===1 ? [{
    text:'Gently loosen the ribbon from the splinter and the bird\'s foot.',
    onSelect(){
      rescueStep=2;
      print('You hold the ribbon still, slide it off the splinter, and gently unwind it from the little foot.\nThe bird stops struggling. It leans against your sleeve.');
      rescueBird();
    }
  }] : [{
    text:'Guide the bird onto the safe landing before collecting the clapper.',
    onSelect(){
      birdRescued=true;
      FS.children.belltower.children.landing.children.bell_chamber.children.clapper=clapper;
      print('You guide the bird onto the landing. It puts weight on its foot, then gives a small, relieved hop.\n"You came for the shiny thing... but you helped ME first."\nIt nudges the clapper towards you. "Not finders keepers. Borrowers returners."');
      print('Collect the clapper: `mv ~/belltower/landing/bell_chamber/clapper ~/inventory`','hint');
      update();
    }
  }];
  conversation.choose({text:'Help the bird. These are pretend rescue actions, not Linux commands.',choices});
}
function runScript(path){
  const result = getNode(path);
  if(!result) return;
  const script = result.node;
  if(script.type!=='file' || !script.action){ print('That is not a runnable quest script. Try `ls` or `hint`.','err'); return; }
  if(!assignmentRead){ print('First read your assignment: `cat ~/assignment.txt`','hint'); return; }
  if(script.action==='steady' && !steadyInspected){
    print('Before casting an unfamiliar spell, inspect its instructions. In this adventure, read the script first: `cat ~/kitchen/garden/steady.sh`','hint');
    return;
  }
  if(!script.executable){
    print(`Permission denied: ${path}`,'err');
    print(`A script needs executable permission before it can run.\nGive this trusted script permission: \`chmod +x ${path}\`\nThen try \`${path}\` again.`,'hint');
    return;
  }
  if(script.action==='steady'){
    if(towerSteady){ print('The rope and landing are still steady. Now the climbing is up to you!'); nextStep(); return; }
    if(birdTrail<2){ print('Moss holds up a hand. "First find where the bird went. Then we can plan the climb."'); nextStep(); return; }
    if(cwd.join('/')!=='kitchen/garden'){ print('Join Moss to cast the spell: `cd ~/kitchen/garden` then `./steady.sh`.','hint'); return; }
    conversation.cancel();
    print('You cast Steady. A warm golden shimmer runs up the tower stones.\nThe rope stops swaying. The cracked landing settles, and the falling grit stops.\nMoss grips the edge of his cabbage. "There. Steady as a very determined pudding. Your turn, Squire."');
    print('You ran a script! ./ means "in this directory". Reading it with cat would only show its text.');
    towerSteady = true;
    nextStep();
  } else {
    if(script.action==='testBell'){
      bellExamined = true;
      if(won){
        print('DONG! The repaired bell answers from high above. Bramble howls along.');
        nextStep();
        return;
      }
      towerScene([
        `You grab the rope with both hands.

"Stand back!"

You give it a mighty pull.

The enormous bell swings.

You brace yourself for...`,
        `FLUMP.

...

That's it.`,
        `You pull again.

flump.

Somewhere outside, someone waiting by the tournament gate starts clapping uncertainly.

Without its CLAPPER, this bell isn't announcing anything.

Above you, the damaged staircase sheds another sprinkle of stone dust.

You'll need to recover the clapper AND find a safe way to reach the bell.

Perhaps someone saw where that thieving bird went.`
      ],()=>{ print('Ask the courtyard guard: `cat ~/courtyard/guard.txt`','hint'); });
      return;
    }
    if(cwd.join('/')!=='belltower/landing/bell_chamber'){
      print('Finish the job beside the bell: `cd ~/belltower/landing/bell_chamber` then `./ring_bell.sh`.','hint'); return;
    }
    if(!birdRescued || !clapperInstalled){
      print('The bell cannot ring yet. Help the bird, then return the clapper to its fitting.');
      nextStep();
      return;
    }
    if(won){ print('DONG! The crowd cheers. The bird bows and loses its pie hat.'); return; }
    won = true;
    FS.children.inventory.children['tournament_ribbon'] = F('A golden ribbon for saving the bird and ringing the tournament bell.\nAwarded for clever searching, courage, and kindness.');
    print('You fit the clapper into its bracket and pull the rope with both hands.\nDING! DONG! DIIIIING!\nBelow, townsfolk hurry towards the tournament. Banners rise. Bramble howls along, and the rescued bird contributes one dreadful note: KRAAA!');
    print('From the courtyard below, Sir Godfrey calls up to you:\n"You found the trail, crossed the broken stairs, and helped someone who had caused you trouble. That is a knight\'s work."');
    print('QUEST COMPLETE! Bird of the Belltower','win');
    print('Your knight awards you a tournament ribbon, tucked into your inventory.\nSee your reward: `ls ~/inventory`\nRead it: `cat ~/inventory/tournament_ribbon`','hint');
    print('The tournament grounds are open and filling with people. Visit: `cd ~/courtyard/tournament`','hint');
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
      print('A feather drifts down the stairwell. Examine the bell: `cat ~/belltower/bell.txt`','hint');
    } else if(result.node===FS.children.belltower.children.landing){
      print('Wind whistles through a slit window. Explore: `cat ~/belltower/landing/stairs.txt`\nExamine the crossing: `cat ~/belltower/landing/crossing.txt`','hint');
    } else if(result.node===FS.children.belltower.children.landing.children.bell_chamber){
      print(birdRescued ? 'The rescued bird waits on the safe landing.' : 'A worried flutter comes from beside the bell.');
      print('Look closer: `cat ~/belltower/landing/bell_chamber/bird.txt`','hint');
    } else if(result.node===FS.children.courtyard){
      print('Guard Nessa leans against a wall, wearing a saucepan. She waves you over.');
      print('Read her message: `cat ~/courtyard/guard.txt`','hint');
      print(bramblePassed ? 'Bramble dozes beside the garden passage.' :
        'An old dog guards the garden passage. Your sword rattles; he answers with a low warning growl.\nMeet him: `cat ~/courtyard/bramble.txt`','hint');
      print('The tournament grounds lie beyond the courtyard: `cd ~/courtyard/tournament`.','hint');
    } else if(result.node===FS.children.kitchen){
      print('Cook Crumble corners the runaway pie with a soup ladle. She looks ready to grumble.');
      print('Read her message: `cat ~/kitchen/cook.txt`','hint');
      print(bramblePassed ? 'The passage behind the kitchen is clear: `cd ~/kitchen/garden`.' :
        'The garden lies behind the kitchen, but Bramble guards its entrance. Meet him from the courtyard: `cat ~/courtyard/bramble.txt`.','hint');
    } else if(result.node===FS.children.kitchen.children.garden){
      print('A wizard on a floating cabbage is trying to steady a teacup.');
      print('Meet Mage Moss: `cat ~/kitchen/garden/mage_moss.txt`','hint');
    } else if(result.node===FS.children.courtyard.children.tournament){
      print(won ? 'Cheers roll across the field. Benson waves from the drinks stand.' :
        'Banners rise over the field. Knights, grooms, and squires hurry to finish their preparations.');
      print('Read a scene with cat, or meet Benson: `cat ~/courtyard/tournament/Squire_Benson.txt`','hint');
    }
  },
  cd(args){
    if(args.length>1){ print('cd takes one directory at a time.','err'); return; }
    const result = getNode(args[0] || '~');
    if(!result) return;
    if(result.node.type!=='dir'){ print('That is a file, not a place. Read it with cat.','err'); return; }
    conversation.cancel();
    cwd = result.parts;
    if(cwd[0]==='belltower' && cwd[1]==='stairs'){
      if(cwd[2]==='up'){
        if(stairAttempt===2){
          print('The tower has made its opinion very clear. You will not try a third climb.\nThere is no safe way up these stairs. You need another plan.');
        } else {
          stairAttempt=2;
          towerScene([
            `You pull your foot free and keep climbing.

"Just one more step," you whisper.

Crrrrrrrrrk.

The entire staircase shifts.

Oh.

OH.`,
            `The stone beneath both your feet suddenly drops away.

You FALL!

Your hands catch the edge of the landing.

For one horrible second, your boots swing over empty air.`,
            `Far below, broken stones smash against the tower floor.

KRAK!

You squeeze your eyes shut and hang on.

"I have made," you gasp, "an extremely poor decision."

With a great deal of kicking, scrambling, and absolutely no dignity whatsoever, you haul yourself back onto the safe part of the staircase.

Another piece of stone breaks loose beside your face.

You decide the tower has made its opinion very clear.

There is no safe way up these stairs. You'll need another plan.`
          ],()=>{ print('Retreat: `cd ..`\nOr return to the tower entrance: `cd ~/belltower`','hint'); });
          return;
        }
        print('Retreat: `cd ..`\nOr return to the tower entrance: `cd ~/belltower`','hint');
      } else if(stairAttempt===2){
        print('You keep to the solid part of the lower staircase. Above you, the broken steps lead nowhere safe.\nYou are not trying that again.');
        print('Carefully climb back down: `cd ..`','hint');
      } else {
        if(stairAttempt===0){
          stairAttempt=1;
          towerScene([
            `You carefully climb onto the first step.

It holds.

Second step.

Still good.

Third step...`,
            `CRACK!

Your foot punches straight through the stone!

You grab the railing with both hands as half the step breaks loose beneath you. Chunks of stone tumble into the hollow centre of the tower.

You hear them bouncing below.`,
            `CLACK.

...

Clack.

...

...clack...

Your stomach does a tiny flip.

The rest of the staircase groans.

This was a terrible idea.`
          ],()=>{ print('Carefully climb back down: `cd ..`\nKeep climbing anyway: `cd up`','hint'); });
          return;
        } else print('The third step is still broken. You grip the railing and keep your feet on the solid stone below it.');
        print('Carefully climb back down: `cd ..`\nKeep climbing anyway: `cd up`','hint');
      }
      return;
    }
    if(result.node===FS.children.belltower && !towerSteady){
      towerScene([
        `The spiral stairs wind upward around the inside of the tower, circling higher and higher past narrow windows.

You put one boot on the first step.

CRRK.

You freeze.`,
        `A crack crawls across the old stone beneath your foot. Somewhere above, something shifts with a deep grrrrind, and a shower of dust and pebbles patters down the staircase.

One pebble bounces over the edge.

You wait for it to hit the floor below.`,
        `...
...
...

tik.

That's a LONG way down.

What next?`,
        `Several steps above you are cracked completely through. Part of the next landing has broken away, leaving nothing between the stairs and the open centre of the tower.

You could try climbing.

You are also fairly sure Sir Godfrey's instructions did not include "fall several stories."

You ease your boot back onto solid stone. A long bell rope hangs beside you. Maybe you can pull it from here.`
      ],()=>{
        print('Examine the tower: `cat ~/belltower/bell.txt`\nLook around: `ls`\nTry pulling the rope: `~/belltower/ring_bell.sh`','hint');
        print(stairAttempt===2 ? 'The broken stairs are impassable. Find another plan: `hint`.' :
          'Try climbing anyway: `cd ~/belltower/stairs`','hint');
      });
      return;
    }
    const flavor = {
      '':'Back in the castle yard. Your knight waves an enormous tournament flag.',
      belltower:'Your boots echo on the lower spiral stairs. Above, the landing glows with the Steady spell. The way up is ready: `cd ~/belltower/landing`.',
      'belltower/landing':'You climb the worn steps to the broken landing. Tiny bird footprints mark the dust. Wind whistles through a slit window.\nFar below, tournament banners snap like little handkerchiefs. The rope and cracked stone glow steadily.\nLook at the stairs: `cat ~/belltower/landing/stairs.txt`',
      'belltower/landing/bell_chamber':birdRescued ? 'Sunlight fills the bell chamber. Your rescued bird greets you with a hopeful "Kraa?"' :
        'One last turn of the stairs, and the huge bronze bell fills your view.\nA clatter of wings comes from a ribbon-covered nest. It does not sound triumphant. It sounds frightened.\nLook closer: `cat ~/belltower/landing/bell_chamber/bird.txt`',
      courtyard:bramblePassed ? 'Bramble thumps his tail at your familiar footsteps. Nessa salutes a passing goose.' :
        'A goose marches past Nessa. Both salute.\nYour sword rattles. An old dog at the garden passage lifts his head and gives a low warning growl.\nGive him space. Meet him: `cat ~/courtyard/bramble.txt`',
      'courtyard/alley':'A sheltered alley runs beside the garden wall. Cat pawprints circle a barrel. Bramble can hear you from here.',
      kitchen:'A floury cook chases a rolling pie. The pie is winning.',
      'kitchen/garden':'A cabbage floats over the flowerbeds behind the kitchen. High above it, the belltower window stands open. Something inside gives a worried squawk.',
      'courtyard/tournament':won ? 'The stands are full! The crowd rises as the first riders enter the field.' :
        'You pass beneath bright banners into the tournament grounds. Everyone is preparing, but the stands are still empty. They need your bell.',
      inventory:'Your sword shines safely inside your bag.'
    };
    print(Object.hasOwn(flavor,cwd.join('/')) ? flavor[cwd.join('/')] : 'You enter your new directory.');
    print('Look around: `ls`','hint');
  },
  cat(args){
    if(!args.length){ print('Choose a file to read. Try `cat ~/assignment.txt`.','err'); return; }
    for(const path of args){
      const result = getNode(path);
      if(!result) continue;
      if(result.node.type!=='file'){ print('That is a directory. Look inside with ls.','err'); continue; }
      if(result.node===FS.children.courtyard.children.tournament.children['fizzy_zinger.txt']){
        if(!drinkOffered){
          print(result.node.text);
          print('The cups belong to Benson. Ask him first: `cat ~/courtyard/tournament/Squire_Benson.txt`','hint');
        } else if(zingerDrunk){
          print('Your cup is empty. Your legs still feel light and springy. One Zinger is plenty!');
        } else {
          zingerDrunk=true;
          print('You sip the Fizzy Zinger. Bright berry bubbles tingle on your tongue.\nYour heels lift in a tiny, effortless hop. You can jump twice as high!\nSPECIAL OPTION UNLOCKED - Fizzy Zinger leaps. Watch for marked choices at Bramble\'s wall and the broken landing.\nThese are pretend adventure actions, not Linux commands. You never need this drink to finish the quest.');
        }
        continue;
      }
      if(result.node===FS.children.courtyard.children.tournament.children['Squire_Benson.txt'] && drinkOffered){
        print(zingerDrunk ? 'Benson smiles. "Still springy? One cup is plenty. Good luck with your errand!"' :
          'Benson holds out your cup. "Your Fizzy Zinger is ready!"');
        if(!zingerDrunk) print('Read about your drink: `cat ~/courtyard/tournament/fizzy_zinger.txt`','hint');
        if(won) print('"You did it! Hear that crowd? Your bell brought them all here."');
        continue;
      }
      const tournamentAfter = {
        'knights.txt':'The knights salute the cheering stands. Their careful practice has become the opening display, every movement precise.',
        'horses.txt':'Equipped for the joust, the horses step proudly onto the field. Grooms watch as the riders salute the King.',
        'empty_stands.txt':'The once-empty stands are packed with townsfolk. Flags wave and children lean forward eagerly.\nYour bell brought everyone together. The tournament has begun!'
      };
      if(won && result.parts[0]==='courtyard' && result.parts[1]==='tournament' && Object.hasOwn(tournamentAfter,result.parts[2])){
        print(tournamentAfter[result.parts[2]]);
        continue;
      }
      if(result.node===FS.children.courtyard.children['sightings_log.txt']){
        print('You unroll the sightings log. It flops over the desk, down the steps, and around a startled goat.\nHundreds and hundreds of entries! Missing pies, suspicious strangers, and children playing pranks...');
      }
      if(result.node===FS.children.courtyard.children['bramble.txt'] && bramblePassed){
        print('Bramble recognises your footsteps. His tail thumps beside the open garden passage.');
      } else if(result.node===FS.children.belltower.children.landing.children.bell_chamber.children['bird.txt'] && birdRescued){
        print('The bird is safe. Its pie hat sits at a grateful angle. "Kraa. Thank you."');
      } else if(result.node===FS.children.belltower.children['bell.txt'] && won){
        print('The repaired bell gleams high above. Its clapper is back where it belongs. The tournament is underway!');
      } else print(result.node.text);
      if(result.node===FS.children.courtyard.children['keeper_note.txt']) kindDiscovered=true;
      if(result.node===FS.children.courtyard.children.alley.children['cat_tracks.txt']) cleverDiscovered=true;
      if(result.node===FS.children.courtyard.children['bramble.txt']) brambleOptions();
      if(result.node===FS.children.belltower.children.landing.children['crossing.txt']) crossingOptions();
      if(result.node===FS.children.belltower.children.landing.children.bell_chamber.children['bird.txt']) rescueBird();
      if(result.node===FS.children.courtyard.children.tournament.children['Squire_Benson.txt']){
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
      }
      if(result.node===FS.children.courtyard.children['guard.txt']) guardMet=true;
      if(result.node===FS.children.kitchen.children['cook.txt']) cookMet=true;
      if(result.node===FS.children.kitchen.children.garden.children['mage_moss.txt']){
        mageMet=true;
        if(mageLessonStep===0) mossTopics();
        else mossLesson();
      }
      if(result.node.action==='steady'){
        steadyInspected=true;
        print('The script prints a message; this game adds the pretend Steady magic. It cannot repair real stairs.\nMoss explains: "chmod changes permissions. +x allows a script to run.\nIt does NOT make a script safe! Only allow scripts you understand and trust."');
        if(!result.node.executable) print('Allow this inspected practice spell to run: `chmod +x ~/kitchen/garden/steady.sh`','hint');
        else print('Try the inspected spell: `cd ~/kitchen/garden` then `./steady.sh`','hint');
      } else if(result.node.action==='ring' || result.node.action==='testBell'){
        const directory = pathStr(result.parts.slice(0,-1));
        print(`cat reads a script; it does not run it.\nTo pull the rope: \`cd ${directory}\` then \`./ring_bell.sh\``,'hint');
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
      print('A pie-crust hat! That bird has STYLE. And it has gone back to the TOP of the belltower.\nYou must conquer those broken stairs. A wizard in the garden behind the kitchen may know how to help.');
      print(bramblePassed ? 'Follow the garden passage: `cd ~/kitchen/garden` then `ls`.' :
        'Bramble guards the garden entrance. Approach his post from the courtyard: `cd ~/courtyard` then `ls`.','hint');
    } else print('Those are the matching lines. Need your next story step? Type `hint`.','hint');
  },
  chmod(args){
    if(args.length!==2 || args[0]!=='+x'){ print('This quest supports `chmod +x filename`: allow a script to run.','err'); return; }
    const result = getNode(args[1]);
    if(!result) return;
    if(result.node.type!=='file' || !result.node.action){ print('Choose a quest script, such as ~/kitchen/garden/steady.sh.','err'); return; }
    result.node.executable = true;
    print('Executable permission added. chmod changes permissions; +x allows execution.');
    if(result.node.action==='steady' && !steadyInspected){
      print('Permission does not guarantee safety. Inspect the spell before trying it: `cat ~/kitchen/garden/steady.sh`','hint');
      return;
    }
    print(`Now run the script: \`${args[1].startsWith('~') || args[1].startsWith('./') ? args[1] : './'+args[1]}\``,'hint');
  },
  mkdir(args){
    if(args.length!==1){ print('Give your directory a name: `mkdir notes`','err'); return; }
    const result = resolve(args[0],{allowMissing:true});
    if(pathError(result,args[0])) return;
    if(!canAccess(result.parts)) return;
    if(result.node){ print('That name already exists. Your inventory is ready at ~/inventory.','err'); return; }
    const parent = nodeAt(result.parts.slice(0,-1));
    const name = result.parts[result.parts.length-1];
    if(!parent || parent.type!=='dir' || !name){ print('The parent directory does not exist. Try `ls`.','err'); return; }
    parent.children[name] = D({});
    print(`You make a directory called ${name}.`);
    if(name==='inventory') print('Your travelling bag already lives at home: `ls ~/inventory`','hint');
  },
  mv(args){
    if(args.length!==2){ print('Use `mv item destination`, for example `mv ~/belltower/landing/bell_chamber/clapper ~/inventory`.','err'); return; }
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
    if(source.node===clapper){
      if(destination.node===FS.children.inventory) clapperCarried=true;
      clapperInstalled=clapperCarried && destination.node===FS.children.belltower.children.landing.children.bell_chamber;
      if(clapperInstalled){
        print('You lift the clapper into its waiting fitting. Now for the signal!');
      }
      nextStep();
    }
  },
  hint(){ nextStep(); },
  jump(args){
    if(args.length){ print('Use `jump` by itself. This is a pretend adventure action, not Linux.','err'); return; }
    if(!zingerDrunk){ print('That special option is locked. Benson\'s Fizzy Zinger unlocks magical leaps.\nYou can always finish without it. Explore for a clever or kind route.','hint'); return; }
    if(cwd.join('/')==='courtyard' && !bramblePassed){
      conversation.cancel();
      bramblePassed=true;
      print('SPECIAL OPTION UNLOCKED - Fizzy Zinger leap!\nYou steady your scabbard and spring over the low garden wall beside Bramble, landing softly on the path beyond.\nHe hears no threatening rattle. A moment later, he curls up beside his post. The passage is clear.\n(jump is a pretend adventure action, not a Linux command.)');
      print('Enter the garden behind the kitchen: `cd ~/kitchen/garden` then `ls`','hint');
      update();
    } else if(cwd.join('/')==='belltower/landing' && !landingCrossed){
      crossingOptions();
    } else {
      print('Your legs feel springy, but there is no special leap to use here. Watch for marked unlocked options.','hint');
    }
  },
  meow(args){
    if(args.length){ print('Use `meow` by itself. This is a pretend adventure action, not Linux.','err'); return; }
    if(bramblePassed){ print('Bramble is already resting beside the open passage. No distraction needed.'); return; }
    if(!cleverDiscovered){ print('Look for a clever distraction first: `ls ~/courtyard/alley`','hint'); return; }
    if(cwd.join('/')!=='courtyard/alley'){ print('Make your distraction from the side alley: `cd ~/courtyard/alley` then `meow`.','hint'); return; }
    conversation.cancel();
    bramblePassed=true;
    print('You cup your hands. "Meee-ow?"\nBramble turns his ears, then ambles towards the barrel. You hold your sword still and slip out by the garden passage.\nHe finds the cat\'s familiar scent and settles in a sunny patch beside the wall. The passage is clear.\n(meow is a pretend adventure action, not a Linux command.)');
    print('Enter the garden behind the kitchen: `cd ~/kitchen/garden` then `ls`','hint');
    update();
  },
  scritch(args){
    if(args.length){ print('Use `scritch` by itself. This is a pretend adventure action, not Linux.','err'); return; }
    if(bramblePassed){ print('Bramble is already content beside the open passage. His tail thumps.'); return; }
    if(!kindDiscovered){ print('Learn what Bramble needs before approaching: `cat ~/courtyard/keeper_note.txt`','hint'); return; }
    if(cwd.join('/')!=='courtyard'){ print('Visit Bramble: `cd ~/courtyard` then `scritch`.','hint'); return; }
    conversation.cancel();
    bramblePassed=true;
    print('You hold your scabbard still. "Good boy, Bramble." Then you wait, giving him space.\nThe growl fades. Bramble sniffs, relaxes, and comes to nudge your hand.\nOnly then do you scritch beneath his chin. His whole back leg joins in.\nHe settles beside the passage instead of across it. You have made a friend.\n(scritch is a pretend adventure action, not a Linux command.)');
    print('Enter the garden behind the kitchen: `cd ~/kitchen/garden` then `ls`','hint');
    update();
  },
  help(){
    print(
`Familiar commands: ls, ls -a, cd, cat, pwd, mkdir, mv, clear.
New skills, introduced when you need them:
  \`grep bird ~/courtyard/sightings_log.txt\` searches for matching lines
  \`grep -i bird ~/kitchen/report.txt\` ignores case
  \`chmod +x ~/kitchen/garden/steady.sh\` allows a trusted script to run
  \`./steady.sh\` runs Steady inside the garden
  \`./ring_bell.sh\` pulls the rope inside the tower or bell chamber
Use \`hint\` for your next step or \`restart\` to begin again.
This is a practice terminal: it supports only the forms taught here.
Scripts and their story effects are simulated, not run on your computer.`,
      'hint');
    print('Conversation choices are story actions, not Linux commands.\nAnswer [y/n] with y, yes, n, or no (capitals work too).\nFor numbered choices, type the number. For a pause, press Enter with an empty input.\nYou can also click a choice. Commands still work while a question is waiting.','hint');
    print('Exploring unlocks pretend story actions: `meow` in the alley or `scritch` in the courtyard. These are not Linux commands.','hint');
    if(zingerDrunk) print('SPECIAL OPTION UNLOCKED - Fizzy Zinger leap: `jump` in the courtyard, or choose the marked leap at the landing. This is not Linux.','hint');
  },
  clear(){ out.replaceChildren(); conversation.show(); },
  restart(){ location.reload(); }
};
function submit(){
  const line = input.value.trim();
  input.value = '';
  const [command,...args] = line.split(/\s+/);
  const isCommand = Object.hasOwn(CMDS,command) || command.startsWith('./') || command.startsWith('~/');
  if(conversation.handle(line,{isCommand})){ update(); return; }
  if(!line) return;
  print(prompt.textContent + ' ' + line,'echo');
  commandHistory.add(line);
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
print('Tournament day! Bright banners snap above the castle walls. Knights in shining armour lead their horses towards the field, and the smell of warm pies drifts from the kitchen. Beyond the gates, excited families listen for the great bell that will announce the start.');
print('You stand a little taller and straighten the sword at your belt. One day, you hope to ride beneath those banners as a knight.');
print('Sir Godfrey steps out of the crowd and calls to you. "There you are. I have a very important assignment for you." He places a sealed scroll in your hands. "The King, the knights, and everyone waiting outside are counting on your signal."');
print('High above you, the belltower rises into the morning sky. You tuck the scroll safely under your arm. Whatever this errand needs, you mean to do it well.');
print('Read your assignment: `cat ~/assignment.txt`\nNeed a nudge? Type `hint`.','hint');
update();
input.focus();
