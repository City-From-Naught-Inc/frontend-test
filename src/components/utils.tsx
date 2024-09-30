
const parseMessageContent = (message: string) => {
  // Replace **bold** with <b>bold</b>
  let parsedMessage = message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  
  // Replace *italic* with <i>italic</i>
  parsedMessage = parsedMessage.replace(/\*(.*?)\*/g, '<i>$1</i>');
  
  // Replace newlines (\n) with <br/>
  parsedMessage = parsedMessage.replace(/\n/g, '<br/>');

  return parsedMessage;
};

export default {
    parseMessageContent: parseMessageContent
}
