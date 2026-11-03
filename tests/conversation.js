const out = document.getElementById('out');
const input = document.getElementById('cmd');
function print(text, cls='story'){
  Terminal.render(out,input,text,cls);
}
const conversation = Terminal.createConversation({out,input,print});
function demo(){
  conversation.choose({
    text:'Choose a conversation test:',
    choices:[
      {text:'Try a Y/N question', onSelect(){
        conversation.yesNo({
          text:'Would you like to continue?',
          onYes(){ print('You answered yes. Type `demo` to try another test.'); },
          onNo(){ print('Not now is fine. Type `demo` whenever you like.'); }
        });
      }},
      {text:'Try an explanation pause', onSelect(){
        print('This is a short explanation. The next part waits for you.');
        conversation.pause({onContinue(){
          print('You continued. Type `demo` to try another test.');
        }});
      }},
      {text:'Finish the conversation', onSelect(){
        print('Conversation finished. Type `demo` to start again.');
      }}
    ]
  });
}
const commands = {
  demo,
  hint(){
    if(!conversation.show()) print('Type `demo` to start a conversation.','hint');
  },
  clear(){
    out.replaceChildren();
    if(!conversation.show()) print('Type `demo` to start again.','hint');
  }
};
document.getElementById('form').addEventListener('submit',event=>{
  event.preventDefault();
  const line = input.value.trim();
  input.value = '';
  const isCommand = Object.hasOwn(commands,line);
  if(conversation.handle(line,{isCommand})) return;
  if(!line) return;
  print('test$ '+line,'echo');
  if(isCommand) commands[line]();
  else print('Try demo, hint, or clear. Answers only work while a question is waiting.','hint');
});
print('This page exercises shared numbered choices, Y/N answers, and Enter pauses.\nThese are conversation controls, not Linux commands.');
demo();
input.focus();
