const out = document.getElementById('out');
const input = document.getElementById('cmd');
function printLine(text, cls='story'){
  Terminal.render(out,input,text,cls);
}
const conversation = Terminal.createConversation({out,input,print:printLine});
function demo(){
  conversation.choose({
    text:'Choose a conversation test:',
    choices:[
      {text:'Try a Y/N question', onSelect(){
        conversation.yesNo({
          text:'Would you like to continue?',
          onYes(){ printLine('You answered yes. Type `demo` to try another test.'); },
          onNo(){ printLine('Not now is fine. Type `demo` whenever you like.'); }
        });
      }},
      {text:'Try an explanation pause', onSelect(){
        printLine('This is a short explanation. The next part waits for you.');
        conversation.pause({onContinue(){
          printLine('You continued. Type `demo` to try another test.');
        }});
      }},
      {text:'Finish the conversation', onSelect(){
        printLine('Conversation finished. Type `demo` to start again.');
      }}
    ]
  });
}
const commands = {
  demo,
  hint(){
    if(!conversation.show()) printLine('Type `demo` to start a conversation.','hint');
  },
  clear(){
    out.replaceChildren();
    if(!conversation.show()) printLine('Type `demo` to start again.','hint');
  }
};
document.getElementById('form').addEventListener('submit',event=>{
  event.preventDefault();
  const line = input.value.trim();
  input.value = '';
  const isCommand = Object.hasOwn(commands,line);
  if(conversation.handle(line,{isCommand})) return;
  if(!line) return;
  printLine('test$ '+line,'echo');
  if(isCommand) commands[line]();
  else printLine('Try demo, hint, or clear. Answers only work while a question is waiting.','hint');
});
printLine('This page exercises shared numbered choices, Y/N answers, and Enter pauses.\nThese are conversation controls, not Linux commands.');
demo();
input.focus();
