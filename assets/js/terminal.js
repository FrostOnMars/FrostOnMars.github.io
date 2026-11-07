/* exported Terminal */
const Terminal = (() => {
  function pathStr(parts){
    return parts.length ? '~/' + parts.join('/') : '~';
  }

  function nodeAt(root, parts){
    let node = root;
    for(const name of parts){
      if(node.type!=='dir' || !Object.hasOwn(node.children,name)) return null;
      node = node.children[name];
    }
    return node;
  }

  function resolve(root, cwd, path, {allowMissing=false} = {}){
    const fail = (code, parts=[]) => ({parts, node:null, error:code});
    if(typeof path!=='string' || !path.length) return fail('EMPTY_PATH');
    if(path.startsWith('/')) return fail('OUTSIDE_QUEST');
    if(path.startsWith('~') && path!=='~' && !path.startsWith('~/')) return fail('INVALID_HOME');
    const parts = path.startsWith('~') ? [] : [...cwd];
    const segments = path.replace(/^~\/?/, '').split('/').filter(Boolean);
    for(let i=0;i<segments.length;i++){
      const name = segments[i];
      const parent = nodeAt(root,parts);
      if(!parent) return fail('NOT_FOUND',parts);
      if(parent.type!=='dir') return fail('NOT_DIRECTORY',parts);
      if(name==='.') continue;
      if(name==='..'){
        if(!parts.length) return fail('OUTSIDE_QUEST',parts);
        parts.pop();
      } else {
        parts.push(name);
        if(!Object.hasOwn(parent.children,name)){
          if(allowMissing && i===segments.length-1 && !path.endsWith('/')){
            return {parts, node:null, error:null};
          }
          return fail('NOT_FOUND',parts);
        }
      }
    }
    const node = nodeAt(root,parts);
    if(!node) return fail('NOT_FOUND',parts);
    if(path.endsWith('/') && node.type!=='dir') return fail('NOT_DIRECTORY',parts);
    return {parts, node, error:null};
  }

  function createHistory(){
    const entries = [];
    let index = 0;
    let draft = '';
    return {
      add(line){
        if(!line.trim()) return;
        entries.push(line);
        index = entries.length;
        draft = '';
      },
      previous(value){
        if(index===entries.length) draft = value;
        if(index>0) index--;
        return entries[index] ?? value;
      },
      next(value){
        if(index===entries.length) return value;
        index++;
        return index===entries.length ? draft : entries[index];
      }
    };
  }

  function complete({input, root, cwd, commands, showMatches}){
    const match = input.value.match(/(\S*)$/);
    const last = match[1];
    const prefix = input.value.slice(0,match.index);
    let candidates;
    let base = '';
    let fragment = last;
    const isCommand = !prefix.trim();
    if(isCommand && !last.includes('/')){
      candidates = Object.keys(commands).filter(name=>name.startsWith(last))
        .map(name=>({name, directory:false}));
    } else {
      const slash = last.lastIndexOf('/');
      base = slash<0 ? '' : last.slice(0,slash+1);
      fragment = last.slice(slash+1);
      const result = resolve(root,cwd,base || '.');
      if(result.error || result.node.type!=='dir') return;
      candidates = Object.keys(result.node.children)
        .filter(name=>name.startsWith(fragment) && (fragment.startsWith('.') || !name.startsWith('.')))
        .map(name=>({name, directory:result.node.children[name].type==='dir'}));
    }
    candidates.sort((a,b)=>a.name.localeCompare(b.name));
    if(candidates.length===1){
      const item = candidates[0];
      input.value = prefix + base + item.name + (item.directory ? '/' : ' ');
    } else if(candidates.length>1){
      let common = candidates[0].name;
      for(const item of candidates){
        while(!item.name.startsWith(common)) common=common.slice(0,-1);
      }
      if(common.length>fragment.length){
        input.value = prefix + base + common;
      } else {
        showMatches(candidates.map(item=>({
          text:item.name+(item.directory ? '/' : ''),
          command:prefix+base+item.name+(item.directory ? '/' : ' ')
        })));
      }
    }
  }

  function showCompletions(out, input, matches){
    const div = document.createElement('div');
    for(const [index,match] of matches.entries()){
      if(index) div.appendChild(document.createTextNode('   '));
      const code = document.createElement('code');
      code.textContent = match.text;
      code.title = 'Tap to complete this name';
      code.addEventListener('click',event=>{
        event.stopPropagation();
        input.value=match.command;
        input.focus();
      });
      div.appendChild(code);
    }
    out.appendChild(div);
    out.scrollTop=out.scrollHeight;
  }

  function renderListing({out, input, node, parts, getCwd, all=false}){
    const names = Object.keys(node.children).sort().filter(name=>all || !name.startsWith('.'));
    const div = document.createElement('div');
    div.className = 'file-list';
    if(all){
      for(const name of ['.','..']){
        const span = document.createElement('span');
        span.className = 'dir';
        span.textContent = name;
        div.appendChild(span);
      }
    }
    for(const name of names){
      const directory = node.children[name].type==='dir';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'file-link ' + (directory ? 'dir' : name.startsWith('.') ? 'win' : 'story');
      button.textContent = name + (directory ? '/' : '');
      button.title = 'Tap to type this name';
      button.addEventListener('click',event=>{
        event.stopPropagation();
        const cwd = getCwd();
        const local = parts.length===cwd.length && parts.every((part,index)=>part===cwd[index]);
        const path = local ? name : pathStr(parts.concat(name));
        input.value = input.value.trim() ?
          input.value.replace(/\s+$/,'')+' '+path :
          (directory ? 'cd ' : 'cat ')+path;
        input.focus();
      });
      div.appendChild(button);
    }
    if(!div.childNodes.length){
      div.classList.add('dim');
      div.textContent = '(nothing here)';
    }
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
    return names.length>0 || all;
  }

  function render(out, input, text, cls, {
    formatCommand = command => command,
    commandTitle = 'Tap to type this command',
    stopPropagation = false
  } = {}){
    const div = document.createElement('div');
    div.className = cls;
    text.split(/`([^`]+)`/).forEach((chunk,index)=>{
      if(index%2){
        const code = document.createElement('code');
        const command = formatCommand(chunk);
        code.textContent = command;
        code.title = commandTitle;
        code.addEventListener('click',event=>{
          if(stopPropagation) event.stopPropagation();
          input.value = command;
          input.focus();
        });
        div.appendChild(code);
      } else div.appendChild(document.createTextNode(chunk));
    });
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
    return div;
  }

  function createConversation({out, input, print}){
    let pending = null;
    let buttons = [];

    function disableButtons(){
      for(const button of buttons) button.disabled = true;
      buttons = [];
    }

    function cancel(){
      disableButtons();
      pending = null;
    }

    function show(){
      if(!pending) return false;
      disableButtons();
      const question = pending;
      print(question.text,'hint');
      const group = document.createElement('div');
      group.className = 'conversation-options';
      group.setAttribute('role','group');
      group.setAttribute('aria-label',question.text);
      for(const answer of question.answers){
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = answer.label;
        button.addEventListener('click',event=>{
          event.stopPropagation();
          if(button.disabled || pending!==question) return;
          input.value = '';
          handle(answer.values[0]);
          input.focus();
        });
        buttons.push(button);
        group.appendChild(button);
      }
      out.appendChild(group);
      out.scrollTop = out.scrollHeight;
      return true;
    }

    function start(question){
      cancel();
      pending = question;
      show();
    }

    function handle(line, {isCommand=false} = {}){
      if(!pending) return false;
      const value = line.trim().toLowerCase();
      const answer = pending.answers.find(item=>item.values.includes(value));
      if(answer){
        cancel();
        print(value ? 'You: '+line.trim() : 'You continue.','echo');
        answer.run();
        return true;
      }
      if(isCommand) return false;
      print(pending.help+' You can still use commands such as hint.','hint');
      show();
      return true;
    }

    return {
      get active(){ return pending!==null; },
      yesNo({text, onYes, onNo}){
        start({
          text:text+' [y/n]',
          help:'Answer y or yes, or n or no.',
          answers:[
            {label:'Y - Yes', values:['y','yes'], run:onYes},
            {label:'N - No', values:['n','no'], run:onNo}
          ]
        });
      },
      choose({text, choices}){
        if(!choices.length) throw new Error('A conversation needs at least one choice.');
        start({
          text,
          help:'Choose a number from 1 to '+choices.length+'.',
          answers:choices.map((choice,index)=>({
            label:(index+1)+'. '+choice.text,
            values:[String(index+1)],
            run:choice.onSelect
          }))
        });
      },
      pause({onContinue}){
        start({
          text:'Press Enter to continue.',
          help:'Press Enter with an empty input to continue.',
          answers:[{label:'Continue (Enter)', values:[''], run:onContinue}]
        });
      },
      handle, show, cancel
    };
  }

  function bindControls({input, out, keys, complete, previous, next, runCommand}){
    input.form.addEventListener('submit',()=>{ input.focus(); });
    input.addEventListener('keydown',event=>{
      if(event.key==='Tab'){ event.preventDefault(); complete(); }
      else if(event.key==='ArrowUp'){ event.preventDefault(); previous(); }
      else if(event.key==='ArrowDown'){ event.preventDefault(); next(); }
    });
    keys.addEventListener('pointerdown',event=>{
      if(event.target.closest('button')) event.preventDefault();
    });
    keys.addEventListener('click',event=>{
      const button = event.target.closest('button');
      if(!button) return;
      const key = button.dataset.key || button.dataset.k;
      if(key==='tab') complete();
      else if(key==='up') previous();
      else runCommand(button.dataset.command || button.dataset.cmd);
      input.focus();
    });
    if(window.visualViewport){
      window.visualViewport.addEventListener('resize',()=>{ out.scrollTop = out.scrollHeight; });
    }
  }

  return {pathStr, nodeAt, resolve, createHistory, complete, showCompletions, renderListing, render, createConversation, bindControls};
})();
